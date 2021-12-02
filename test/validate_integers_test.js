import { test } from "zora";

function validate(num, validation, failureMessage) {
  let result = validation(num);
  return result ? { result } : { result, error: failureMessage(num) };
}

function alwaysTrue(num) {
  return { result: true };
}

function alwaysFalse(num) {
  return { result: false, error: "alwaysFalse failed" };
}


function validateEven(num) {
  return validate(
    num,
    (num) => num % 2 === 0,
    (num) => `${num} is not even`
  );
}

function validateNegative(num) {
  return validate(
    num,
    (num) => num <= 0,
    (num) => `${num} is not negative`
  );
}

function validatePositive(num) {
  return validate(
    num,
    (num) => num > 0,
    (num) => `${num} is not positive`
  );
}

test(`positive result?`, (assertions) => {
  assertions.equal(validatePositive(37), { result: true });
  assertions.equal(validatePositive(-1), {
    result: false,
    error: "-1 is not positive",
  });
});

test(`negative?`, (assertions) => {
  assertions.equal(validateNegative(-1), { result: true });
  assertions.equal(validateNegative(1), {
    result: false,
    error: "1 is not negative",
  });
});

function validateAnd(num, validateF, validateG) {
  let first = validateF(num);
  let second = validateG(num);

  let result = first.result && second.result;
  let errors = [first, second].map((each) => each.error).filter((each) => each);

  return result ? { result } : { result, errors };
}

test(`is even and negative?`, (assertions) => {
  assertions.equal(validateAnd(-2, validateEven, validateNegative), {
    result: true,
  });

  assertions.equal(validateAnd(1, validateEven, validateNegative), {
    result: false,
    errors: ["1 is not even", "1 is not negative"],
  });
  assertions.equal(validateAnd(2, validateEven, validateNegative), {
    result: false,
    errors: ["2 is not negative"],
  });
});

test(`is even and positive?`, (assertions) => {
  assertions.equal(validateAnd(2, validateEven, validatePositive), {
    result: true,
  });
  assertions.equal(validateAnd(-2, validateEven, validatePositive), {
    result: false,
    errors: ["-2 is not positive"],
  });
  assertions.equal(validateAnd(-1, validateEven, validatePositive), {
    result: false,
    errors: ["-1 is not even", "-1 is not positive"],
  });
});

test(`test and combinator and the name should reflect it?`, (assertions) => {
  assertions.equal(validateAnd(2, alwaysTrue, alwaysTrue), {
    result: true,
  });
  assertions.equal(validateAnd(2, alwaysTrue, alwaysFalse), {
    result: false,
    errors: ["alwaysFalse failed"]
  });
  assertions.equal(validateAnd(2, alwaysFalse, alwaysTrue), {
    result: false,
    errors: ["alwaysFalse failed"]
  });
  assertions.equal(validateAnd(2, alwaysFalse, alwaysFalse), {
    result: false,
    errors: ["alwaysFalse failed", "alwaysFalse failed"]
  });
});

test(`is even or negative?`, (assertions) => {
  function validateOr(num, validateF, validateG) {
    let first = validateF(num);
    let second = validateG(num);

    let result = first.result || second.result;
    let errors = [first, second]
      .map((each) => each.error)
      .filter((each) => each);

    return result ? { result } : { result, errors };
  }

  assertions.equal(validateOr(-2, validateEven, validateNegative), {
    result: true,
  });

  assertions.equal(validateOr(-1, validateEven, validateNegative), {
    result: true,
  });

  assertions.equal(validateOr(2, validateEven, validateNegative), {
    result: true,
  });

  assertions.equal(validateOr(3, validateEven, validateNegative), {
    "result": false,
    "errors": ["3 is not even", "3 is not negative"]
  });
});

test(`even?`, (assertions) => {
  assertions.equal(validateEven(2), {
    result: true,
  });
  assertions.equal(validateEven(3), {
    result: false,
    error: "3 is not even",
  });
  assertions.equal(validateEven(-1), {
    result: false,
    error: "-1 is not even",
  });
});



import { test } from "zora";

function validate(num, validation, failureMessage) {
  let result = validation(num);
  return result ? { result } : { result, error: failureMessage(num) };
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

const combineValidationsWithAnd = (validateF, validateG) => {
  return (num) => {
    let first = validateF(num);
    let second = validateG(num);

    let result = first.result && second.result;
    let errors = [first, second]
      .map((each) => each.error)
      .filter((each) => each);

    return result ? { result } : { result, errors };
  };
};

function validateAnd(num, validateF, validateG) {
  return combineValidationsWithAnd(validateF, validateG)(num);
}

const combineValidationsWithOr = (validateF, validateG) => {
  return (num) => {
    let first = validateF(num);
    let second = validateG(num);

    let result = first.result || second.result;
    let errors = [first, second]
      .map((each) => each.error)
      .filter((each) => each);

    return result ? { result } : { result, errors };
  };
};

function validateOr(num, validateF, validateG) {
  return combineValidationsWithOr(validateF, validateG)(num);
}

test(`is even and negative?`, (assertions) => {
  const evenAndNegativeValidation = combineValidationsWithAnd(
    validateEven,
    validateNegative
  );

  assertions.equal(evenAndNegativeValidation(-2), {
    result: true,
  });

  assertions.equal(evenAndNegativeValidation(1), {
    result: false,
    errors: ["1 is not even", "1 is not negative"],
  });
  assertions.equal(evenAndNegativeValidation(2), {
    result: false,
    errors: ["2 is not negative"],
  });
});

test(`is even and positive?`, (assertions) => {
  const evenAndPositiveValidation = combineValidationsWithAnd(
    validateEven,
    validatePositive
  );

  assertions.equal(evenAndPositiveValidation(2), {
    result: true,
  });
  assertions.equal(evenAndPositiveValidation(-2), {
    result: false,
    errors: ["-2 is not positive"],
  });
  assertions.equal(evenAndPositiveValidation(-1), {
    result: false,
    errors: ["-1 is not even", "-1 is not positive"],
  });
});

test(`is even or negative?`, (assertions) => {
  const evenOrNegativeValidation = combineValidationsWithOr(
      validateEven,
      validateNegative
  );

  assertions.equal(evenOrNegativeValidation(-2), {
    result: true,
  });

  assertions.equal(evenOrNegativeValidation(-1), {
    result: true,
  });

  assertions.equal(evenOrNegativeValidation(2), {
    result: true,
  });

  assertions.equal(evenOrNegativeValidation(0), {
    result: true,
  });

  assertions.equal(evenOrNegativeValidation(1), {
    result: false,
    errors: ["1 is not even", "1 is not negative"],
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

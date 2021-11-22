import { test } from "zora";

function isPositive(num) {
  return num > 0;
}

// REFACTOR Extract a combinator for not(rule)
function isNegative(num) {
  return !isPositive(num);
}

function isEven(num) {
  return num % 2 === 0;
}

function isEvenAndNegative(num) {
  return and(isEven, isNegative)(num);
}

function isEvenAndPositive(num) {
  return and(isEven, isPositive)(num);
}

// CONTRACT f: Integer -> Boolean
// CONTRACT g: Integer -> Boolean
function and(f, g) {
  return function (num) {
    return f(num) && g(num);
  };
}

// CONTRACT f: Integer -> Boolean
// CONTRACT g: Integer -> Boolean
function or(f, g) {
  return function (num) {
    return f(num) || g(num);
  };
}

function validate(num, validation, failureMessage) {
  let result = validation(num);
  return result ? { result } : { result, error: failureMessage(num) };
}

function validatePositive(num) {
  return validate(num, isPositive, (num) => `${num} is not positive`);
}

function validateNegative(num) {
  return validate(num, isNegative, (num) => `${num} is not negative`);
}

test(`positive result?`, (assertions) => {
  assertions.equal(validatePositive(37), { result: true });
  assertions.equal(validatePositive(-1), {
    result: false,
    error: "-1 is not positive",
  });
});

test(`negative?`, (assertions) => {
  assertions.equal(isNegative(-1), true);
  assertions.equal(validateNegative(-1), { result: true });
  assertions.equal(validateNegative(1), {
    result: false,
    error: "1 is not negative",
  });
});

function validateEven(num) {
  return validate(num, isEven, (num) => `${num} is not even`);
}

test(`even?`, (assertions) => {
  assertions.equal(validateEven(2), { result: true });
  assertions.equal(validateEven(3), { result: false, error: "3 is not even" });
  assertions.equal(validateEven(-1), {
    result: false,
    error: "-1 is not even",
  });
});

test(`even and negative?`, (assertions) => {
  assertions.equal(isEvenAndNegative(-1), false);
  assertions.equal(isEvenAndNegative(-2), true);
});

test(`even and positive?`, (assertions) => {
  assertions.equal(isEvenAndPositive(1), false);
  assertions.equal(isEvenAndPositive(2), true);
});

test(`even or positive?`, (assertions) => {
  assertions.equal(or(isEven, isPositive)(1), true);
  assertions.equal(or(isEven, isPositive)(-4), true);
  assertions.equal(or(isEven, isPositive)(-17), false);
});

function foo(validators) {
  if (validators.length === 0) {
    return () => ({ result: true, errors: [] });
  } else {
    let firstValidator = validators[0];
    return ((f) => (num) => ({ result: f(num).result, errors: [f(num).error] }))(firstValidator);
  }
}

test(`no validations`, (assertions) => {
  let testValidator = foo([]);
  assertions.equal(testValidator(1), { result: true, errors: [] });
});

test(`single validation`, (assertions) => {
  let testValidator = foo([
    (num) => validate(
      1,
      (num) => false,
      (num) => "::it doesn't matter::"
    ),
  ]);
  assertions.equal(testValidator(1), {
    result: false,
    errors: ["::it doesn't matter::"],
  });
});

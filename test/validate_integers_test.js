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

test(`positive result?`, (assertions) => {
  function validatePositive(num) {
    return validate(num, isPositive, (num) => `${num} is not positive`);
  }

  assertions.equal(validatePositive(37), { result: true });
  assertions.equal(validatePositive(-1), {
    result: false,
    error: "-1 is not positive",
  });
});

test(`negative?`, (assertions) => {
  function validateNegative(num) {
    return validate(num, isNegative, (num) => `${num} is not negative`);
  }

  assertions.equal(validateNegative(-1), { result: true });
  assertions.equal(validateNegative(1), {
    result: false,
    error: "1 is not negative",
  });
});

test(`is even and negative?`, (assertions) => {
  function validateEvenAndNegative(num) {
    return validate(num, isEvenAndNegative, (num) => `${num} is not negative`);
  }

  assertions.equal(validateEvenAndNegative(-2), { result: true });
  assertions.equal(validateEvenAndNegative(1), {
    result: false,
    errors: ['1 is not even', '1 is not negative']
  });
  //assertions.equal(validateNegative(1), {
  //    result: false,
  //error: "1 is not negative",
  //});
});

test(`even?`, (assertions) => {
  function validateEven(num) {
    return validate(num, isEven, (num) => `${num} is not even`);
  }

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

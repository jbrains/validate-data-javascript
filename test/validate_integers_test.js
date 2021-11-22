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

test(`positive?`, (assertions) => {
  assertions.equal(isPositive(37), true);
  assertions.equal(isPositive(-1), false);
});

function foo(num, f, failureMessage) {
  let result = f(num);
  return result ? {result} : {result, error: failureMessage(num)};
}

test(`positive result?`, (assertions) => {
  function validatePositive(num) {
    return foo(num, isPositive, (num) => `${num} is not positive`);
  }

  assertions.equal(validatePositive(37), { result: true });
  assertions.equal(validatePositive(-1), {
    result: false,
    error: "-1 is not positive",
  });
});

test(`negative?`, (assertions) => {
  assertions.equal(isNegative(-1), true);
});

test(`even?`, (assertions) => {
  assertions.equal(isEven(2), true);
  assertions.equal(isEven(-1), false);
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

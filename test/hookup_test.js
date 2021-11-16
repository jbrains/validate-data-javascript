import { test } from "zora";

function isPositive(num) {
  return num > 0;
}

function isPositiveBetter(num) {
  return { result: num > 0, message: "-1 is not positive" };
}

function isNegative(num) {
  return !isPositiveBetter(num).result;
}

function isNegativeBetter(num) {
  return {
    result: !isPositiveBetter(num).result,
  };
}

function isEven(num) {
  return num % 2 === 0;
}
function isEvenBetter(num) {
  var result = isEven(num);
  var msg = result ? "" : num + " is not even";

  return { result: result, message: msg };
}
function isEvenAndNegative(num) {
  return isEvenBetter(num).result && isNegative(num);
}
function isEvenAndPositive(num) {
  return and(isEvenBetter, isPositive)(num);
}

function isEvenAndNegativeBetter(num) {
  return {
    result: isEvenBetter(num).result && isNegative(num),
  };
}
function isEvenAndPositiveBetter(num) {
  return {
    result: and(isEvenBetter, isPositive)(num),
  };
}

function and(f, g) {
  return function (num) {
    return f(num).result && g(num);
  };
}

function or(f, g) {
  return function (num) {
    return f(num) || g(num);
  };
}

test(`positive?`, (assertions) => {
  assertions.equal(isPositiveBetter(37).result, true);
  assertions.equal(isPositiveBetter(-1).result, false);
  assertions.equal(isPositiveBetter(-1).message, "-1 is not positive");
  assertions.equal(isPositiveBetter(-2).message, "-2 is not positive");
});

test(`negative?`, (assertions) => {
  assertions.equal(isNegativeBetter(-1).result, true);
});

test(`even?`, (assertions) => {
  assertions.equal(isEvenBetter(2).result, true);
  assertions.equal(isEvenBetter(-1).result, false);
  assertions.equal(isEvenBetter(1).message, "1 is not even");
  assertions.equal(isEvenBetter(3).message, "3 is not even");
  assertions.equal(isEvenBetter(2).message, "");
});

test(`even and negative?`, (assertions) => {
  assertions.equal(isEvenAndNegativeBetter(-1).result, false);
  assertions.equal(isEvenAndNegativeBetter(-2).result, true);
});

test(`even and positive?`, (assertions) => {
  assertions.equal(isEvenAndPositiveBetter(1).result, false);
  assertions.equal(isEvenAndPositiveBetter(2).result, true);
});

test(`even or positive?`, (assertions) => {
  assertions.equal(or(isEven, isPositive)(1), true);
  assertions.equal(or(isEven, isPositive)(-4), true);
  assertions.equal(or(isEven, isPositive)(-17), false);
});

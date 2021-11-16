import {
  test
} from "zora";

function isPositive(num) {
  return num > 0;
}

function isNegative(num) {
  return !isPositive(num);
}

test(`positive?`, (assertions) => {
  assertions.equal(isPositive(37), true);
  assertions.equal(isPositive(-1), false);
});

test(`negative?`, (assertions) => {
  assertions.equal(isNegative(-1), true);
});

function isEven(num) {
  return num % 2 === 0;
}
test(`even?`, (assertions) => {
  assertions.equal(isEven(-1), false);
  assertions.equal(isEven(2), true);
});

function isEvenAndNegative(num) {
  return isEven(num) && isNegative(num);
}

test(`even and negative?`, (assertions) => {
  assertions.equal(isEvenAndNegative(-1), false);
  assertions.equal(isEvenAndNegative(-2), true);
});

function isEvenAndPositive(num) {
  return and(isEven, isPositive)(num);
}

function and(f, g) {
  return function (num) {
    return f(num) && g(num);
  };
}

function or(f, g) {
  return function (num) {
    return f(num) || g(num);
  };
}

test(`even and positive?`, (assertions) => {
  assertions.equal(isEvenAndPositive(1), false);
  assertions.equal(isEvenAndPositive(2), true);
});

test(`even or positive?`, (assertions) => {
  assertions.equal(or(isEven, isPositive)(1), true);
  assertions.equal(or(isEven, isPositive)(-4), true);
  assertions.equal(or(isEven, isPositive)(-17), false);
});

test(`failure message?`, (assertions) => {
  assertions.equal(or(isEven, isPositive)(-4), true);
  assertions.equal(or(isEven, isPositive)(-17), false);
});
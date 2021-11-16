import { test } from "zora";

function isPositive(num){
  return num > 0;
}

function isNegative(num) {
  return !isPositive(num);
}

test(`positive?`, (assertions) => {
  assertions.equal(
    isPositive(37),
    true
  );
  assertions.equal(
    isPositive(-1),
    false
  );
});

test(`negative?`, (assertions) => {
  assertions.equal(
    isNegative(-1),
    true
  );
});


function isEven (num) {
  return num % 2 === 0;
}
test(`even?`, (assertions) => {
  assertions.equal(
      isEven(-1),
      false
  );
  assertions.equal(
      isEven(2),
      true
  );
});

test(`even and negative?`, (assertions) => {
  assertions.equal(
      isEven(-1),
      false
  );
});
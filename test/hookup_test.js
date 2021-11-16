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

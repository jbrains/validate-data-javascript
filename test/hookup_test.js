import { test } from "zora";

function isPositive(num){
  return false;
}

test(`positive?`, (assertions) => {
  
  assertions.equal(
    isPositive(37),
    true,
    `37 is a positive number and our validator should figure that out.`
  );
});
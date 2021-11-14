import { test } from "zora";

test(`Is this thing on?`, (assertions) => {
  assertions.ok(false, `This fails intentionally.`);
  assertions.equal(
    true,
    false,
    `true should be false, which is the opposite order of the xUnit tradition.`
  );
});

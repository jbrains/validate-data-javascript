# Overview

This project provides a place for participants in [The World's Best Intro to TDD: Level 2, Prerelease Edition](https://www.jbrains.ca/training/course/worlds-best-intro-to-tdd/level-2-prerelease) to practise some evolutionary design.

## Build Instructions

After you clone this repository, run the tests.

```bash
$ npm install -g pta    # the test runner
$ npm install    # install the project's packages
$ npm run test
$ pta test/**/*.js    # the current implementation of `npm run test`
```

You should see test results that match the tests currently in the project. Look at the contents of the `test` directory for details.

### Run Tests Continuously

On Linux, we can use `fdfind` and `entr` to monitor the files and run the tests when there are changes.

```bash
$ fdfind test | entr -s "npm run test"
```

This works (so far), because the only source code is in the `test` directory. When we add more source code directories, this command would need to change.

On other operating systems, you can probably find corresponding tools. You need to run `npm run test` whenever source code files change.

## The Exercise

Validate data. That's it!

### TDD/Evolutionary Design

We build the validation mechanism incrementally, adopting this general plan.

1. Validate a single data type with a single validation rule.
2. Add more rules.
3. Make it easier to add more rules.
4. Make it easier to validate other data types.

### Extra Credit

We notice eventually that validating data feels like writing programmer tests for data, so could we _literally_ use Zora to do that? Could we _literally_ write validation rules for data using Zora tests? I don't know. I guess that depends on how Zora was designed. Maybe we'll find out!


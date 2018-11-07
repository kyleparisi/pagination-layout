const assert = console.assert;
const log = console.log;
const isEqual = _.isEqual;
var output, expect;

log("It returns false if no parameter");
assert(paginationLayout() === false, "Should return false for no data.");

log("It returns false if no pages in array");
assert(paginationLayout([]) === false, "Should return false for no pages.");

log("It returns a single page is a single page is given.");
output = paginationLayout([[]]);
expect = [1];
assert(
  isEqual(output, expect),
  "Should return a single page for a single page given.",
  expect,
  output
);

log("It returns 1 2 pages.");
output = paginationLayout([[], []]);
expect = [1, 2];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 pages.");
output = paginationLayout([[], [], []]);
expect = [1, 2, 3];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 pages.");
output = paginationLayout([[], [], [], []]);
expect = [1, 2, 3, 4];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 pages.");
output = paginationLayout([[], [], [], [], []]);
expect = [1, 2, 3, 4, 5];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 6 pages.");
output = paginationLayout([[], [], [], [], [], []]);
expect = [1, 2, 3, 4, 5, 6];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 6 7 pages.");
output = paginationLayout([[], [], [], [], [], [], []], 3);
expect = [1, 2, 3, 4, 5, 6, 7];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 6 7 pages.");
output = paginationLayout([[], [], [], [], [], [], []], 2);
expect = [1, 2, 3, 4, 5, 6, 7];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 6 7 pages.");
output = paginationLayout([[], [], [], [], [], [], []], 5);
expect = [1, 2, 3, 4, 5, 6, 7];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 6 7 pages.");
output = paginationLayout([[], [], [], [], [], [], []], 4);
expect = [1, 2, 3, 4, 5, 6, 7];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 6 7 pages.");
output = paginationLayout([[], [], [], [], [], [], []], 7);
expect = [1, 2, 3, 4, 5, 6, 7];
assert(isEqual(output, expect), "Should return", expect, output);


log("It returns 1 2 3 4 5 6 7 pages.");
output = paginationLayout([[], [], [], [], [], [], []], 6);
expect = [1, 2, 3, 4, 5, 6, 7];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 6 7 pages when page 8 is selected.");
output = paginationLayout([[], [], [], [], [], [], []], 8);
expect = [1, 2, 3, 4, 5, 6, 7];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 6 7 pages when page 0 is selected.");
output = paginationLayout([[], [], [], [], [], [], []], 0);
expect = [1, 2, 3, 4, 5, 6, 7];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 6 7 pages when page -1 is selected.");
output = paginationLayout([[], [], [], [], [], [], []], -1);
expect = [1, 2, 3, 4, 5, 6, 7];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 pages when page 2 is selected.");
output = paginationLayout([[], [], [], []], 2);
expect = [1, 2, 3, 4];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 pages when page 3 is selected.");
output = paginationLayout([[], [], [], []], 3);
expect = [1, 2, 3, 4];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 pages when page 4 is selected.");
output = paginationLayout([[], [], [], []], 4);
expect = [1, 2, 3, 4];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 ... 3 4 5 ... 8 pages when page 4 is selected.");
output = paginationLayout([[], [], [], [], [], [], [], []], 4);
expect = [1, "...", 3, 4, 5, "...", 8];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 ... 4 5 6 ... 8 pages when page 5 is selected.");
output = paginationLayout([[], [], [], [], [], [], [], []], 5);
expect = [1, "...", 4, 5, 6, "...", 8];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 ... 4 5 6 7 8 pages when page 7 is selected.");
output = paginationLayout([[], [], [], [], [], [], [], []], 7);
expect = [1, "...", 4, 5, 6, 7, 8];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 ... 4 5 6 7 8 pages when page 8 is selected.");
output = paginationLayout([[], [], [], [], [], [], [], []], 8);
expect = [1, "...", 4, 5, 6, 7, 8];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 ... 8 pages when page 1 is selected.");
output = paginationLayout([[], [], [], [], [], [], [], []], 1);
expect = [1, 2, 3, 4, 5, "...", 8];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 ... 8 pages when page 2 is selected.");
output = paginationLayout([[], [], [], [], [], [], [], []], 2);
expect = [1, 2, 3, 4, 5, "...", 8];
assert(isEqual(output, expect), "Should return", expect, output);

log("It returns 1 2 3 4 5 ... 8 pages when page 3 is selected.");
output = paginationLayout([[], [], [], [], [], [], [], []], 3);
expect = [1, 2, 3, 4, 5, "...", 8];
assert(isEqual(output, expect), "Should return", expect, output);
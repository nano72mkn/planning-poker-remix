import { getAverage } from "~/utils/getAverage";

test("Average: 1,2,3 = 2", () => {
  expect(
    getAverage({
      user1: 1,
      user2: 2,
      user3: 3,
    })
  ).toBe(2);
});

test("Average: 1,2,3,? = 2", () => {
  expect(
    getAverage({
      user1: 1,
      user2: 2,
      user3: 3,
      user4: "?",
    })
  ).toBe(2);
});

test("Average: 文字列のみの時は0", () => {
  expect(
    getAverage({
      user1: "?",
    })
  ).toBe(0);
});

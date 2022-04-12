import type { PokerData } from "~/routes/room/$roomId";

export const getAverage = (pokerData: PokerData) => {
  const values = Object.values(pokerData);

  if (values.length === 0) return 0;
  const nonNullValues = values.filter(
    (value) => typeof value !== "string"
  ) as number[];

  if (nonNullValues.length === 0) return 0;

  return Math.floor(
    nonNullValues.reduce((prev, current) => prev + current) /
      nonNullValues.length
  );
};

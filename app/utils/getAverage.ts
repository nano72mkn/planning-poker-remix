import type { PokerData } from "~/routes/room/$roomId";

export const getAverage = (pokerData: PokerData) => {
  const values = Object.values(pokerData);

  if (values.length === 0) return 0;
  const nonNullValues = values.filter((value) => value !== null) as number[];

  return Math.floor(
    nonNullValues.reduce((prev, current) => prev + current) /
      nonNullValues.length
  );
};

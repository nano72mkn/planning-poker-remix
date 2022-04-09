import type { PokerData } from "~/routes/room/$roomId";

export const getAverage = (pokerData: PokerData) => {
  const values = Object.values(pokerData);

  if (values.length === 0) return 0;

  return Math.floor(
    (values.reduce((prev, current) => {
      if (typeof current !== "number") return prev;
      if (typeof prev !== "number") return prev;
      return prev + current;
    }) as number) / values.length
  );
};

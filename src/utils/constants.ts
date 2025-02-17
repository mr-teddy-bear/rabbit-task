import { AlgoritmicalItem, Item } from "./interfaces";

export const ROUTES = {
  home: "/",
  algoritmical: "algoritmical",
  standart: "standart",
};

export const ITEMS: Item[] = Array.from({ length: 300 }, (_, index) => ({
  id: index + 1,
  label: `Element ${index + 1}`,
}));

export const ALGORITMICAL_ITEMS: AlgoritmicalItem[] = Array.from(
  { length: 300 },
  (_, index) => {
    const label = `Element ${index + 1}`;
    return {
      id: index + 1,
      label,
      lowerLabel: label.toLowerCase(),
    };
  }
);

import type { Ingredient } from "./Ingredient";

export interface Recipe {
  title: string;
  people: number | null;
  time: number | null;
  category: string;
  description?: string;
  ingredients: Array<Ingredient>;
  steps: Array<string>;
  id: string;
  favorite: boolean;
  filePath?: string;
  imageUrl?: string;
  createdAt?: object;
}

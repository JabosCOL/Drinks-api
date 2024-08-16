import { z } from "zod"
import { CategoriesAPIResponseSchema, DrinkAPIResponseSchema, DrinkDataAPISchema, DrinksAPIResponseSchema, FiltersSchema } from "../utils/recipes-schema"

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type Filters = z.infer<typeof FiltersSchema>
export type Drinks = z.infer<typeof DrinksAPIResponseSchema>
export type Drink = z.infer<typeof DrinkAPIResponseSchema>
export type DrinkData = z.infer<typeof DrinkDataAPISchema>

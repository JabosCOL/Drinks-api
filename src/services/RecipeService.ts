import axios from "axios";
import { CategoriesAPIResponseSchema, DrinkDataAPISchema, DrinksAPIResponseSchema } from "../utils/recipes-schema";
import { Drink, Filters } from "../types";

export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const { data } = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if (result.success) {
        return result.data
    }
}

export async function getDrinks(filters: Filters) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.ingredient}&c=${filters.category}`
    const { data } = await axios(url)
    const result = DrinksAPIResponseSchema.safeParse(data)
    if (result.success) {
        return result.data
    }
}

export async function getDrinkData(id: Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const { data } = await axios(url)
    const result = DrinkDataAPISchema.safeParse(data.drinks[0])
    if (result.success) {
        return result.data
    }
}
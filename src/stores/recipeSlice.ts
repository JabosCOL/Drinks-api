import { StateCreator } from "zustand"
import { getCategories, getDrinkData, getDrinks } from "../services/RecipeService"
import { Categories, Drink, DrinkData, Drinks, Filters } from "../types"

export type RecipeSliceType = {
    categories: Categories
    drinks: Drinks
    drinkData: DrinkData
    showModal: boolean
    fetchCategories: () => Promise<void>
    fetchDrinks: (filters: Filters) => Promise<void>
    fetchDrinkData: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipesSlice: StateCreator<RecipeSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    drinkData : {} as DrinkData,
    showModal: false,

    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    fetchDrinks: async (filters) => {
        const drinks = await getDrinks(filters)
        set({
            drinks
        })
    },
    fetchDrinkData: async (id) => {
        const drinkData = await getDrinkData(id)
        set({
            drinkData,
            showModal: true
        })
    },
    closeModal: () => {
        set({
            showModal: false
        })
    }
})
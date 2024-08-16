import { StateCreator } from "zustand"
import { DrinkData } from "../types"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export type FavoritesSliceType = {
    favorites: DrinkData[]
    addFavorite: (favorite: DrinkData) => void
    favoriteExist: (id: DrinkData['idDrink'])  => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],

    addFavorite: (favorite: DrinkData) => {
        if (get().favorites.some(stateFavorite => stateFavorite.idDrink === favorite.idDrink)) {
            set({
                favorites: get().favorites.filter((stateFavorite) => stateFavorite.idDrink !== favorite.idDrink)
            })
            createNotificationSlice(set, get, api).showNotification({text: `${favorite.strDrink} has been removed from favorites.`, error: true})
        } else {
            set(state => ({
                favorites: [...state.favorites, favorite]
            }))
            createNotificationSlice(set, get, api).showNotification({text: `${favorite.strDrink} has been added to favorites!`, error: false})
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id: DrinkData["idDrink"]) => {
        return get().favorites.some(stateFavorite => stateFavorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})
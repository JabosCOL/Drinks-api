import { create } from "zustand";
import { devtools } from "zustand/middleware"
import { createRecipesSlice, RecipeSliceType } from "./recipeSlice";
import { createFavoritesSlice, FavoritesSliceType } from "./favoriteSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export const useAppStore = create<RecipeSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})))

import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkDisplay from "../components/DrinkDisplay"
import Modal from "../components/Modal"

export default function FavoritesPage() {
    const favorites = useAppStore((state) => state.favorites)
    const hasFavorites = useMemo(() => favorites.length ,[favorites])
    const showModal = useAppStore((state) => state.showModal)

    return (
        <>
            <h1 className="text-6xl font-extrabold">Favorites</h1>
            {hasFavorites ? (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 py-10 gap-10">
                    {favorites.map(drink => (
                        <DrinkDisplay
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">
                    There are not favorites yet, add some and then come back 🥂!
                </p>
            )}
            {showModal && <Modal />}
        </>
    )
}

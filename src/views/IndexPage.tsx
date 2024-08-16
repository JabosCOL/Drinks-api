import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkDisplay from "../components/DrinkDisplay"
import Modal from "../components/Modal"

export default function IndexPage() {
    const drinks = useAppStore((state) => state.drinks)
    const showModal = useAppStore((state) => state.showModal)
    const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])

    return (
        <>
            <h1 id="drinks" className="text-6xl font-extrabold">Drinks</h1>
            {hasDrinks ? (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 py-10 gap-10">
                    {drinks.drinks.map(drink => (
                        <DrinkDisplay
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">
                    There are not drinks yet, Fill in the form to give you some ideas 🥂!
                </p>
            )}
            {showModal && <Modal />}
        </>
    )
}

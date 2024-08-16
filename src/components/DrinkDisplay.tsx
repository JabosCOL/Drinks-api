import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkDisplayProps = {
    drink: Drink
}

export default function DrinkDisplay({drink}: DrinkDisplayProps) {
    const fetchDrinkData = useAppStore((state) => state.fetchDrinkData)

    return (
        <div className="shadow-lg rounded-lg border overflow-hidden">
            <div className="overflow-hidden">
                <img
                    src={drink.strDrinkThumb}
                    alt={`Image for ${drink.strDrink}`}
                    className="hover:scale-125 hover:rotate-6 transition-transform"
                />
            </div>
            <div className="p-5 space-y-4">
                <h3 className="text-2xl font-black truncate">{drink.strDrink}</h3>
                <button
                    type="button"
                    className="w-full rounded-lg p-3 bg-orange-400 text-white text-lg font-bold uppercase hover:bg-orange-500 transition-colors"
                    onClick={() => fetchDrinkData(drink.idDrink)}
                >
                    See recipe
                </button>
            </div>
        </div>
    )
}

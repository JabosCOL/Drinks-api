import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useAppStore } from "../stores/useAppStore"
import { DrinkData } from "../types"

export default function Modal() {
    const showModal = useAppStore((state) => state.showModal)
    const closeModal = useAppStore((state) => state.closeModal)
    const drinkData = useAppStore((state) => state.drinkData)
    const addFavorite = useAppStore((state) => state.addFavorite)
    const favoriteExist = useAppStore((state) => state.favoriteExist)

    const ingredients = () => {
        const keys = Object.keys(drinkData)
        const totalIngredients = keys.filter((key) => key.includes("strIngredient")).length

        let description: string[] = []

        for (let i = 1; i <= totalIngredients; i++) {
            const ingredient = drinkData[`strIngredient${i}` as keyof DrinkData]
            const measure = drinkData[`strMeasure${i}` as keyof DrinkData]
            if (ingredient && measure) {
                description = [...description, `${ingredient} - ${measure}`]
            }
        }

        return description
    }

    const handleOnClickFavorite = () => {
        addFavorite(drinkData)
        closeModal()
    }

    return (
        <>
            <Dialog open={showModal} onClose={closeModal} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center">
                    <DialogPanel className="max-w-md w-full border bg-white rounded-lg">
                        <DialogTitle className="text-2xl font-bold p-5">{drinkData.strDrink}</DialogTitle>
                        <div className="border-y-4 border-orange-400">
                            <img className="object-fill px-12" src={drinkData.strDrinkThumb} alt={`image of ${drinkData.strDrink}`} />
                        </div>
                        <div className="p-5 space-y-4">
                            <h3 className="text-lg font-bold">Ingredients and measures</h3>
                            <ul className="list-disc pl-5 h-12 flex flex-wrap gap-x-8 overflow-y-auto">
                                {ingredients().map((ingredient, key) => (
                                    <li key={key}>{ingredient}</li>
                                ))}
                            </ul>
                            <h3 className="text-lg font-bold">Instructions</h3>
                            <Description className="max-h-20 overflow-y-auto">
                                {drinkData.strInstructions}
                            </Description>
                            <div className="flex justify-evenly gap-5">
                                <button
                                    className="bg-slate-400 w-full p-3 rounded-lg"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-orange-500 w-full p-3 rounded-lg"
                                    onClick={handleOnClickFavorite}
                                >
                                    {favoriteExist(drinkData.idDrink) ? 'Remove from favorites' : 'Add to favorites'}
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

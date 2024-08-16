import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === "/", [pathname])
    const categories = useAppStore((state) => state.categories)
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const fetchDrinks = useAppStore((state) => state.fetchDrinks)
    const showNotification = useAppStore((state) => state.showNotification)

    useEffect(() => {
        fetchCategories()
    }, [])

    const [filters, setFilters] = useState({
        ingredient: "",
        category: ""
    })

    const handleForm = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validation
        if (Object.values(filters).includes("")) {
            showNotification({
                text: 'All fields are required!',
                error: true
            })
            return
        }

        await fetchDrinks(filters)

        // Scroll into drinks list
        const drinksSection = document.getElementById("drinks")

        drinksSection?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        })
    }

    return (
        <header className={isHome ? "bg-header bg-cover bg-center" : "bg-slate-800"}>
            <div className="container mx-auto px-5 py-16">
                <div className="flex justify-between items-center">
                    <div className="w-32">
                        <NavLink to="/">
                            <img src="/logo.svg" alt="logo" />
                        </NavLink>
                    </div>
                    <nav className="flex gap-4">
                        <NavLink
                            to="/"
                            className={
                                ({ isActive }) => isActive ? "text-orange-400 font-bold uppercase"
                                    : "text-white font-bold uppercase"
                            }
                        >Home</NavLink>
                        <NavLink
                            to="/favorites"
                            className={
                                ({ isActive }) => isActive ? "text-orange-400 font-bold uppercase"
                                    : "text-white font-bold uppercase"
                            }
                        >favorites</NavLink>
                    </nav>
                </div>
                {isHome && (
                    <form
                        onSubmit={handleSubmit}
                        className="md:w-1/2 2xl:w-1/3 space-y-6 my-32 p-10 rounded-lg shadow bg-orange-400"
                    >
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white text-lg font-extrabold uppercase"
                            >ingredient</label>
                            <input
                                type="text" name="ingredient" id="ingredient"
                                placeholder="Ingredient: Vodka, Tequila, Coffee"
                                className="w-full p-3 rounded-lg focus:outline-none"
                                onChange={handleForm}
                                value={filters.ingredient}
                            />
                        </div>
                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="block text-white text-lg font-extrabold uppercase"
                            >Category</label>
                            <select
                                name="category" id="category"
                                className="w-full p-3 rounded-lg focus:outline-none"
                                onChange={handleForm}
                                value={filters.category}
                            >
                                <option value="">-- Select --</option>
                                {categories.drinks.map(({ strCategory }) => (
                                    <option key={strCategory} value={strCategory}>{strCategory}</option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit" value="Search drinks"
                            className="w-full p-2 text-white uppercase font-extrabold rounded-lg bg-orange-700 hover:bg-orange-800" />
                    </form>
                )}

            </div>
        </header>
    )
}

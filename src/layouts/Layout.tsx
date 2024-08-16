import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";
import Header from "../components/Header";
import Notification from "../components/Notification";

export default function Layout() {
    const loadFromStorage = useAppStore((state) => state.loadFromStorage)

    useEffect(() => {
        loadFromStorage()
    }, [])


    return (
        <>
            <Header />
            <Notification />
            <main className="container mx-auto px-5 py-16">
                <Outlet />
            </main>
        </>
    )
}

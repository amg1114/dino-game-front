import { Outlet } from "react-router-dom";
import Navbar from "../partials/navbar/Navbar";

export function LayoutComponent() {
    return (
        <>
            <Navbar />
            <div className="container content-layout">
                <aside><h1>Aside Content</h1></aside>
                <main>
                    <h1>Main Content</h1>
                    <Outlet></Outlet>
                </main>
            </div>
        </>
    )
}
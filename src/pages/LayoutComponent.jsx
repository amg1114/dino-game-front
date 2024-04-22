import { Outlet } from "react-router-dom";
import Navbar from "../partials/navbar/Navbar";

export function LayoutComponent() {
    return (
        <>
            <Navbar />
            <div className="container content-layout">
                <aside>
                    <h2>Aside Content</h2>
                    <ul>
                        <li>Catetegoria 1</li>
                        <li>Catetegoria 2</li>
                        <li>Catetegoria 3</li>
                    </ul>
                </aside>
                <main>
                    <h1>Main Content</h1>
                    <Outlet></Outlet>
                </main>
            </div>
        </>
    )
}
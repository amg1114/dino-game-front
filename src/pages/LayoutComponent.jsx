import { Outlet } from "react-router-dom";
import Navbar from "../partials/navbar/Navbar";

export function LayoutComponent() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Outlet></Outlet>
            </div>
        </>
    )
}
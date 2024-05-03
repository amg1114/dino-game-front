import { Outlet } from "react-router-dom";
import { FormularioFiltros } from "../../../partials/FormularioFiltros/FormularioFiltros";

// juegos 
// juegos/1
export function PaginaJuegos() {
    return <>
        <div className="container">
            <FormularioFiltros onSearch={(data)=>console.log({data})} />
            <h1>Pagina Juegos</h1>
            <button>descargame</button>
            <Outlet />
        </div>
    </>
}
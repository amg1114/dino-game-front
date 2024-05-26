export function Confirmar({datos, versions}) {
    return <>
    {
        Object.values(datos).every(valor => valor !== "") && datos.categorias.length > 0 && versions.length > 0?
        <div className="spantext">
            <p> CONFIRMACION DE CREACIÓN DE JUEGO</p>
            <p> ¿ESTA DE ACUERDO CON LA CREACION DEL SIGUIENTE JUEGO?</p>
            <ul>
                <li>{datos.titulo}</li>
                <li>{datos.descripcion}</li>
                <li>{datos.categorias.map(categoria => categoria.titulo).join(', ')}</li>
                <li>{versions[versions.length - 1].version}</li>
            </ul>
            <p> Por favor, confirme su aprobación para proceder con la creacion del juego.</p>
        </div>:<></>
    }
    </>
}
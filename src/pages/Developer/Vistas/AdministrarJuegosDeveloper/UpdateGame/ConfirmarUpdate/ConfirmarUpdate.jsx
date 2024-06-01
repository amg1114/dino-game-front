import './Confirmar.css'

export function ConfirmarUpdate({datos, versions, prevVersion, assets}) {
    return <>
    {
        Object.values(datos).every(valor => valor !== "") && datos.categorias.length > 0 && (versions.length > 0 || prevVersion !== undefined) && assets.length > 0?
        <div className="spantext">
            <p> CONFIRMACION DE ACTUALIZACION DE JUEGO</p>
            <p> ¿ESTA DE ACUERDO CON LA INFORMACION?</p>
            <ul>
                <li>{datos.titulo}</li>
                <li>{datos.descripcion}</li>
                <li>{datos.categorias.map(categoria => categoria.titulo).join(', ')}</li>
                {versions.length>0? 
                <li>{versions[versions.length - 1].version}</li>:
                <li>{prevVersion[0].version}</li>
            }
            </ul>
            <div className="assets-box">
                {assets.filter(asset => asset.state !== 'to_delete').length ?
                            (assets.filter(asset => asset.state !== 'to_delete').map(asset => {return <img className="assets-img" src={asset.url} alt={asset.name} />}))
                            : <></>}
            </div>
            <p> Por favor, confirme su aprobación para proceder con la creacion del juego.</p>
        </div>:<><h3>NO HA ACTUALIZADO NINGUN CAMPO</h3></>
    }
    </>
}
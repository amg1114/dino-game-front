

export function Imagenes({ assets, handleAssetChange, handleAssetDelete, handleAssetReset }) {
    return <>
        <div className="formulario-agregar-juego">
            <div className="contenedor-form-modal">
                {/* <AssetsForm
                    assets={assets}
                    maxFiles={5}
                    onChange={(asset) => handleAssetChange(asset)}
                    onDelete={(id) => handleAssetDelete(id)}
                    onReset={() => handleAssetReset()}
                /> */}
            </div>
        </div>
    </>
}
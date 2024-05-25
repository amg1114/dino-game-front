import AssetsForm from "../../../../../components/assetsForm/AssetsForm"

export function Imagenes({ assets, handleAssetChange, handleAssetDelete, handleAssetReset }) {
    return <>
        <div className="formulario-agregar-noticia">
            <div className="contenedor-form-modal">
                <AssetsForm
                    assets={assets}
                    maxFiles={5}
                    onChange={(asset) => handleAssetChange(asset)}
                    onDelete={(id) => handleAssetDelete(id)}
                    onReset={() => handleAssetReset()}
                />
            </div>
        </div>
    </>
}
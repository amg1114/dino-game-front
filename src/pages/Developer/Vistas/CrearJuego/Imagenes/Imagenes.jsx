import { CreateAssetsForm } from "../../../../../components/Forms/CreateAssetsForm/CreateAssetsForm";


export function Imagenes({ assets, handleAssetChange, handleAssetDelete, handleAssetReset }) {
    return <>
        <div className="formulario-agregar-juego">
            <div className="contenedor-form-modal">
                <CreateAssetsForm
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
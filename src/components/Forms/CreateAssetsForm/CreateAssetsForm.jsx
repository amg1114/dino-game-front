import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

import { AssetPreview } from "../AssetPreview/AssetPreview";

export const CreateAssetsForm = ({ maxFiles, onChange, onDelete, onReset, assets }) => {
    /**
   * Reinicia la lista de objetos y de archivos por subir a vacío.
   */
    const reset = () => {
        Swal.fire({
            title: "¿Estás seguro de descartar?",
            text: "Todas la imágenes se eliminarán",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef5454",
            cancelButtonColor: "#8f8b8b",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                onReset();
            }
        });
    }

    /**
     * Procesa los archivos que se van a subir y genera el preview.
     * @param {React.ChangeEvent<HTMLInputElement} e Event performed
     */
    const handleFileChange = (e) => {
        const newAssets = [];
        for (let index = 0; index < e.target.files.length; index++) {
            if (index > maxFiles - 1) {
                Swal.fire({ title: `Solo se pueden subir ${maxFiles} archivos`, icon: 'error' })
                break;
            }

            const file = e.target.files.item(index);

            const asset = {
                id: uuidv4(),
                name: file.name,
                url: URL.createObjectURL(file),
                state: 'pending',
                file,
            }

            if (assets.some(obj => obj.name === asset.name)) {
                Swal.fire({ title: `El archivo ${asset.name} ya está agregado`, icon: 'error' })
                return
            }
            newAssets.push(asset);
        }
        if (newAssets.length > 0) {
            onChange(newAssets);
        }
    };

    return (
        <div className='assets-form'>
            <h3>Subir Imágenes</h3>
            <div className="assets-preview-group">
                {

                    assets.filter(asset => asset.state !== 'to_delete').length ?
                        (assets.filter(asset => asset.state !== 'to_delete').map(asset => <AssetPreview file={asset} key={asset.id} onDelete={onDelete} />))
                        : <p>No hay imágenes para subir aún.</p>
                }
            </div>
            <form className="buttons-group">
                <input className='assets-form__input-file ' type="file" name='assetInput' id="assetInput" multiple onChange={(e) => handleFileChange(e)} />
                { assets.filter(asset => asset.state !== 'to_delete').length  < maxFiles ? <label className='btn btn-2' htmlFor="assetInput">Agregar Imagen</label> : <></>}
                {
                    assets.filter(asset => asset.state === 'pending').length ?
                        <button className='btn btn-3' type="button" onClick={reset}>Descartar</button>
                        : <></>
                }
            </form>
        </div>
    );
}
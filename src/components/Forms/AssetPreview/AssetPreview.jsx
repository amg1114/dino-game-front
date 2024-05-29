import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "./AssetPreview.css";

export function AssetPreview({ file, onDelete }) {
    const { id, url, name, state } = file;

    const [stateClass, setStateClass] = useState('');

    useEffect(() => {
        setStateClass(state === 'in_progress' ? 'assets-preview-group__box--progress' : state === 'completed' ? 'assets-preview-group__box--completed' : '');
    }, [state])

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro de eliminar la imagen?',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(id);
            }
        })
    }
    return (
        <div className={`assets-preview-group__box ${stateClass}`} data-file={id} key={file.id}>
            <img className="assets-preview-group__img" src={url} alt={name}/>
            <button className="assets-preview-group__delete-button" onClick={() => handleDelete()}>
                <span className="material-symbols-outlined" >
                    delete
                </span>
            </button>
        </div>
    )
}
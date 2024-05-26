import Swal from "sweetalert2";

export function PreviewImage({ file, onDelete }) {
    const { id, url, name, state } = file;
    const handleDelete = ()=>{
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
        <div className={'box assetPreview ' + state} data-file={id}>
            <img src={url} alt={name} />
            <button className="delete-image" onClick={()=>handleDelete()}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
        </div>
    )
}
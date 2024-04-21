export function PreviewImage({ file }) {
    const { id, url, name, state } = file;
    return (
        <div className={'box assetPreview ' + state} data-file={id}>
            <img src={url} alt={name} />
        </div>
    )
}
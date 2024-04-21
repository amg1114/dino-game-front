import axios from "axios"
import React, { useState } from 'react';
import "./AssetsForm.css";

const AssetsForm = () => {
  const [previewFiles, setPreviewFiles] = useState([])

  const handleFileChange = (e) => {
    let parsedFiles = [];

    for (let index = 0; index < e.target.files.length; index++) {
      const newFile = e.target.files[index];
      parsedFiles.push({
        preUrl: URL.createObjectURL(newFile),
        ...newFile
      })
    }
    setPreviewFiles([...parsedFiles, ...previewFiles]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post('http://localhost:3000/api/assets/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
      .then(res => console.log(res))
      .catch(res => console.log(res))
  };

  return (
    <div className='uploadAssetsForm'>
      <h3>Subir Imágenes</h3>
      <div className="preview-group">
        {previewFiles.map((file, i) =>
          <div className='box assetPreview' key={file.preUrl} >
            <img src={file.preUrl} alt={file.name} />
          </div>
        )}
      </div>
      <div className='assetField'>
        <form className="buttons-group" onSubmit={handleUpload}>
          <label className='btn btn-2' htmlFor="assetInput">Agregar Imagen</label>
          {previewFiles.length > 0 ? <button className='btn btn-1' type="submit">Enviar Imagenes</button> : <></>}
          <input type="file" name='assetInput' id="assetInput" onChange={handleFileChange} />
        </form>
      </div>

    </div>
  );
};

export default AssetsForm;

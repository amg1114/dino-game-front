// En el componente donde desees subir un archivo
import React, { useState } from 'react';
import { uploadFileToFirebase } from '../../services/assets-service';

const AssetsForm = () => {
  const [file, setFile] = useState(null);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      uploadFileToFirebase(
        file,
        (downloadURL) => {
          console.log('Archivo subido exitosamente:', downloadURL);
          // Aquí puedes hacer algo con el URL del archivo subido, como guardarlo en una base de datos
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
        }
      );
    } else {
      console.error('No se ha seleccionado ningún archivo');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir archivo</button>
    </div>
  );
};

export default AssetsForm;

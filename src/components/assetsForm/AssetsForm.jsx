import React, { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import "./AssetsForm.css";

import { asyncUploadFile } from "../../services/assets-service";

import { PreviewImage } from "./PreviewImage";
import Swal from 'sweetalert2';

const AssetsForm = ({ config }) => {
  const [previewFiles, setPreviewFiles] = useState([])
  const [filesToUpload, setFilesToUpload] = useState([])

  useEffect(() => {
    if (config.canSend && filesToUpload.length > 0) {
      handleFileUpload()
    }
  }, [config])

  /**
   * Procesa los archivos que se van a subir y genera el preview.
   * @param {React.ChangeEvent<HTMLInputElement} e Event performed
   */
  const handleFileChange = (e) => {
    let newPreviewObjects = [...previewFiles];
    let newFilesToUpload = [...filesToUpload];

    for (let index = 0; index < e.target.files.length; index++) {
      if (index > config.maxFiles - 1) {
        Swal.fire({ title: `Solo se pueden subir ${config.maxFiles} archivos`, icon: 'error' })
        break;
      }
      const file = e.target.files.item(index);

      const previewObject = {
        id: uuidv4(),
        name: file.name,
        url: URL.createObjectURL(file)
      }

      if (newPreviewObjects.some(obj => obj.name === previewObject.name)) {
        Swal.fire({ title: `El archivo ${previewObject.name} ya está agregado`, icon: 'error' })
        return
      }

      newPreviewObjects.push(previewObject);
      newFilesToUpload.push(file);
    }

    setFilesToUpload(newFilesToUpload);
    setPreviewFiles(newPreviewObjects)
  };

  /**
   * Envía los archivos al servicio de subida y actualiza el estado de cada objeto
   * 
   */
  const handleFileUpload = () => {

    for (let index = 0; index < filesToUpload.length; index++) {
      const file = filesToUpload[index];
      const previewObj = previewFiles[index];
      const assetData = {
        title: file.name,
        ownerId: config.ownerId,
        path: config.path,
        index: index,
        file
      }
      setPreviewObjectsInProgress()

      asyncUploadFile(assetData,
        (progress, filename) => {
          updatePreviewObjectProgress(progress, previewObj.id)
        },
        (e) => { setPreviewObjectCompleted(previewObj.id) },
        (err) => {
          Swal.fire({
            title: `Error al subir el archivo: ${previewObj.name}`,
            icon: 'error'
          })
          console.error(err);
        }
      );
    };

  }

  /**
   * Ejecuta la funcion para colocar el estado en 'completed' cunado el porcentaje de
   * subida es 100
   * @param {number} percentage Porcentaje de subida
   * @param {string} filename ID en el objeto preview
   */
  const updatePreviewObjectProgress = (percentage, preview_id) => {
    if (percentage === 100) {
      setPreviewObjectCompleted(preview_id)
    }
  }

  /**
   * Actualiza el estado en el objeto preview a 'completed'.
   * @param {string} filename 
   */
  const setPreviewObjectCompleted = (preview_id) => {
    let prevFiles = [...previewFiles];

    prevFiles.forEach(file => {
      if (file.id === preview_id) {
        file.state = 'completed'
      }
    });

    setPreviewFiles(prevFiles);
    checkFinish()
  }

  /**
   * Actualiza el estado de todos los objetos preview a 'in_progress'.
   */
  const setPreviewObjectsInProgress = () => {
    let prevFiles = [...previewFiles];
    prevFiles.forEach((file) => {
      file.state = 'in_progress'
    });
    setPreviewFiles(prevFiles);
  }

  /**
   * Revisa si todos los objetos preview tienen el estado 'completed', si se cumple
   * reinicia la lista de objetos y de archivos por subir a vacío.
   */
  const checkFinish = () => {
    let completedFiles = [...previewFiles];
    completedFiles = completedFiles.filter(file => file.state === 'completed');

    if (completedFiles.length === previewFiles.length) {
      setPreviewFiles([])
      setFilesToUpload([])
      Swal.fire({
        title: 'Todas las imágenes se subieron con éxito',
        icon: 'success'
      })
    }
  }

  /**
   * Reinicia la lista de objetos y de archivos por subir a vacío.
   */
  const reset = () => {
    Swal.fire({
      title: "¿Estás segure de descartar?",
      text: "Todas la imágenes se eliminarán",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef5454",
      cancelButtonColor: "#8f8b8b",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        setPreviewFiles([])
        setFilesToUpload([])
      }
    });
  }

  return (
    <div className='uploadAssetsForm'>
      <h3>Subir Imágenes</h3>
      <div className="preview-group">

      </div>
      <div className='assetField'>
        <div className="preview-group">
          {
            previewFiles.length ?
              (previewFiles.map(file => <PreviewImage file={file} key={file.id} />))
              : <p>No hay imágenes para subir aún.</p>
          }
        </div>
        <form className="buttons-group">
          <input type="file" name='assetInput' id="assetInput" multiple onChange={handleFileChange} />
          {filesToUpload.length < config.maxFiles ? <label className='btn btn-2' htmlFor="assetInput">Agregar Imagen</label> : <></>}
          {
            filesToUpload.length ?
              <button className='btn btn-3' type="button" onClick={reset}>Descartar</button>
              : <></>
          }
        </form>
      </div>
    </div>
  );
};

export default AssetsForm;

import { TextField } from "@mui/material";
import { InputFilledStyleAdmin } from "../../../../../utils/mui.styles-admin";

export function Informacion({datos, handleChange}){
    return<>
        <div className='content-tab'>
                    <h3><span>INFORMACION DEL JUEGO</span></h3>
                    <div className="field-wrapper full-width">
                        <TextField
                            id="titulo"
                            name="titulo"
                            value={datos.titulo}
                            onChange={handleChange}
                            sx={InputFilledStyleAdmin}
                            fullWidth
                            variant="filled"
                            label='TITULO'
                        />
                    </div>
                    <div className="field-wrapper full-width">
                        <TextField
                            id="descripcion"
                            name="descripcion"
                            value={datos.descripcion}
                            onChange={handleChange}
                            label="DESCRIPCION"
                            multiline
                            minRows={7}
                            sx={InputFilledStyleAdmin}
                            variant="filled"
                            fullWidth
                        />
                    </div>
                    <div className="field-wrapper full-width">
                        <TextField
                            id="categoria"
                            name="categoria"
                            value={datos.categoria}
                            onChange={handleChange}
                            label="CATEGORIA"
                            sx={InputFilledStyleAdmin}
                            variant="filled"
                            fullWidth
                        />
                    </div>
                    <div className="field-wrapper full-width">
                        <TextField
                            id="precio"
                            name="precio"
                            type='number'
                            value={datos.precio}
                            onChange={handleChange}
                            label="PRECIO"
                            sx={InputFilledStyleAdmin}
                            variant="filled"
                            fullWidth
                        />
                    </div>
                </div>
    </>
}
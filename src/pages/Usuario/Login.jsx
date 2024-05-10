import { TextField } from "@mui/material";
import { Link } from "react-router-dom"; 
import { InputFilledStyle } from "../../utils/mui.styles";

export function Login() {

    return (
        <>
            <div className="modal-fade animate__animated animate__fadeIn">
                <div className="modal-content modal-form animate__animated animate__slideInDown">
                    <div className="modal-header">
                        <Link to="/juegos" className="modal-closer">
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </Link>
                    </div>
                        <div className="form form-login">
                        <TextField type="email" id="filled-basic" label="Correo electronico" variant="filled" sx={InputFilledStyle} />
                        </div>
                        <div>
                        <TextField type="password" id="filled-basic" label="Contraseña" variant="filled" sx={InputFilledStyle} />
                        </div>
                </div>
            </div>
        </>
    )
}


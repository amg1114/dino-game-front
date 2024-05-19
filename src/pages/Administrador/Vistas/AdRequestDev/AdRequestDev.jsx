import './AdRequestDev.css'

export function AdRequestDev() {
    return <>
        <div className="usuariosDevsPage">
            <h2><span>SOLICITUDES DE </span>DESARROLLADOR</h2>
            <h3><span>USUARIOS DESARROLLADORES ACTIVOS</span></h3>
            <div className='cuadro-users'>
                <h3 className='title'>ASUNTO</h3>
                <h3 className='title'>MENSAJE</h3>
                <h3 className='title'>USUARIO</h3>
                <div className='title'></div>

                <div className='info'><p>Solicitud Desarrollador</p></div>
                <div className='info'><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate reprehenderit perspiciatis magnam quidem corrupti molestias mollitia natus officiis odio pariatur eligendi, ratione cum quisquam iste amet facilis suscipit? Ex, atque?</p></div>
                <div className='info'><p>usuario@correo.com</p></div>
                <div className='info info-boton botones-solicitudes'>
                    <button>
                        <span class="material-symbols-outlined">
                            check
                        </span>
                    </button>
                    <button>
                        <span class="material-symbols-outlined">
                            close
                        </span>
                    </button>
                </div>

            </div>
        </div>
    </>
}
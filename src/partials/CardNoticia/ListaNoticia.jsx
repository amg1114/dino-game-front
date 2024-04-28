import { CardNotice } from '../../components/Noticias/CardNoticia';
import './ListaNoticia.css'

export function ListaNoticia({ noticias }) {
    return (
        <div >
        <h2 className='tituloPagina'><span>Dino-</span>Noticias</h2>
            <div className='contenedor'>
                {noticias.map((noticia, index) => (
                    <div key={index} className='noticeCard'>
                        <CardNotice
                            imagen={noticia.imagen}
                            titulo={noticia.titulo}
                            descripcion={noticia.descripcion}
                        />
                    </div>
                ))}
            </div>
        </div>

    )
}
import { CardNotice } from '../../components/Noticias/CardNoticia';
import './ListaNoticia.css'

export function ListaNoticia({ noticias }) {
    return (
        <div className='lista-noticias-section'>
            <div className='lista-noticias'>
                {noticias.map((noticia, index) => (
                    <div key={index} className='noticeCard'>
                        <CardNotice
                            id={noticia.id}
                            imagen={noticia.assets[0] ? noticia.assets[0].asset.url : ''}
                            titulo={noticia.titulo}
                            descripcion={noticia.descripcion.slice(0, 180) + '...'}
                        />
                    </div>
                ))}
            </div>
        </div>

    )
}
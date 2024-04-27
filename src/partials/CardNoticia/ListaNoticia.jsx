import { CardNotice } from '../../components/noticias/CardNotice';

export function ListaNoticia({ noticias }) {
    return (
        <div className="ListaNoticia ">
            <h2> <span>DINO</span>-NOTICIAS</h2>
            <div className="noticia-list">
                {noticias.map((noticia) => (
                    <CardNotice key={noticia + "noticia"}
                        image={noticia.image}
                        title={noticia.title}
                        url={noticia.url}
                        description={noticia.description}
                    />
                ))
                }
            </div>
        </div>
    )
}
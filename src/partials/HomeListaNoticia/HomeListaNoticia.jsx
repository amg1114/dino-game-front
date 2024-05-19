import { HomeCardNoticia } from "../../components/Noticias/HomeCardNoticia";


export function HomeListaNoticia({ notices, sectionTitle }) {

    return <>{
        notices.length ? <aside className="ListNotice">
            <h2>{sectionTitle}</h2>
            <div className="notice-list">
                {notices.map((elemento, index) => (
                    <HomeCardNoticia
                        id={elemento.id}
                        titulo={elemento.titulo}
                        fecha={elemento.fecha}
                        imagen={elemento.assets[0] ? elemento.assets[0].url: ''}
                        descripcion={elemento.descripcion}
                        key={index}
                    />
                ))
                }
            </div>
        </aside> : <></>
    }</>

}
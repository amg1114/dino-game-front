import { HomeCardNoticia } from "../../components/Noticias/HomeCardNoticia";


export function HomeListaNoticia({ notices, sectionTitle }) {

    return <>{
        notices.length ? <aside className="ListNotice">
            <h2>{sectionTitle}</h2>
            <div className="notice-list">
                {notices.map((elemento, index) => (
                    <HomeCardNoticia
                        image={elemento.assets[0].url}
                        title={elemento.titulo}
                        description={elemento.descripcion.slice(0, 70)}
                        url={"/noticias/" + elemento.id}
                        key={index}
                    />
                ))
                }
            </div>
        </aside> : <></>
    }</>

}
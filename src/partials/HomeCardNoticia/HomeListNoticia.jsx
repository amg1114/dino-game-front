import { HomeCardNoticia } from "../../components/Noticias/HomeCardNoticia";


export function HomeListNotice({ notices, sectionTitle }) {

    return (
        <aside className="ListNotice">
            <h2>{sectionTitle}</h2>
            <div className="notice-list">
                {notices.map((notice) => ( 
                    <HomeCardNoticia
                        imagen={notice.imagen}
                        titulo={notice.titulo}
                        descripcion={notice.descripcion}
                        id={notice.id}
                    />
                ))
                }
            </div>
        </aside>
    )
}
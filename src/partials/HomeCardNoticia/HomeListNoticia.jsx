import { HomeCardNoticia } from "../../components/Noticias/HomeCardNoticia";


export function HomeListNotice({ notices, sectionTitle }) {

    return (
        <aside className="ListNotice">
            <h2>{sectionTitle}</h2>
            <div className="notice-list">
                {notices.map((notice) => ( 
                    <HomeCardNoticia key={notice + "noticia"}
                        image={notice.image}
                        title={notice.title}
                        url={notice.url}
                        description={notice.description}
                    />
                ))
                }
            </div>
        </aside>
    )
}
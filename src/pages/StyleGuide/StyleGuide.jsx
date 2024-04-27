import { CarouselComponent } from "../../components/CarouselComponent/CarouselComponent";
import AssetsForm from "../../components/assetsForm/AssetsForm";
import { GameSectionList } from "../../partials/GameSectionList/GameSectionList";
import { HomeListNotice } from "../../partials/HomeCardNoticia/HomeListNoticia";

export function StyleGuidePage() {
    const slides = [
        {
            url: "https://www.gamerfocus.co/wp-content/uploads/2023/12/calendario-de-festivales-y-rebajas-de-steam-del-ano-2024.jpg",
            title: "Imagen 1"
        },
        {
            url: "https://media.vandal.net/m/7-2022/202272017151678_1.jpg",
            title: "Imagen 2"
        },
        {
            url: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/06/ya-estan-aqui-rebajas-verano-steam-vez-hay-ofertazas-2739753.jpg?tf=3840x",
            title: "Imagen 3"
        }
    ];

    const games = [
        {
            image: "https://image.api.playstation.com/cdn/UP0006/CUSA01925_00/RxeNb9Ph1y2VhBGv5Ct0tuY6f5xC4t9f.png",
            title: "NEED FOR SPEED: DELUXE EDITION",
            url: "#",
            description: "juego #1",
        },
        {
            image: "https://www.irrompibles.net/irrwp/wp-content/uploads/2019/11/NeedForSpeedHeat-head.jpg",
            title: "NEED FOR SPEED: HEAT",
            url: "#",
            description: "juego #2",
        },
        {
            image: "https://cdn.akamai.steamstatic.com/steam/apps/1262560/header.jpg?t=1605151411",
            title: "NEED FOR SPEED: MOST WANTED",
            url: "#",
            description: "juego #3",
        }
    ]

    const notices = [
        {
            image: "https://image.api.playstation.com/cdn/UP0006/CUSA01925_00/RxeNb9Ph1y2VhBGv5Ct0tuY6f5xC4t9f.png",
            title: "NEED FOR SPEED: DELUXE EDITION",
            url: "#",
            description: "juego #1",
        },
        {
            image: "https://www.irrompibles.net/irrwp/wp-content/uploads/2019/11/NeedForSpeedHeat-head.jpg",
            title: "NEED FOR SPEED: HEAT",
            url: "#",
            description: "juego #2",
        },
        {
            image: "https://cdn.akamai.steamstatic.com/steam/apps/1262560/header.jpg?t=1605151411",
            title: "NEED FOR SPEED: MOST WANTED",
            url: "#",
            description: "juego #3",
        },
        {
            image: "https://www.irrompibles.net/irrwp/wp-content/uploads/2019/11/NeedForSpeedHeat-head.jpg",
            title: "NEED FOR SPEED: HEAT",
            url: "#",
            description: "juego #2",
        },
        {
            image: "https://cdn.akamai.steamstatic.com/steam/apps/1262560/header.jpg?t=1605151411",
            title: "NEED FOR SPEED: MOST WANTED",
            url: "#",
            description: "juego #3",
        }
    ]


    return (
        <div className="container content-layout">
            <aside>
                <h2>Aside Content</h2>
                <ul>
                    <li>Catetegoria 1</li>
                    <li>Catetegoria 2</li>
                    <li>Catetegoria 3</li>
                </ul>
                <HomeListNotice notices={notices} sectionTitle={'DinoNoticias'}/>
            </aside>
            <main>
                <h1>Main Content</h1>
                <CarouselComponent slides={slides} />
                <h1>hola soy h1</h1>
                <h2>hola soy h2</h2>
                <h3>hola soy h3</h3>
                <h4>hola soy h4</h4>
                <p>hola soy el parrafo<a href="">soy un link dentro de un parrafo</a>. Texto de prueba: Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsa dolorum quo. Enim iste eum maxime, recusandae officia numquam officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ipsa deserunt sint delectus quis labore repellat nostrum minus cupiditate. Quidem omnis eligendi, quod dolorum minus eius deserunt. Quam earum accusantium architecto minus inventore, nobis harum maiores, nostrum totam autem explicabo quidem voluptates illum id omnis voluptatem magni ipsam molestiae delectus? Ad voluptatibus officia explicabo ipsum, repellendus sunt laborum earum est corrupti fugit non minima quae vero voluptate itaque consectetur nam omnis sed deserunt repellat eaque unde. Voluptatem omnis voluptatum itaque iste eligendi ullam nemo doloremque aperiam id minima magni repudiandae ipsum incidunt corrupti, distinctio nobis iusto, iure nostrum consequatur. Delectus.</p>

                <div className="container">
                    <div className="buttons-group">
                        <a href="#" className="btn btn-1">COMPRAR</a>
                        <a href="#" className="btn btn-2">AÑADIR</a>
                        <a href="#" className="btn btn-3">ELIMINAR</a>
                        <a href="#" className="btn btn-4">GUARDAR</a>
                        <a href="#" className="btn btn-5">DESCARTAR</a>
                    </div>
                </div>
                <GameSectionList games={games} sectionTitle={'Categoria 1'} />
                <GameSectionList games={games} sectionTitle={'Categoria 2'} />
                <GameSectionList games={games} sectionTitle={'Categoria 3'} />
                <AssetsForm ownerId={1} path={'video-games'} />
            </main>
        </div>
    )
}
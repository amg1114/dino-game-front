import { CarouselComponent } from "../../components/CarouselComponent/CarouselComponent";
import AssetsForm from "../../components/assetsForm/AssetsForm";
import { GameSectionList } from "../../partials/GameSectionList/GameSectionList";
import { HomeListaNoticia } from "../../partials/HomeListaNoticia/HomeListaNoticia";
import { ListaNoticia } from "../../partials/CardNoticia/ListaNoticia"

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
            precio: 20,
            titulo: "The Legend of Zelda: Breath of the Wild",
            descripcion: "Este juego de aventuras de mundo abierto desarrollado por Nintendo para la consola Nintendo Switch es aclamado por su vasto mundo y su libertad de exploración. Los jugadores asumen el papel de Link, quien despierta de un largo sueño para descubrir un Hyrule devastado por el mal. Con una narrativa no lineal y una mecánica de juego innovadora, Breath of the Wild redefine la experiencia de la serie The Legend of Zelda.",
            fechaLanzamiento: "2017-05-03",
            assets: [
                {
                    id: 4,
                    title: "zelda_01.webp",
                    url: "https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F2%2Fzelda_01.webp?alt=media&token=b0e19546-9ee2-41fb-8778-3536957b5454"
                }
            ]
        },
        {
            id: 4,
            precio: 40,
            titulo: "The Last of Us Part II",
            descripcion: "Secuela del exitoso juego de Naughty Dog, The Last of Us Part II continúa la historia de Joel y Ellie en un mundo post-apocalíptico invadido por seres infectados. Los jugadores asumen principalmente el papel de Ellie, quien busca venganza en un viaje emocionalmente intenso y lleno de desafíos. Con una jugabilidad mejorada, una narrativa compleja y gráficos impresionantes, el juego ha sido elogiado por su profundidad y su tratamiento maduro de temas difíciles.",
            fechaLanzamiento: "2020-06-19",
            assets: [
                {
                    id: 10,
                    title: "tof2_01",
                    url: "https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F4%2Ftof2_01.png?alt=media&token=cf82a0ea-8b6b-4b7d-8aa3-2442df8daca2",
                }
            ]
        },
        {
            id: 5,
            precio: 50,
            titulo: "Cyberpunk 2077",
            descripcion: "Desarrollado por CD Projekt Red, Cyberpunk 2077 es un juego de rol de acción ambientado en Night City, una metrópolis futurista obsesionada con el poder, la moda y la tecnología. Los jugadores asumen el papel de V, un mercenario en busca de un implante único que garantiza la inmortalidad. Con un vasto mundo abierto y una historia no lineal, el juego ofrece una experiencia inmersiva en un entorno cyberpunk.",
            fechaLanzamiento: "2020-12-10",
            assets: [
                {

                    id: 13,
                    title: "cyberpunk_01",
                    url: "https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F5%2Fcyberpunk_01.jpg?alt=media&token=ffd1ef40-4ce2-47dd-925f-d214c614fec7"
                }
            ]
        },
        {
            id: 6,
            precio: 50,
            titulo: "Cyberpunk 2077",
            descripcion: "Desarrollado por CD Projekt Red, Cyberpunk 2077 es un juego de rol de acción ambientado en Night City, una metrópolis futurista obsesionada con el poder, la moda y la tecnología. Los jugadores asumen el papel de V, un mercenario en busca de un implante único que garantiza la inmortalidad. Con un vasto mundo abierto y una historia no lineal, el juego ofrece una experiencia inmersiva en un entorno cyberpunk.",
            fechaLanzamiento: "2020-12-10",
            assets: [
                {

                    id: 13,
                    title: "cyberpunk_01",
                    url: "https://firebasestorage.googleapis.com/v0/b/dinogame-6bcaa.appspot.com/o/uploads%2Fvideo-games%2F5%2Fcyberpunk_01.jpg?alt=media&token=ffd1ef40-4ce2-47dd-925f-d214c614fec7"
                }
            ]
        }
    ]

    const notices = [
        {
            image: "https://image.api.playstation.com/cdn/UP0006/CUSA01925_00/RxeNb9Ph1y2VhBGv5Ct0tuY6f5xC4t9f.png",
            title: "NEED FOR SPEED: DELUXE EDITION",
            url: "#",
            description: "juego #1 sdfskdjhfnskdfksjhdkfjshdkjfs ksjdhfksjhdfkjshdfk sdhfisudyfiusdf akisjndksdbfks sdhfjosidhfosihdfos siudhfisudhfisuhdf sdifhsjdfs natalia te quiero mucho",
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

    const noticias = [
        {
            image: "https://www.91-cdn.com/hub/wp-content/uploads/2021/12/ar88u.jpg",
            title: "noticia 1",
            url: "#",
            description: "noticia..."
        },
        {
            image: "https://cdn.akamai.steamstatic.com/steam/apps/2134770/capsule_616x353.jpg?t=1713431762",
            title: "noticia 2",
            url: "#",
            description: "noticia..."
        },
        {
            image: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/01/free-steam-games-collage.jpg",
            title: "noticia 3",
            url: "#",
            description: "noticia..."
        },
        {
            image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/Best-coop-games-of-2012.jpg",
            title: "noticia 4",
            url: "#",
            description: "noticia..."
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
                <HomeListaNoticia notices={notices} sectionTitle={'DinoNoticias'} />
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
                <GameSectionList games={games} sectionTitle={'Categoria 1'} id={1} />
                <GameSectionList games={games} sectionTitle={'Categoria 2'} id={2} />
                <GameSectionList games={games} sectionTitle={'Categoria 3'} id={3} />
                <AssetsForm ownerId={1} path={'video-games'} />
                <ListaNoticia noticias={noticias} />
            </main>
        </div>
    )
}
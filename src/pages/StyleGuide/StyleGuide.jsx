import AssetsForm from "../../components/assetsForm/AssetsForm";

export function StyleGuidePage() {
    return (
        <>
            <h1>hola soy h1</h1>
            <h2>hola soy h2</h2>
            <h3>hola soy h3</h3>
            <h4>hola soy h4</h4>
            <p>hola soy el parrafo <a href="">soy un link dentro de un parrafo</a>. Texto de prueba: Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ipsa dolorum quo. Enim iste eum maxime, recusandae officia numquam officiis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ipsa deserunt sint delectus quis labore repellat nostrum minus cupiditate. Quidem omnis eligendi, quod dolorum minus eius deserunt. Quam earum accusantium architecto minus inventore, nobis harum maiores, nostrum totam autem explicabo quidem voluptates illum id omnis voluptatem magni ipsam molestiae delectus? Ad voluptatibus officia explicabo ipsum, repellendus sunt laborum earum est corrupti fugit non minima quae vero voluptate itaque consectetur nam omnis sed deserunt repellat eaque unde. Voluptatem omnis voluptatum itaque iste eligendi ullam nemo doloremque aperiam id minima magni repudiandae ipsum incidunt corrupti, distinctio nobis iusto, iure nostrum consequatur. Delectus.</p>
            
            <div className="container">
                <div className="buttons-group">
                    <a href="#" className="btn btn-1">COMPRAR</a>
                    <a href="#" className="btn btn-2">AÑADIR</a>
                    <a href="#" className="btn btn-3">ELIMINAR</a>
                    <a href="#" className="btn btn-4">GUARDAR</a>
                    <a href="#" className="btn btn-5">DESCARTAR</a>
                </div>
            </div>
            <AssetsForm ownerId={1} path={'video-games'} />
        </>
    )
}
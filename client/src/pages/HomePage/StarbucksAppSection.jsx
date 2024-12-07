import Imagenes from "../../imgs/Imagenes";

function StarbucksAppSection() {
    return (
        <section className="flex justify-between items-center p-5 bg-[#4BBE8A]">
            <figure className="w-1/2 flex justify-start">
                <img className="rounded w-11/12" src={Imagenes.img4} alt="Descarga la app de Starbucks" />
            </figure>
            <div className="w-1/2 p-4 text-white">
                <h2 className="text-2xl font-bold">¡Disfruta de Starbucks en la palma de tu mano!</h2><br />
                <p>
                    <strong>¡No te pierdas la oportunidad de saborear tus bebidas favoritas con Starbucks!
                        Descarga la app ahora y comienza a personalizar tu pedido.
                        #Starbucks #CaféEnTuMano #AppStarbucks #DisfrutaElSabor #TuCaféFavorito
                    </strong>
                </p>
                <figure className="flex flex-row justify-end gap-5 my-5">
                    <img src="https://www.guidum.com/wp-content/uploads/2023/06/google-play-badge-2.png" className="w-1/4" alt="Google Play" />
                    <img src="https://www.fotodng.com/wp-content/uploads/2017/09/app-store.png" className="w-1/4" alt="App Store" />
                </figure>
            </div>
        </section>
    );
}

export default StarbucksAppSection
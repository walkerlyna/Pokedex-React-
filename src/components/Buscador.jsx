import { Search } from "../assets/Icons"
import '../styles/buscador.css'

export const Buscador = () => {
    return (
        <section className="contenedor buscador">
            <input
                type="search"
                name="buscador"
                id="buscador-input"
                placeholder="Pokémon"
            />
            <button className="buscador-boton">
                <Search />
            </button>
        </section>                                                                                              
    )
}

import { usePokemon } from '../hooks/usePokemon';
import '../styles/fetchApi.css';

const Pokemon = ({ id, image, name, tipo }) => {
    return (
        <section className="card contenedor">

            <img src={image} alt={name} loading="lazy" />
            <p>N°{id}</p>

            <h4>{name}</h4>
            <div className="card_tipos">
                {tipo.map((elemento, index) => (
                    <span key={index} className={`badge ${elemento.toLowerCase()}`}>{elemento}</span>
                ))}
            </div>

        </section>
    );
}

export const FetchApi = () => {

    const { datos, isLoading, error, masPokemones } = usePokemon();

    return (
        <article className="contenedor">
            {isLoading
                ? <div className="loading-container">
                    <div className="spinner"></div>
                    <h2>Cargando...</h2></div>
                : error
                    ? <h2>Ocurrió un error: {error}</h2>
                    : datos.length === 0
                        ? <h2>No hay datos disponibles</h2>
                        : datos.map(dato => <Pokemon key={dato.id} {...dato} />)
            }
            <button onClick={masPokemones}>Ver mas pokes</button>
        </article >
    );
};
import { usePokemon } from '../hooks/usePokemon';
import InfiniteScroll from 'react-infinite-scroll-component';
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

    const { datos, isLoading, error, masPokemones, verMas } = usePokemon();

    return (

        <InfiniteScroll
            dataLength={datos.length}
            next={masPokemones}
            hasMore={verMas}
            loader={<Loader />}
            className='contenedor contenedor-poke'
            style={{ overflow: 'hidden' }}
        >
            {isLoading
                ? <div className="loading-container">
                    <div className="spinner"></div></div>
                : error
                    ? <h2>Ocurrió un error: {error}</h2>
                    : datos.length === 0
                        ? <h2>No hay datos disponibles</h2>
                        : datos.map(dato => <Pokemon key={dato.id} {...dato} />)
            }
        </InfiniteScroll>

    );
};

const Loader = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
        </div>
    )
}

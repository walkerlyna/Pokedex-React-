import { useEffect, useState } from "react";
import { mapPokemonData } from "../js/mapPokemonData";
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
    const [datos, setDatos] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    const doFetch = async () => {
        try {
            const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
            const response = await fetch(url);
            const data = await response.json();
            const { results } = data;

            // Una segunda llamada a la API para obtener el URL de cada Pokemon
            const pokemonDataPromises = results.map(async (pokemon) => {
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();
                return mapPokemonData(pokemonData);
            });

            const pokemonData = await Promise.all(pokemonDataPromises);
            setDatos(pokemonData);

        } catch (error) {
            console.log('Hubo un error: ', error);
            setError('Hubo un error al intentar cargar los datos.', error)
        } finally {
            setIsLoading(false);
        }

    };

    useEffect(() => {
        doFetch();
    }, []);

    return (
        <article className="contenedor">
            {isLoading
                ? <div className="contenedor loading-container">
                    <div className="spinner"></div>
                    <h2>Cargando...</h2></div>
                : error
                    ? <h2>Ocurrió un error: {error}</h2>
                    : datos.length === 0
                        ? <h2>No hay datos disponibles</h2>
                        : datos.map(dato => <Pokemon key={dato.id} {...dato} />)
            }
        </article >
    );
};
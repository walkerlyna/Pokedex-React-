import { useEffect, useState } from "react";
import { mapPokemonData } from "../js/mapPokemonData";
import '../styles/fetchApi.css';

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
                ? <div className="loading-container">
                    <div className="spinner"></div>
                    <h2>Cargando...</h2></div>
                : error
                    ? <h2>Ocurrió un error: {error}</h2>
                    : datos.length === 0
                        ? <h2>No hay datos disponibles</h2>

                        : datos.map(dato => (
                            <section key={dato.id} className="card contenedor">

                                <img src={dato.image} alt={dato.name} loading="lazy" />
                                <p>N°{dato.id}</p>

                                <h4>{dato.name}</h4>
                                <div className="card_tipos">
                                    {dato.tipo.map((tipo, tipoIndex) => (
                                        <span key={tipoIndex} className={`badge ${tipo.toLowerCase()}`}>{tipo}</span>
                                    ))}
                                </div>

                            </section>
                        ))
            }
        </article >
    );
};
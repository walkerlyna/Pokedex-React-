import { useEffect, useState } from "react";
import { mapPokemonData } from "../js/mapPokemonData";

const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';

export const usePokemon = () => {
    const [datos, setDatos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [siguiente, setSiguiente] = useState('');

    const doFetch = async (url = URL_DEFAULT) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const { next, results } = data;

            // Una segunda llamada a la API para obtener el URL de cada Pokemon
            const pokemonDataPromises = await Promise.all(results.map(async (pokemon) => {
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();
                return mapPokemonData(pokemonData);
            }));

            return { next, pokemonDataPromises }

        } catch (error) {
            console.log('Hubo un error: ', error);
            setError('Hubo un error al intentar cargar los datos.', error)
        } finally {
            setIsLoading(false);
        }
    }

    const obtenerPokemones = async () => {
        const { next, pokemonDataPromises } = await doFetch();
        setDatos(pokemonDataPromises);
        setSiguiente(next);
    }

    const masPokemones = async () => {
        const { next, pokemonDataPromises } = await doFetch(siguiente);
        setDatos(prev => [...prev, ...pokemonDataPromises]);
        setSiguiente(next);
    }

    useEffect(() => {
        obtenerPokemones();
    }, []);

    return {
        datos,
        isLoading,
        error,
        masPokemones
    }
}

import { useEffect, useState } from "react";
import '../styles/fetchApi.css';

const tipoMapping = {
    normal: 'Normal',
    fighting: 'Lucha',
    flying: 'Volador',
    grass: 'Planta',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'Eléctrico',
    ice: 'Hielo',
    poison: 'Veneno',
    ground: 'Tierra',
    psychic: 'Psíquico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Dragón',
    dark: 'Siniestro',
    steel: 'Acero',
    fairy: 'Hada',
};

export const FetchApi = () => {
    const [datos, setDatos] = useState([]);

    const doFetch = async () => {
        const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
        const response = await fetch(url);
        const data = await response.json();
        const { results } = data;

        // Nueva solicitud para extraer + datos
        const pokemonDataPromises = results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            const skills = pokemonData.abilities.map((ability) => ability.ability.name);
            const tipo = pokemonData.types.map((t) => tipoMapping[t.type.name] || t.type.name);

            return {
                id: pokemonData.id,
                name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
                altura: pokemonData.height,
                skills: skills,
                image: pokemonData.sprites.front_default,
                imageShiny: pokemonData.sprites.front_shiny,
                tipo: tipo
            };
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        setDatos(pokemonData);
    };

    useEffect(() => {
        doFetch();
    }, []);

    return (
        <article className="contenedor">

            {datos.map(dato => (
                <section key={dato.id} className="card contenedor">

                    <img src={dato.image} alt={dato.name} />

                    <p>N°{dato.id}</p>

                    <h4>{dato.name}</h4>
                    <div className="card_tipos">
                        {dato.tipo.map((tipo, tipoIndex) => (
                            <span key={tipoIndex} className={`badge ${tipo.toLowerCase()}`}>{tipo}</span>
                        ))}
                    </div>

                </section>
            ))}
        </article>
    );
};
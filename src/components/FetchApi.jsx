import { useEffect, useState } from "react";

export const FetchApi = () => {
    const [datos, setDatos] = useState([]);

    const doFetch = async () => {
        const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151';
        const response = await fetch(url);
        const data = await response.json();
        const { results } = data;
        // Realizar una nueva solicitud para cada Pokémon y extraer datos adicionales
        const pokemonDataPromises = results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            const skills = pokemonData.abilities.map((ability) => ability.ability.name);

            return {
                id: pokemonData.id,
                name: pokemonData.name,
                altura: pokemonData.height,
                skills: skills,
                image: pokemonData.sprites.front_default,
                imageShiny: pokemonData.sprites.front_shiny
            };
        });

        const pokemonData = await Promise.all(pokemonDataPromises)
        console.log(pokemonData)
        setDatos(pokemonData);
    };

    useEffect(() => {
        doFetch();
    }, []);

    return (
        datos.map((dato, index) => (
            <section className="contenedor">
                <li key={index}>
                    <p>{dato.name}</p>
                    <p>{dato.id}</p>
                    <p>{dato.altura}</p>

                    <h2>Habilidades:</h2>
                    <ul>
                        {dato.skills.map((skill, skillIndex) => (
                            <li key={skillIndex}>{skill}</li>
                        ))}
                    </ul>

                    <img src={dato.image} alt={dato.name} />
                    <img src={dato.imageShiny} alt={dato.name} />
                </li>
            </section>
        ))
    );
};
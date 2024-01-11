
// Mapeo para traducir los tipos de Pokemon
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

export const mapPokemonData = (pokemonData) => {
    const skills = pokemonData.abilities.map((ability) => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1));
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
};
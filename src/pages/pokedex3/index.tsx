import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import CardPokemon from '../../components/CardPokemon';
import api, { allPokemonNames, searchPokemon } from '../../services/api';
import styles from './styles.module.scss';

interface pokemonData {
  id: string;
  name: string;
  value_attack: string;
  value_defense: string;
  poke_type: string;
  grass_type: string;
  img_url: string;
}

interface initialPokemonProps {
  count: number;
  next: string;
  previous: string;
  results: [resultsProps];
}

interface resultsProps {
  name: string;
  url: string;
}

export default function Pokedex({ initialPokemon }: any) {
  const [pokemon, setPokemon] = useState<initialPokemonProps>(initialPokemon);
  const [pokemonListName, setPokemonListName] = useState<string[]>([]);
  const [allPokemonName, setAllPokemonName] = useState<string[]>([]);
  const [pokemonData, setPokemonData] = useState<any[]>([]);

  const [searchData, setSearchData] = useState<string[]>([])
  const [handleSearch, setHandleSearch] = useState('')

  const [offset, setOffSet] = useState(0);

  const fetchPokemon = async (url: string, next: boolean) => {
    const response = await fetch(url);
    const nextPokemon = await response.json();

    setOffSet(next ? offset + 20 : offset - 20);
    setPokemon(nextPokemon);
  }

  useEffect(() => {
    const getPokemonsNames = async () => {
      const getPokemonListName = pokemon.results.map((pokemonName) => {
        return pokemonName.name;
      })
      setPokemonListName(getPokemonListName)
    }
    getPokemonsNames();
  }, [pokemon.results])

  // console.log("console log linha 30  ", pokemonListName);

  useEffect(() => {
    pokemonListName.map(async (name) => {
      const data = await searchPokemon(name);
      // console.log(data)
      setPokemonData(old => [...old, data])
    }
    )
  }, [pokemonListName]);

  console.log("console log linha 40  ", pokemonData);

  //Busca todos os nomes de pokemons
  useEffect(() => {
    const getAllPokemonNames = async () => {
      const response = await api.get(`/pokemon?limit=100000&offset=0`)
      const dataResults = await response.data.results;
      const allNames = dataResults.map((pokemonName: { name: string; }) => {
        return pokemonName.name;
      })
      setAllPokemonName(allNames)
    }
    getAllPokemonNames();
  }
    , []);
  // console.log("allpokemons vem todos os nomes de pokemon", allPokemonName)

  useEffect(() => {
    if(handleSearch !== ""){
    setSearchData(allPokemonName.filter(pokemon=> pokemon.toLowerCase().includes(handleSearch.toLowerCase())))
    // setPokemonListName(searchData)
  }
  } , [allPokemonName, handleSearch])

  console.log("pokemon Linstname" , searchData)



  // console.log(pokemonListName)



  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h1> {pokemon.count} <span>Pokémons </span>para você escolher o seu favorito</h1>
        <input
          type="text"
          placeholder="Buscar Pokemons"
          value={handleSearch}
          onChange={(ev) => setHandleSearch(ev.target.value)}
        />

      </div>
      <div className={styles.cards}>
        {pokemonData.map((pokemon: any, index: any) => (
          <CardPokemon
            key={pokemon.id}
            name={(pokemon.name)}
            value_attack={pokemon.stats[1].base_stat}
            value_defense={pokemon.stats[2].base_stat}
            // grass_type='Grass'
            poke_type={pokemon.types[0].type.name}
            img_url={pokemon.sprites.front_default}
          // img_url={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${('000'+ (index + 1 + offset)).slice(-3)}.png` }
          />
        ))}

      </div>

      <div className={styles.btnNav}>
        {/* <button disabled={!pokemon.previous} onClick={()=> fetchPokemon(pokemon.previous, false)} className={styles.btnPagination}>Prev</button> */}
        <button disabled={!pokemon.next} onClick={() => fetchPokemon(pokemon.next, true)} className={styles.btnPagination}>Carregar mais</button>
      </div>
    </div>
  )
}

export const getStaticProps:GetStaticProps= async () => {
  const response = api.get(`/pokemon`);
  const initialPokemon = (await response).data
  // console.log("get props  ", initialPokemon);
  return {
    props: {
      initialPokemon
    }
  }
}
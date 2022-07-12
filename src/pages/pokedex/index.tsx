import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

import {debounce} from 'lodash';

import CardPokemon from '../../components/CardPokemon';
import api, { searchPokemon } from '../../services/api';


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
  const [pokemonListName, setPokemonListName] = useState<resultsProps[]>([]);
  const [pokemonData, setPokemonData] = useState<any[]>([]);

  const [searchData, setSearchData] = useState(pokemonListName)
  const [handleSearch, setHandleSearch] = useState('')

  const [page, setPage] = useState(1);  //qual pagina estou
  const [pokemonPerPages, setPokemonPerPages] = useState(19); //quantos Pokemons por pagina
  // const [offset, setOffSet] =useState(0);

const updateHandlerSearch = (e:any) => setHandleSearch(e?.target?.value)
const debounceOnChange = debounce(updateHandlerSearch, 500);

  useEffect(() => {
    setPage(pokemonPerPages)
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [])

  useEffect(() => {
    function handlePagination() {
      var remove = document.getElementById("carregar");
      if (pokemonPerPages > pokemon.results.length) {
        // alert("Todos os pokemon foram exibidos")
        remove?.parentNode?.removeChild(remove);
        console.log("primeiro",pokemonPerPages, pokemon.results.length)
      } else {
        setPokemonPerPages(pokemonPerPages + page);
        console.log("segundo",pokemonPerPages, pokemon.results.length)
      }
    } handlePagination();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (handleSearch !== "") {
      setSearchData(pokemon.results.filter(pokemon => pokemon.name.toLowerCase().includes(handleSearch.toLowerCase())))
    } else {
      setSearchData(pokemon.results)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSearch])

  useEffect(() => {
    setPokemonData([])
    const indexOfLastPoke = pokemonPerPages;
    const indexOfFirstPoke = indexOfLastPoke - pokemonPerPages;
    const currentPoke = searchData.slice(indexOfFirstPoke, indexOfLastPoke);

    if (currentPoke.length <= pokemonPerPages) {
      currentPoke.map(async ({ name }) => {
        const data = await searchPokemon(name);
        setPokemonData(old => [...old, data])
      })
    }
  }, [pokemonPerPages, searchData]);

  // console.log("console log linha 103  ", pokemonData);


  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h1> {pokemon.count} <span>Pokémons </span>para você escolher o seu favorito</h1>
        <input
          type="text"
          placeholder="Buscar Pokemons"
          value={handleSearch}
          onChange={debounceOnChange}
        />
      </div>
      <div className={styles.cards}>
        {pokemonData.map((pokemon) => (
          <CardPokemon
            key={pokemon.id}
            name={(pokemon.name)}
            value_attack={pokemon.stats[1].base_stat}
            value_defense={pokemon.stats[2].base_stat}
            
            poke_type={pokemon.types}
            // poke_type={pokemon.types.map((types: { type: { name: any; }; }) => types.type.name)}
            img_url={pokemon.sprites.front_default}
          // img_url={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${('000'+ (index + 1 + offset)).slice(-3)}.png` }
          />
        ))}

      </div>

      <div className={styles.btnNav}>
        {/* <button onClick={()=> setPokemonPerPages((pokemonPerPages )- 20)} className={styles.btnPagination}>Prev</button> */}
        <button onClick={() => { setPokemonPerPages(pokemonPerPages + 20) }} className={styles.btnPagination}>Carregar mais</button>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = api.get(`/pokemon?limit=100000&offset=0`);
  const initialPokemon = (await response).data
  // console.log( initialPokemon);

  return {
    props: {
      initialPokemon
    }
  }
}
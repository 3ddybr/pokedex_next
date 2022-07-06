import {  useEffect, useState } from 'react';
import CardPokemon from '../../components/CardPokemon';
import api, { searchPokemon } from '../../services/api';
import styles from './styles.module.scss';

interface pokemonData{
  id: string;
  name: string;
  value_attack: string;
  value_defense: string;
  poke_type: string;
  grass_type: string;
  img_url: string;
}

 interface initialPokemonProps{ 
  count: number;
  next: string;
  previous: string;
  results: [resultsProps];
 }

 interface resultsProps{
  name: string;
  url: string;
 }



export default function Pokedex ({initialPokemon}:any) {
  const [pokemon, setPokemon] = useState<initialPokemonProps>(initialPokemon);
  const [pokemonListName, setPokemonListName] = useState([]);
  // const [pokemonData, setPokemonData] = useState<any[]>([]);

  const [searchData, setSearchData] = useState(pokemon)
  const [handleSearch, setHandleSearch] = useState('')

  const [page, setPage] = useState(1);  //qual pagina estou
  const [pokemonPerPages, setPokemonPerPages] = useState(20); //quantos Pokemons por pagina
  
  const [offset, setOffSet] =useState(0);

  useEffect(() => {
    setPage(pokemonPerPages)
  }
  ,[])


  useEffect(() => {
    const indexOfLastPoke = pokemonPerPages;
    const indexOfFirstPoke = indexOfLastPoke - pokemonPerPages;
    const currentPoke = searchData.results.slice(indexOfFirstPoke, indexOfLastPoke);
    // setPokemonListName(currentPoke);
    // console.log("console log linha 39  ", currentPoke);

  },[])




  // for (let index = 0; index < pokemonPerPages; index++) {
  //   setPokemonListName(`${pokemon[index]}`)
  //   if (index === pokemonPerPages)break;
  //   console.log(pokemonListName)
  // }

  // useEffect(() => {
  //   setPage(pokemonPerPages)
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // } ,[])

  // console.log("console log dos estado page",pokemon)




  // const fetchPokemon = async (url: string, next:boolean) => {
  //   const response = await fetch(url);
  //   const nextPokemon = await response.json();

  //   setOffSet(next ? offset + 20 : offset - 20);
  //   setPokemon(nextPokemon);
  // }



  // useEffect(() => {
  //   const getPokemonsNames = async () => {
  //     const getPokemonListName = pokemon.results.map((pokemonName:any)=>{
  //       return pokemonName.name;
  //     })
  //   setPokemonListName(getPokemonListName)} 
  //   getPokemonsNames();
  // },[pokemon.results])

  // console.log("console log linha 58  ", pokemonListName);



  //  useEffect(() => {
  //   pokemonListName.map(async (name)=>{
  //     const data = await searchPokemon(name);
  //     // console.log(data)
  //     setPokemonData(old => [...old,data] )
  //   })},[ pokemonListName]);

      // console.log("console log linha 40  ", pokemonData);




//     useEffect(() => {
//       if(handleSearch !== ""){
//       const dadosFilter = pokemon.filter((data: { results: { name: string; }; })=> {
//         const responseFilter= data.results.name.toLowerCase().search(handleSearch.toLowerCase())
//         return responseFilter !== -1 
//       })
//       setSearchData(dadosFilter)
//     }else{
//       setSearchData(pokemon)
//     }
//     } , [ ])

// console.log(handleSearch)



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
        {pokemon.results.map((pokemon, index) => (
          <ul key={index}>
            <li >{index +1} {pokemon.name}</li>
           </ul>
          // <CardPokemon
          // key={pokemon.id} 
          // name={(pokemon.name)}
          // value_attack={pokemon.base_experience} 
          // value_defense={pokemon.weight}
          // grass_type='Grass' 
          // poke_type={pokemon.types[0].type.name} 
          // img_url={pokemon.sprites.front_default}
          // // img_url={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${('000'+ (index + 1 + offset)).slice(-3)}.png` }
          // />
        ))}         
        
      </div>
      

      <div className={styles.btnNav}>
        {/* <button disabled={!pokemon.previous} onClick={()=> fetchPokemon(pokemon.previous, false)} className={styles.btnPagination}>Prev</button> */}
        {/* <button disabled={!pokemon.next} onClick={()=> fetchPokemon(pokemon.next, true)} className={styles.btnPagination}>Carregar mais</button> */}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const response =  api.get(`/pokemon?limit=100000&offset=0`);
  const initialPokemon = (await response).data
  // console.log( initialPokemon);
  return {
    props: {
      initialPokemon
    }
  }
}
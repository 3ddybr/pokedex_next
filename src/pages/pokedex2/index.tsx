import { GetStaticProps } from 'next';
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
  const [pokemonListName, setPokemonListName] = useState<resultsProps[]>([]);
  const [pokemonData, setPokemonData] = useState<any[]>([]);

  const [searchData, setSearchData] = useState(pokemonListName)
  const [handleSearch, setHandleSearch] = useState('')

  const [page, setPage] = useState(1);  //qual pagina estou
  const [pokemonPerPages, setPokemonPerPages] = useState(19); //quantos Pokemons por pagina
  
  // const [offset, setOffSet] =useState(0);

  useEffect(() => {
    setPage(pokemonPerPages)
  }
  ,[])

  useEffect(() => {
    function handlePagination(){
      var remove = document.getElementById("carregar");
      if(pokemonPerPages > pokemon.results.length){
        // alert("Todos os empreendimentos foram exibidos")
        remove?.parentNode?.removeChild(remove);
        console.log(pokemonPerPages, pokemon.results.length)
      }else{
        setPokemonPerPages(pokemonPerPages + page);
      console.log(pokemonPerPages, pokemon.results.length)
      }
    }  handlePagination();
  },[])

  useEffect(() => {
    if(handleSearch !== ""){
    const dadosFilter = pokemon.results.filter((data)=> {
      const responseFilter= data.name.toLowerCase().search(handleSearch.toLowerCase())
      return responseFilter !== -1 
    })
    setSearchData(dadosFilter)
  }else{
    setSearchData(pokemon.results)
  }
} , [])

  const indexOfLastPoke = pokemonPerPages;
  const indexOfFirstPoke = indexOfLastPoke - pokemonPerPages;
  const currentPoke = searchData.slice(indexOfFirstPoke, indexOfLastPoke);
  
  console.log("console log linha 65  ", currentPoke);
 

  useEffect(() => {
    setPokemonData([])
    if (currentPoke.length <= pokemonPerPages ){
      currentPoke.map(async ({name})=>{
        const data = await searchPokemon(name);
        
        setPokemonData(old => [...old, data])
        // console.log("data",data)
        // setPokemonData(old => [...old, data] )
      })      
    }
  },[pokemonPerPages]);

  console.log("console log linha 76  ", pokemonData);


  

  // useEffect(() => {
  //   if(handleSearch !== ""){
  //   setSearchData(allPokemonName.filter(pokemon=> pokemon.toLowerCase().includes(handleSearch.toLowerCase())))
  //   // setPokemonListName(searchData)
  // }
  // } , [allPokemonName, handleSearch])


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
        {pokemonData.map((pokemon, index) => (
          // <ul key={index}>
          //   <h2 >{index +1} {pokemon.name}</h2>
          //  </ul>
          <CardPokemon
          key={pokemon.id} 
          name={(pokemon.name)}
          value_attack={pokemon.base_experience} 
          value_defense={pokemon.weight}
          grass_type='Grass' 
          poke_type={pokemon.types[0].type.name} 
          img_url={pokemon.sprites.front_default}
          // img_url={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${('000'+ (index + 1 + offset)).slice(-3)}.png` }
          />
        ))}         
        
      </div>
      

      <div className={styles.btnNav}>
        {/* <button onClick={()=> setPokemonPerPages((pokemonPerPages )- 20)} className={styles.btnPagination}>Prev</button> */}
        <button  onClick={()=> {setPokemonPerPages (pokemonPerPages + 20)}} className={styles.btnPagination}>Carregar mais</button>
      </div>
    </div>
  )
}

export const getStaticProps:GetStaticProps= async () => {
  const response =  api.get(`/pokemon?limit=100000&offset=0`);
  const initialPokemon = (await response).data
  // console.log( initialPokemon);

  return {
    props: {
      initialPokemon
    }
  }
}
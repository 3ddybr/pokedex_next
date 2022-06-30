import {  useEffect, useState } from 'react';
import CardPokemon from '../../components/CardPokemon';
import api, { searchPokemon } from '../../services/api';
import styles from './styles.module.scss';

interface pokemonData{
  id: string;
  name: string;
  value_attack: string;
  value_defence: string;
  poke_type: string;
  grass_type: string;
  img_url: string;
}

export default function Pokedex ({initialPokemon}:any) {
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [pokemonListName, setPokemonListName] = useState([]);
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  
  const [offset, setOffSet] =useState(0);

  const fetchPokemon = async (url: string, next:boolean) => {
    const response = await fetch(url);
    const nextPokemon = await response.json();

    setOffSet(next ? offset + 20 : offset - 20);
    setPokemon(nextPokemon);
  }

  useEffect(() => {
    const getPokemonsNames = async () => {
      const getPokemonListName = pokemon.results.map((pokemonName:any)=>{
        return pokemonName.name;
      })
    setPokemonListName(getPokemonListName)} 
    getPokemonsNames();
  },[pokemon.results])

  // console.log("console log linha 30  ", pokemonListName);

   useEffect(() => {
    pokemonListName.map(async (name)=>{
      const data = await searchPokemon(name);
      // console.log(data)
      setPokemonData(old => [...old,data] )
    }
      )},[ pokemonListName]);

      console.log("console log linha 40  ", pokemonData);

    // const getPokemon  = () => {
    //   pokemonListName.map(async(pokemonName) => {       
    //     await api.get(`/pokemon/${pokemonName}`).then((response) => {
    //       setPokemonData({...pokemonData } )
    //     })
    //   }
    // )}   
  
  // console.log("console log linha 41  ",pokemonData)

  // const getPokemons = async (name:string) => {
  //   await api.get(`/pokemon/${name}`).then(res =>{
  //     const data = res.data
  //     setPokemonData(data)
  //     console.log(pokemonData)
  //   })
  // }
  // getPokemons(pokemonListName[0])

    // console.log('console log da linha 49  ' + pokemonData)





  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h1> 800 <span>Pokémons </span>para você escolher o seu favorito</h1>
        <input type="search" name="search" id="pokSearch" />
        {/* <div>
          <select name="tipo" id="selTipo" >
            <option value="fire">Fire</option>

            <option value="fire">Fire</option>
            <option value="normal">Normal</option>
            <option value="eletric">Eletric</option>
            <option value="water">Water</option>
          </select>
        </div> */}
      
      </div>
      <div className={styles.cards}>
        {pokemonData.map((pokemon:any, index:any) => (
          <CardPokemon
          key={pokemon.id} 
          name={(pokemon.name)}
          value_attack={pokemon.base_experience} 
          value_defence={pokemon.weight}
          grass_type='Grass' 
          poke_type={pokemon.types[0].type.name} 
          img_url={pokemon.sprites.front_default}
          // img_url={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${('000'+ (index + 1 + offset)).slice(-3)}.png` }
          />
        ))}         
        
      </div>

      <div className={styles.btnNav}>
        {/* <button disabled={!pokemon.previous} onClick={()=> fetchPokemon(pokemon.previous, false)} className={styles.btnPagination}>Prev</button> */}
        <button disabled={!pokemon.next} onClick={()=> fetchPokemon(pokemon.next, true)} className={styles.btnPagination}>Carregar mais</button>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const response =  api.get(`/pokemon`);
  const initialPokemon = (await response).data
  // console.log("get props  " + initialPokemon);
  return {
    props: {
      initialPokemon
    }
  }
}
import { Key, useState } from 'react';
import CardPokemon, { CardPokemonProps } from '../../components/CardPokemon';
import styles from './styles.module.scss';

export default function Pokedex({initialPokemon}:any) {
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [offset, setOffSet] =useState(0);

  const fetchPokemon = async (url: string, next:boolean) => {
    const response = await fetch(url);
    const nextPokemon = await response.json();

    setOffSet(next ? offset + 20 : offset - 20);
    setPokemon(nextPokemon);
  }

  // console.log(pokemon);
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
        {pokemon.results.map((pokemon:any, index:any) => (
          <CardPokemon
          key={index} 
          name={(pokemon.name)}
          value_attack='500' 
          value_defence='49' 
          grass_type='Grass' 
          poke_type='Poison' 
          img_url={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${('000'+ (index + 1 + offset)).slice(-3)}.png` }/>
        ))}         
        
      </div>
      <div className={styles.btnNav}>
        <button disabled={!pokemon.previous} onClick={()=> fetchPokemon(pokemon.previous, false)} className={styles.btnPagination}>Prev</button>
        <button disabled={!pokemon.next} onClick={()=> fetchPokemon(pokemon.next, true)} className={styles.btnPagination}>Next</button>
      </div>
    </div>
  )
}

export async function getStaticProps(context: any) {
  const response =  await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const initialPokemon =  await response.json()

  // console.log("get props  " + initialPokemon);

  return {
    props: {
      initialPokemon
    }
  }
}
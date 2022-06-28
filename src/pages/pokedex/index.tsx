import CardPokemon from '../../components/CardPokemon';
import styles from './styles.module.scss';

export default function Pokedex() {
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
        <CardPokemon 
          name="Charmander" 
          value_attack='500' 
          value_defence='49' 
          grass_type='Grass' 
          poke_type='Poison' 
          img_url='https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' 
        />
        <CardPokemon 
          name="Charmander" 
          value_attack='500' 
          value_defence='49' 
          grass_type='Grass' 
          poke_type='Poison' 
          img_url='https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' 
        />
        <CardPokemon 
          name="Charmander" 
          value_attack='500' 
          value_defence='49' 
          grass_type='Grass' 
          poke_type='Poison' 
          img_url='https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' 
        />
        <CardPokemon 
          name="Charmander" 
          value_attack='500' 
          value_defence='49' 
          grass_type='Grass' 
          poke_type='Poison' 
          img_url='https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' 
        />
        <CardPokemon 
          name="Charmander" 
          value_attack='500' 
          value_defence='49' 
          grass_type='Grass' 
          poke_type='Poison' 
          img_url='https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' 
        />
        <CardPokemon 
          name="Charmander" 
          value_attack='500' 
          value_defence='49' 
          grass_type='Grass' 
          poke_type='Poison' 
          img_url='https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' 
        />
        <CardPokemon 
          name="Charmander" 
          value_attack='500' 
          value_defence='49' 
          grass_type='Grass' 
          poke_type='Poison' 
          img_url='https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' 
        />
        <CardPokemon 
          name="Charmander" 
          value_attack='500' 
          value_defence='49' 
          grass_type='Grass' 
          poke_type='Poison' 
          img_url='https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' 
        />
        <CardPokemon 
          name="Charmander" 
          value_attack='500' 
          value_defence='49' 
          grass_type='Grass' 
          poke_type='Poison' 
          img_url='https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png' 
        />
        
      </div>
    </div>
  )
}
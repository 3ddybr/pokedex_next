import CardPokemon from '../../components/CardPokemon';
import styles from './styles.module.scss';



export default function Pokedex () {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <h1> 800 <span>Pokémons </span>para você escolher o seu favorito</h1>
        <input type="search" name="search" id="pokSearch" />
      </div>
      <div className={styles.cards}>
        <CardPokemon/>
        {/* <CardPokemon/>
        <CardPokemon/>
        <CardPokemon/>
        <CardPokemon/>
        <CardPokemon/>
        <CardPokemon/>
        <CardPokemon/>
        <CardPokemon/> */}
      </div>    
    </div>
  )
}
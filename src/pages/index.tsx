import type { NextPage } from 'next'
import Image  from 'next/image' 
import styles from './home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerLayout}>
        <div className={styles.contentText}>
          <h1><em>Encontre</em> todos os seus <em>Pokémon</em> favoritos</h1>
          <h2>Você pode saber o tipo de Pokémon, seus pontos fortes, desvantagens e habilidades
          </h2>
          <button type="button">See pokemons</button>
        </div>
        <div className={styles.image}>
          <div className={styles.logo}>
            <Image 
              src="/images/pikachuHomeCompleto.png" 
              alt="logo"
              width={944} height={721}
            />
          </div>
        </div>  
      </div>
       
    </div>
  )
}

export default Home

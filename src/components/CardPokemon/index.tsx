import Image  from 'next/image' 

import styles from './styles.module.scss';

// type Data = {
//   name: string;
//   url: string;
// }
// type getPok = {
//   results:Data[] 
// }

export interface CardPokemonProps{
  name: string;
  value_attack: string;
  value_defense: string;
  poke_type: pokeType[];  
  img_url: string;
}

interface pokeType{
  type: {
    name: string
    url: string,
  }
}

export default function CardPokemon ({name, value_attack, value_defense, poke_type, img_url }: CardPokemonProps){
  return(
    <div className={styles.cardPreview}>      
        <div className={styles.container}>

          <div className={styles.cardTitle}>
            <h3>{name}</h3>
          </div>

          <div className={styles.cardBoxPropContainer}>
            <div className={styles.cardPropContainer}>
              <div className={styles.group5}>
                <div className={styles.group4}>
                  <span>{value_attack}</span>
                </div>
                <span>Attack</span>
              </div>
            </div>

            <div className={styles.cardPropContainer}>
              <div className={styles.group5}>
                <div className={styles.group4}>
                  <span>{value_defense}</span>
                </div>
                <span>Defense</span>
              </div>
            </div>
          </div>

          <div className={styles.cardBoxTages}>              
            { poke_type.map((type) => {
              return(
                <div key={type.type.name} className={styles.cardTag}>
                  <span >{type.type.name}</span>
                </div>  
              )                  
            } )}
          </div>
        </div>         
      <div className={styles.cardBoxImg}>
        <Image 
          src={img_url}
          alt="logo"
          quality={100}
          width={168} height={146}
        />         
      </div>
  </div>
  
  )
}

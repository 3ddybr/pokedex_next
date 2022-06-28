import { useEffect, useState } from "react"
import api from '../../services/api'

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
  value_defence: string;
  poke_type: string;
  grass_type: string;
  img_url: string;
}

export default function CardPokemon ({name, value_attack, value_defence, poke_type, grass_type, img_url }: CardPokemonProps){
  // const [pokemonsList, setPokemonsList] = useState<Data[]>([])  

  // useEffect(() => {
  //   async function getApi() {
  //     try {
  //        const response = await api.get<getPok>('/pokemon?offset=0&limit=20')
  //        const dataResults = response.data.results
  //       //  const dataUrl = dataResults.map(data => data.url)
  //       // console.log("Console linha 24 tes" ,dataResults)
  //         setPokemonsList([...dataResults])
  //     }catch (e) {
  //       console.log(e)
  //     }     
  //   }
  //   getApi()
  // },[])


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
                  <span>{value_defence}</span>
                </div>
                <span>Defense</span>
              </div>
            </div>
          </div>

          <div className={styles.cardBoxTages}>
            <div className={styles.cardTag}>
              <span>{grass_type}</span>
            </div>

            <div className={styles.cardTag}>
              <span>{poke_type}</span>
            </div>
          </div>


        </div>    
      <div className={styles.cardBoxImg}>
        <Image 
          src={img_url}
          alt="logo"
          width={168} height={146}
        />         
      </div>
{/* 
             <button onClick={async()=>{
               const response = await api.get('/pokemon/1/')
               console.log("console da linha 57 cardpokemon", response.data)
              }}>buscar</button>  */}
  </div>
  )
}

{/* <h1>Teste</h1>
      {pokemonsList.map((pokemonList, i) =>{
        return(
          <div key={i}>
            <h1>{pokemonList.url}</h1>
            <p>{pokemonList.name}</p>
          </div>
        )})} */}



        {/* <button onClick={async()=>{
      const response = await api.get('/pokemon/1/')
      console.log("console da linha 57", response.data)
    }}>buscar</button> */}
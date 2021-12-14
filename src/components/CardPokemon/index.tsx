import { useEffect, useState } from "react"
import api from '../../services/api'

import Image  from 'next/image' 

import styles from './styles.module.scss';

type Data = {
  name: string;
  url: string;
}
type getPok = {
  results:Data[] 
}

export default function CardPokemon (){
  const [pokemonsList, setPokemonsList] = useState<Data[]>([])  

  useEffect(() => {
    async function getApi() {
      try {
         const response = await api.get<getPok>('/pokemon?offset=0&limit=20')
         const dataResults = response.data.results
        //  const dataUrl = dataResults.map(data => data.url)
        // console.log("Console linha 24 tes" ,dataResults)
          setPokemonsList([...dataResults])
      }catch (e) {
        console.log(e)
      }     
    }
    getApi()
  },[])


  return(
    <div className={styles.cardPreview}>      
        <div className={styles.container}>

          <div className={styles.cardTitle}>
            <h3>Charizard</h3>
          </div>

          <div className={styles.cardBoxPropContainer}>
            <div className={styles.cardPropContainer}>
              <div className={styles.group5}>
                <div className={styles.group4}>
                  <span>419</span>
                </div>
                <span>Attack</span>
              </div>
            </div>

            <div className={styles.cardPropContainer}>
              <div className={styles.group5}>
                <div className={styles.group4}>
                  <span>49</span>
                </div>
                <span>Defense</span>
              </div>
            </div>
          </div>

          <div className={styles.cardBoxTages}>
            <div className={styles.cardTag}>
              <span>Grass</span>
            </div>

            <div className={styles.cardTag}>
              <span>Poison</span>
            </div>
          </div>


        </div>    
      <div className={styles.cardBoxImg}>
        <Image 
          src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png"
          alt="logo"
          width={168} height={146}
        />         
      </div>

             <button onClick={async()=>{
               const response = await api.get('/pokemon/1/')
               console.log("console da linha 57", response.data)
              }}>buscar</button> 
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
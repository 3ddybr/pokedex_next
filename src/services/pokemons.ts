import { useEffect, useState } from 'react'
import api from './api'

type Data = {
  name: string;
  url: string;
}
type getPok = {
  results:Data[] 
}

  export const GetAllPokemons = () => {
    const [pokemonsList, setPokemonsList] = useState<Data[]>([])

    useEffect(() => {
    async function getApi() {
      try {
         const response = await api.get<getPok>('/pokemon?offset=0&limit=20')
         const { results } = response.data
         const dataResults = response.data.results
         console.log("Console linha 24 tes" ,dataResults)
         setPokemonsList([...dataResults])
      }catch (e) {
        alert('Erro ao carregar os pokemons')
        console.log(e)
      }     
    }
    getApi()
  },[])
  }


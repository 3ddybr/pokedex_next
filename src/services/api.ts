import axios from "axios";

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})
export default api;



export const searchPokemon = async (pokemon: string) => {
  try {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const response = await fetch(url)
      return await response.json()
  } catch (error) {
      console.log("error: ", error)
  }
}

export const allPokemonNames = async () =>{
  try{
    const response = await api.get(`/pokemon?limit=100000&offset=0`)
    return  response.data
  }catch (error) {
    console.log("error allPokemonNames: ", error)
  }
}


// export const getPokemons = async (limit = 50, offset = 0) => {
//   try {
//       let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
//       const response = await fetch(url)
//       return await response.json()
//   } catch (error) {
//       console.log("error: ", error)
//   }
// }

// export const getPokemonData = async (url) => {
//   try {
//       const response = await fetch(url)
//       return await response.json()
//   } catch (error) {
//       console.log("error: ", error)
//   }
// }
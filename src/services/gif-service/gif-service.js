export default class GifService {
  
  static getGifsFromApi = async (query, offset) => {
    const offsetTotal = (offset - 1) * 10
    const apiKey = process.env.VUE_APP_GIPHY_API_KEY
    const url = 'https://api.giphy.com/v1/gifs/search?'
    const endpoint = `${url}&api_key=${apiKey}&q=${query}&limit=10&offset=${offsetTotal}`
    const gifs = fetch(endpoint)
      .then((res) => {
        return res.json()
      })
      .catch((err) => {
        console.error(err);
      })
      return gifs
  }
}

GifService.getGifsFromApi()
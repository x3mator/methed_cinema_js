const API_KEY = '6827b485746d7edacb2591c1087f576d'
const BASE_URL = 'https://api.themoviedb.org/3/'
const LANGUAGE = '&language=ru-RU'

//trending/movie/week?api_key=<<api_key>>

const getData = url => {
  return fetch(url)
    .then(response => {
      if(response.ok) {
        return response.json()
      }
      throw `Что-то пошло не так, ошибка ${response.status}` //throw - исключение
    })
    .catch(err => console.error(err)); //ловим ошибку
}

export const getTrends = (type = 'all', period = 'day', page = 1) => {
  const url = `${BASE_URL}trending/${type}/${period}?api_key=${API_KEY}${LANGUAGE}&page=${page}`
  return getData(url)
}

export const getTop = async (type, page = 1) => {
  const url = new URL(`${type}/top_rated`, BASE_URL)
  url.search = `api_key=${API_KEY}${LANGUAGE}&page=${page}`

  // const url = `${BASE_URL}${type}/top_rated?api_key=${API_KEY}${LANGUAGE}&${page}`
  return await getData(url)
}

export const getPopular = async (type, page = 1) => {
  const url = `${BASE_URL}${type}/popular?api_key=${API_KEY}${LANGUAGE}&page=${page}`
  return await getData(url)
}

export const getVideo = async (id, type) => {
  const url = `${BASE_URL}${type}/${id}/videos?api_key=${API_KEY}${LANGUAGE}`
  return await getData(url)
}

export const search = async (query, page = 1) => {
  const url = `${BASE_URL}search/multi?api_key=${API_KEY}${LANGUAGE}`+
    `&page=${page}&query=${query}&include_adult=false&include_image_language=en,null`
  return await getData(url)
}

// ${BASE_URL}search/company?api_key=${API_KEY}${LANGUAGE}&query=${query}&${page}
// ${BASE_URL}search/${type}?api_key=${API_KEY}${LANGUAGE}&${page}&query=qqq&include_adult=false
// ${BASE_URL}search/multi?api_key=${API_KEY}${LANGUAGE}&${page}&query=${query}&include_adult=false
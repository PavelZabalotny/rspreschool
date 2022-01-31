import customFetch from "./fetch.js"

// const API_KEY = 'd952a794'
let searchValue = 'matrix'
// const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`
const movieCards = document.querySelector('.movie-cards')
const search = document.querySelector('.search')
const headerSearch = document.querySelector('.header__search')
const deleteButton = document.querySelector('.deleteButton')

function getUrl (searchValue) {
  const API_KEY = 'd952a794'
  return `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`
}

async function getMovies (url, targetContainer) {
  const json = await customFetch(url)
  // console.log(json)
  const movies = json?.map(({Title, Year, Type, Poster}) => (
    `<div class="movie-card">
      <img src="${Poster}" alt="${Title}">
      <div class="movie-card__info">
        <h3>${Title}</h3>
        <div class="movie-card__type">Category: ${Type}</div>
        <div class="movie-card__year">Year: ${Year}</div>
      </div>      
    </div>`))

  movieCards.innerHTML = movies?.join('') || `<div class="nothing">Nothing founds</div>`
}

await getMovies(getUrl(searchValue), movieCards)

search.addEventListener('input', changeHandler)
headerSearch.addEventListener('submit', submitHandler)
deleteButton.addEventListener('click', deleteButtonHandler)

function changeHandler(e) {
  // console.log(e.target.value)
  searchValue = e.target.value
  deleteButton.style.display = e.target.value ? 'block' : 'none'
  // const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`
  // await getMovies(getUrl(searchValue), movieCards)
}

async function submitHandler(e) {
  e.preventDefault()
  // console.log(searchValue)
  // const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`
  await getMovies(getUrl(searchValue), movieCards)
  search.value = searchValue
}

function deleteButtonHandler () {
  search.value = ''
  this.style.display = 'none'
}

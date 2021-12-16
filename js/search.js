import { search as searchGet } from './services.js';
import renderCard from './renderCard.js';

const title = document.querySelector('.other-films__title')
const filmWeek = document.querySelector('.film-week')
const searchForm = document.querySelector('.header__search-form')
const searchInput = document.querySelector('.header__search-input')
const listCard = document.querySelector('.other-films__list')

function searchService(event) {
  event.preventDefault()

  if (!searchInput.value) return;

  searchGet(searchInput.value)
    .then(data => {
      console.log("-> data", data.results);
      if (data.results.length) {
        renderCard(data.results)
      } else {
        throw 'По вашему запросу ничего не найдено'
      }
    })
    .then(() => {
      filmWeek.remove()
      title.textContent = 'Результат поиска: '
    })
    .catch(err => {
      title.textContent = err
      listCard.textContent = ''
    })
}

const search = () => {
  searchForm.addEventListener('click', searchService)

  searchForm.addEventListener('submit', searchService)
}

export default search
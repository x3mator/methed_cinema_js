import {getVideo} from './services.js';

const listCard = document.querySelector('.other-films__list')

const renderCard = async (data) => {
  console.log('data: ', data);
  listCard.textContent = ''

  Promise.all(data.map(async (item) => {
    const video = await getVideo(item.id, item.media_type)
    const key = video.results[0]?.key

    const card = document.createElement('li')
    card.className = 'other-films__item'

    const link = document.createElement('a')
    link.className = 'other-films__link'
    if (key) link.href = `https://youtu.be/${key}`
    if (item.vote_average) link.dataset.rating = item.vote_average

    const img = document.createElement('img')
    img.className = 'other-films__img'
    img.alt = `постер "${item.title || item.name}"`
    img.src = item.poster_path ?
      `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}` :
      // 'https://www.ru-serial.online/uploads/mini/shortstory/6a/9c79d7b385887a5110380678c990dd.jpg'
      item.title ? `https://via.placeholder.com/600x900?text=${item.title.split(' ').join('+')}` :
        `https://via.placeholder.com/600x900?text=${item.name.split(' ').join('+')}`
    link.append(img)
    card.append(link)

    return card
  })).then(cards => listCard.append(...cards))

}

export default renderCard


const slideMenu = ({ openBtn, menu, classActiveMenu, closeTrigger}) => {

  const burgerBtn = document.querySelector(openBtn)
  const navigation = document.querySelector(menu)
  const navigationClose = document.querySelectorAll(closeTrigger)


  const closeMenu = (e) => {
    console.log(1);
    if (e._nav ||
      (e.target.closest(menu) &&
        !e.target.closest(closeTrigger))) return

    if(e.type === 'keydown' && e.code !== 'Escape') return;

    navigation.classList.remove(classActiveMenu)
    document.removeEventListener('click', closeMenu)
    document.removeEventListener('keydown', closeMenu)
  }

  burgerBtn.addEventListener('click', (e) => {
    navigation.classList.add(classActiveMenu)
    e._nav = true

    document.addEventListener('click', closeMenu)
    document.addEventListener('keydown', closeMenu)
  })

  navigationClose.forEach(item => {
    item.addEventListener('click', closeMenu)
  })
}

export default slideMenu
import i18Obj from './js/translate.js'

/* console.log(`Task: portfolio#1
1) Вёрстка валидная +10
2) Вёрстка семантическая +20
2.1) В коде странице присутствуют следующие элементы (указано минимальное количество, может быть больше):
<header>, <main>, <footer> +2
2.2) шесть элементов <section> (по количеству секций) +2
2.3) только один заголовок <h1> +2
2.4) пять заголовков <h2> (количество секций минус одна, у которой заголовок <h1>) +2
2.5) один элемент <nav> (панель навигации) +2
2.6) два списка ul > li > a (панель навигации, ссылки на соцсети) +2
2.7) десять кнопок <button> +2
2.8) два инпута: <input type="email"> и <input type="tel"> +2
2.9) один элемент <textarea> +2
2.10) три атрибута placeholder +2
3) Вёрстка соответствует макету +48
3.1) блок <header> +6
3.2) секция hero +6
3.3) секция skills +6
3.4) секция portfolio +6
3.5) секция video +6
3.6) секция price +6
3.7) секция contacts +6
3.8) блок <footer> +6
4) Требования к css + 12
4.1) для построения сетки используются флексы или гриды +2
4.2) при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2
4.3) фоновый цвет тянется на всю ширину страницы +2
4.4) иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2
4.5) изображения добавлены в формате .jpg +2
4.6) есть favicon +2
5) Интерактивность, реализуемая через css +20
5.1) плавная прокрутка по якорям +5
5.2) ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ +5
5.3) интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +5
5.4) обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +5

ИТОГО: 110 баллов`) */

/**
 * Humburger menu
 */
const menu = document.querySelector('#hamburger-1')
const nav = document.querySelector('.nav')

menu?.addEventListener('click', function () {
  this.classList.toggle('is-active')
  nav?.classList.toggle('is-open')
})

nav?.addEventListener('click', function (e) {
  if (e.target?.classList.contains('nav-link')) {
    this.classList.remove('is-open')
    menu?.classList.remove('is-active')
  }
})
/**
 * END Humburger menu
 */

/* console.log(`1. Вёрстка соответствует макету. Ширина экрана 768px +48
блок <header> +6
секция hero +6
секция skills +6
секция portfolio +6
секция video +6
секция price +6
секция contacts +6
блок <footer> +6

2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15
нет полосы прокрутки при ширине страницы от 1440рх до 768рх +5
нет полосы прокрутки при ширине страницы от 768рх до 480рх +5
нет полосы прокрутки при ширине страницы от 480рх до 320рх +5

3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22
при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2
при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4
высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4
при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4
бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2
ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2
при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4

ИТОГО: 85 баллов`) */

/**
 * Change img in portfolio section
 */
const seasons = ['winter', 'spring', 'summer', 'autumn']

// image caching
seasons.forEach((season) => {
  for (let i = 1; i <= 6; i++) {
    const img = new Image()
    img.src = `./assets/img/${season}/${i}.jpg`
  }
})

const portfolioBtn = document.querySelector('.portfolio-btns')
const portfolioImgs = document.querySelectorAll('.portfolio-img')
const portfolioBtns = document.querySelectorAll('.portfolio-btn')

portfolioBtn?.addEventListener('click', (e) => {
  if (e.target?.classList.contains('portfolio-btn')) {
    // change img
    portfolioImgs.forEach((img, i) => {
      img.src = `./assets/img/${e.target?.dataset.season}/${++i}.jpg`
    })
    // reset active class from button
    const btnActiveClass = 'btn-black-active'
    resetActiveClass(portfolioBtns, btnActiveClass)
    // add active class
    changeActiveClass(e.target, btnActiveClass)
  }
})
// add active class
function changeActiveClass(linkOnElement, activeClass) {
  linkOnElement.classList.add(activeClass)
}
// reset active class from button
function resetActiveClass(linkOnElements, activeClass) {
  linkOnElements.forEach((btn) => {
    btn.classList.remove(activeClass)
  })
}
// auto click on button with autumn season
portfolioBtns[3].click()
/**
 * END
 */

/**
 * translate
 */
// default global language
let lang = 'en'
const elementsToTranslate = document.querySelectorAll('[data-i18n]')
const langButton = document.querySelector('.switch-lng')
const langButtons = document.querySelectorAll('.lang')
const langRus = document.querySelector('.lang-ru')
const langEng = document.querySelector('.lang-en')

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang')
    getTranslate(lang)
  }
}
window.addEventListener('load', getLocalStorage)

function getTranslate(language = 'en') {
  resetActiveClass(langButtons, 'lang-active')
  const activeLang = language === 'en' ? langEng : langRus
  changeActiveClass(activeLang, 'lang-active')

  elementsToTranslate.forEach((el) => {
    let dataValue = el.dataset.i18n
    el.textContent = i18Obj[language][dataValue]
  })
}

langButton?.addEventListener('click', function (e) {
  lang = e.target?.innerHTML
  getTranslate(lang)
})

function setLocalStorage() {
  localStorage.setItem('lang', lang)
}
window.addEventListener('beforeunload', setLocalStorage)
/**
 * END
 */

/**
 * Switch theme
 */
// default global theme
let theme = 'dark'
const switchThemeBtn = document.querySelector('.switch-theme')

// evaluate css variables
let colorSсheme = () => [
  { '--body-color': theme !== 'dark' ? '#fff' : '#000' },
  { '--text-color': theme !== 'dark' ? '#000' : '#fff' },
  { '--hover-color': theme !== 'dark' ? '#000' : '#fff' },
]

function switchTheme(array = []) {
  array.forEach((obj) => {
    // cssObj =  ['--body-color', '#fff']
    let [cssObj] = Object.entries(obj)
    // key = '--body-color'; value = '#fff'
    let [key, value] = cssObj
    // set css variable like --body-color: #fff
    document.documentElement.style.setProperty(key, value)
  })
}

switchThemeBtn?.addEventListener('click', function () {
  theme = theme === 'dark' ? 'light' : 'dark'
  switchTheme(colorSсheme())
})

function setThemeToLocalStorage() {
  localStorage.setItem('theme', theme)
}
window.addEventListener('beforeunload', setThemeToLocalStorage)

function getThemeFromLocalStorage() {
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme')
    switchTheme(colorSсheme())
  }
}
window.addEventListener('load', getThemeFromLocalStorage)
/**
 * END
 */

/**
 * Button ripple
 */
document.body.addEventListener('click', function (e) {
  if (e.target.classList.contains('ripple')) {
    const x = e.pageX
		const y = e.pageY
		
		console.log(x);
		console.log(y);

    const buttonTop = e.target.offsetTop
    const buttonLeft = e.target.offsetLeft

    const xInside = x - buttonLeft
    const yInside = y - buttonTop

    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.top = yInside + 'px'
    circle.style.left = xInside + 'px'

    e.target.appendChild(circle)

		setTimeout(() => circle.remove(), 500)
  }
})
/**
 * END Button ripple
 */

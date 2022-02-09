import { heroes } from "./heroes.mjs"

/* config */
const config = {
  numberOfHeroes: 1,
  timeToUnflip: 1500,
}
/* END config */

const heroesDiv = document.querySelector( '.heroes' )
let allPairsOfHeroes

// Fisher-Yates shuffle algorithm
function shuffle( array ) {
  for ( let i = array.length - 1; i > 0; i-- ) {
    let j = randomNumberInRange( array );
    [ array[i], array[j] ] = [ array[j], array[i] ]
  }
  return array
}

// Get random number from 0 to array.length
function randomNumberInRange( array ) {
  return Math.floor( Math.random() * array.length ) // random index at 0 to i
}

// Get a certain number of heroes (numberOfHeroes * 2) as an array of objects
function randomHeroesRange( array, numberOfHeroes ) {
  if ( numberOfHeroes > array.length ) {
    throw new Error( 'numberOfHeroes > heroes.length' )
  }
  const shuffleHeroes = shuffle( array )
  const randomSet = new Set()

  while ( randomSet.size < numberOfHeroes ) {
    randomSet.add( randomNumberInRange( shuffleHeroes ) )
  }

  const filteredHeroes = shuffleHeroes.filter( ( el, index ) => randomSet.has( index ) )
  const doubleFilteredHeroes = shuffle( [ ...filteredHeroes, ...filteredHeroes ] )

  return doubleFilteredHeroes
}

function addHeroesToHTML( element, heroes, numberOfHeroes ) {
  const shuffleRandomHeroesArray = randomHeroesRange( heroes, numberOfHeroes )


  allPairsOfHeroes = shuffleRandomHeroesArray.length / 2 // for checking if all pairs of heroes are found

  const container = ( { src, name } ) => (
    `<div class="hero" data-name=${ name }>
      <span class="name">${ name }</span>
      <img 
        class="hero__img-front" 
        src="./src/assets/img/heroes/${ src }" 
        alt="${ name }"
      >
      <img 
        class="hero__img-back" 
        src="./src/assets/img/back/back.jpg" 
        alt="back side" 
      >
    </div>`)

  const shuffleRandomHeroesArrayMap = shuffleRandomHeroesArray
    .map( el => container( el ) )

  element.innerHTML = shuffleRandomHeroesArrayMap.join( '' ) // output heroes elements to HTML
}

/* Run the game */
const runTheGame = () => addHeroesToHTML( heroesDiv, heroes, config.numberOfHeroes )
runTheGame()
/* END Run the game */

const heroElements = document.querySelectorAll( '.hero' )

/* Flip the Heroes */
let firstHero, secondHero, timeID
let lockGame = false
let counter = 0
let time = 0

heroElements.forEach( el => {
  el.addEventListener( 'click', flipHero )
} )

function flipHero() {
  if ( lockGame || (this === firstHero) ) {
    return
  }

  if(!time) {
    timeID = setInterval(() => {
      time += 0.1
    }, 100)
  }

  if ( !firstHero ) {
    firstHero = this
    this.classList.add( 'flip' )

    return
  }

  secondHero = this
  this.classList.add( 'flip' )
  checkHeroes()
}

function checkHeroes() {
  // lockGame = true

  firstHero.dataset.name === secondHero.dataset.name
    ? disableHeroes()
    : unflipHeroes()
}

function disableHeroes() {
  [ firstHero, secondHero ].forEach( el => {
    el.removeEventListener( 'click', flipHero )
  } )
  reset()
}

function reset() {
  if (++counter === allPairsOfHeroes) {
    clearInterval(timeID)
    let roundTime = time.toFixed(1)
    alert(`time: ${roundTime} seconds`)
  }
  firstHero = secondHero = null
  lockGame = false
}

function unflipHeroes() {
  lockGame = true

  setTimeout( () => {
    [ firstHero, secondHero ].forEach( el => {
      el.classList.remove( 'flip' )
    } )

    reset()
  }, config.timeToUnflip )
}
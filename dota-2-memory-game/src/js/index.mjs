import { heroes } from "./heroes.mjs"

/* config */
const config = {
  numberOfHeroes: 2,
  timeToUnflip: 1500,
}
/* END config */

const heroesDiv = document.querySelector( '.heroes' )
/* Modal window */
const modal = document.querySelector('.modal')

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
  return shuffle( [ ...filteredHeroes, ...filteredHeroes ] )
}

function addHeroesToHTML( element, heroes, numberOfHeroes ) {
  const shuffleRandomHeroesArray = randomHeroesRange( heroes, numberOfHeroes )


  allPairsOfHeroes = shuffleRandomHeroesArray.length / 2 // for checking if all pairs of heroes are found

  const container = ( { src, name } ) => (
    `<div class="hero" data-name=${ name }>
      <span class="name hidden">${ name }</span>
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

let heroElements
const newGame = document.querySelector( '.new-game' )
const counterValue = document.querySelector( '.counter__value' )
const timerValue = document.querySelector( '.timer__value' )

/* Flip the Heroes */
let firstHero, secondHero, timeID
let lockGame = false
let turns = 0
let time = 0
let foundPairs = 0
let roundTime

const setHeroEventListener = () => {
  heroElements = document.querySelectorAll( '.hero' )
  heroElements.forEach( el => {
    el.addEventListener( 'click', flipHero )
  } )
}

setHeroEventListener()

function flipHero() {
  if ( lockGame || (this === firstHero) ) {
    return
  }

  if ( !time ) {
    timeID = setInterval( () => {
      time += 0.1
      roundTime = time.toFixed( 1 )
      timerValue.innerHTML = roundTime
    }, 100 )
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
  counterValue.innerHTML = `${ ++turns }`
  firstHero.dataset.name === secondHero.dataset.name
    ? disableHeroes()
    : unflipHeroes()
}

function disableHeroes() {
  [ firstHero, secondHero ].forEach( el => {
    el.removeEventListener( 'click', flipHero )
    // el.firstChild.classList.add('visible')
    el.childNodes.forEach( elem => {
      if ( elem.nodeName === 'SPAN' ) {
        // console.log(elem)
        setTimeout( () => {
          elem.classList.remove( 'hidden' )
        }, 400 )
      }
      // console.dir(elem)
      // console.log(el.childNodes)
    } )
  } )

  foundPairs++
  reset()
}

function reset() {
  if ( foundPairs === allPairsOfHeroes ) {
    clearInterval( timeID )

    // Invoke modal window with final result
    setTimeout( () => {
      // alert( `time: ${ roundTime } seconds` )
      let payload = `<div>${roundTime}</div>`
      modalCreator(payload)
    }, 500 )
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

newGame.addEventListener( 'click', startNewGame )

function resetCounter() {
  turns = 0

  return turns
}

function resetTime() {
  time = foundPairs = 0
  return time
}

function startNewGame() {
  heroElements.forEach( el => {
    el.classList.remove( 'flip' )
  } )
  setTimeout( () => {
    reset()
    runTheGame()
    setHeroEventListener()
    counterValue.innerHTML = resetCounter()
  }, 500 )
  timerValue.innerHTML = resetTime()
}

/**
 * Modal function
 */
function modalCreator (payload) {
  modal.innerHTML = payload
  modal.classList.toggle('top-50')
}



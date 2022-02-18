import { heroes } from "./heroes.mjs"

/* config */
const config = {
  numberOfHeroesPairs: 8,
  timeToUnflip: 1500,
  timeToShowName: 400,
  timeToNewGame: 500,
  numberOfSaveRecords: 10,
}
/* END config */

const heroesDiv = document.querySelector( '.heroes' )
/* Modal window */
const modalWrapper = document.querySelector( '.modal__wrapper' )
const modalClose = document.querySelector( '.modal__close' )
const modalBody = document.querySelector( '.modal__body' )

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

// Get a certain number of heroes (numberOfHeroesPairs * 2) as an array of objects
function randomHeroesRange( array, numberOfHeroes ) {
  if ( numberOfHeroes > array.length ) {
    throw new Error( 'numberOfHeroesPairs > heroes.length' )
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
      <span class="name hidden">
        <span class="name__title">${ name }</span>
      </span>
      <img 
        class="hero__img-front" 
        src="./src/assets/img/heroes/${ src }" 
        alt="${ name }"
        draggable=${ false }
      >
      <img 
        class="hero__img-back" 
        src="./src/assets/img/back/back.jpg" 
        alt="back side" 
        draggable=${ false }
      >
    </div>`)

  const shuffleRandomHeroesArrayMap = shuffleRandomHeroesArray
    .map( el => container( el ) )

  element.innerHTML = shuffleRandomHeroesArrayMap.join( '' ) // output heroes elements to HTML
}

/* TODO: Run the game */
let firstHero, secondHero, timeID
let lockGame = false
let turns = 0
let time = 0
let foundPairs = 0
let roundTime
let records
let isNewRecord = false
const RECORDS_KEY = 'records'

const runTheGame = () => {
  addHeroesToHTML( heroesDiv, heroes, config.numberOfHeroesPairs )
  if ( !records ) {
    records = getRecordsFromLocalStorage( RECORDS_KEY )
  }
}
runTheGame()
/* END Run the game */

let heroElements
const newGame = document.querySelector( '.new-game' )
const counterValue = document.querySelector( '.counter__value' )
const timerValue = document.querySelector( '.timer__value' )

/* Flip the Heroes */

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
  counterValue.innerHTML = `${ ++turns }`
  firstHero.dataset.name === secondHero.dataset.name
    ? disableHeroes()
    : unflipHeroes()
}

function disableHeroes() {
  [ firstHero, secondHero ].forEach( el => {
    el.removeEventListener( 'click', flipHero )
    el.childNodes.forEach( elem => {
      // show name of the hero
      if ( elem.tagName === 'SPAN' ) {
        setTimeout( () => {
          elem.classList.remove( 'hidden' )
        }, config.timeToShowName )
      }
      // add grayscale effect to the hero img
      if ( elem.tagName === 'IMG' ) {
        setTimeout( () => {
          elem.classList.add( 'grayscale-50' )
        }, config.timeToShowName )
      }
    } )
  } )

  foundPairs++
  reset()
}

function reset() {
  if ( foundPairs === allPairsOfHeroes ) {
    // TODO: Game Over, set record to local storage
    isNewRecord = true
    const newRecord = {
      roundTime,
      turns
    }
    addNewRecord( newRecord )
    resetTime()
    // TODO: Invoke modal window with final result
    setTimeout( () => {
      let title = 'Congratulations, you WIN!!!'
      modalCreator( modalFinish( title, roundTime, turns ) )
    }, config.timeToNewGame )
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

// TODO: start new game
newGame.addEventListener( 'click', startNewGame )

function resetCounter() {
  turns = 0

  return turns
}

function resetTime() {
  time = foundPairs = 0
  // clear timer
  clearInterval( timeID )

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
  }, config.timeToNewGame )
  timerValue.innerHTML = resetTime()
}

/**
 * Modal function
 */
function modalCreator( payload ) {
  modalBody.innerHTML = payload
  modalWrapper.classList.toggle( 'top-50' )
}

function modalFinish( title, time, turns ) {
  return `
    <h2 class="modal__title">${ title }</h2>
    <ul class="modal__items item">
      <li class="item__time">You time: <span>${ time }</span> seconds</li>
      <li class="item__turns">Number of turns: <span>${ turns }</span></li>
    </ul>
   `
}

function modalRecords( title, arrayOfRecords ) {
  const mappingRecords = arrayOfRecords.map( ( el, i ) => `
    <li class="record__item">${ ++i }) time: ${ el.roundTime }, turns: ${ el.turns }</li>
   ` )
  return `
    <h2 class="modal__title">${ title }</h2>
    <ul class="modal__records record">${ mappingRecords.join( '' ) }</ul>
   `
}

modalClose.addEventListener( 'click', function () {
  modalWrapper.classList.toggle( 'top-50' )
} )

// Local storage
function getRecordsFromLocalStorage( key ) {
  const recordsObj = localStorage.getItem( key ) // return array of object or null
  return JSON.parse( recordsObj ) ?? []
}

// TODO: save records to local storage when unload event is fired
window.addEventListener( 'unload', saveRecordsToLocalStorage )

function saveRecordsToLocalStorage() {
  if ( isNewRecord ) {
    localStorage.setItem( RECORDS_KEY, JSON.stringify( records ) )
  }
}

const recordsButton = document.querySelector( '.records' )
recordsButton.addEventListener( 'click', showRecords )

function showRecords() {
  const title = 'Records'
  modalCreator( modalRecords( title, sortRecords() ) )
}

function sortRecords() {
  return [...records].sort( ( a, b ) => a.roundTime - b.roundTime )
}

function addNewRecord( newRecord ) {
  records.push( newRecord )
  if ( records.length > 10 ) {
    records.shift()
  }
}

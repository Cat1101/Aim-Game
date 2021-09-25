const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
const colors = ['linear-gradient(90deg, #16D9E3 0%, #30C7EC 47%, #46AEF7 100%)', 
  'linear-gradient(90deg, #c73b3b 0%, #ec2626 47%, #fc0000 100%)',
  'linear-gradient(90deg, #47d853 0%, #1ecc35 47%, #00e013 100%)',
  'linear-gradient(90deg, #c9d847 0%, #ccc01e 47%, #e0ca00 100%)']

startBtn.addEventListener('click', (e)=>{
  e.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (e)=>{
  if(e.target.classList.contains('time-btn')){
    time = parseInt(e.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (e)=>{
  if(e.target.classList.contains('circle')){
    score++
    e.target.remove()
    createRandomCircle()
  }
})

function startGame(){
  setInterval(decreaseTime, 1000)
  setTime(time)
  createRandomCircle()
}

function decreaseTime(){
  if(time === 0){
    finishGame()
  }
  else{
    let current = --time
    if(current < 10){
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value){
  timeEl.innerHTML = `00:${value}`
}

function finishGame(){
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
  setTimeout(()=>{
    window.location.href = '/'
  }, 3000)
}

function createRandomCircle(){
  const circle = document.createElement('div')
  const {width, height} = board.getBoundingClientRect()
  const size = getRandomNum(10, 50)
  const x = getRandomNum(0, width-size)
  const y = getRandomNum(0, height-size)
  const color = colors[getRandomNum(0, colors.length-1)]

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = color

  board.append(circle)
}

function getRandomNum(min, max){
  return Math.round(Math.random()*(max - min) + min)
}
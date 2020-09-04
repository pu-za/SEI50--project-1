function init() {

  const grid = document.querySelector('.grid')

  const startBtn = document.createElement('div')

  startBtn.innerHTML = '<b> START </b>'
  startBtn.className = 'startBtn'
  grid.appendChild(startBtn)

  const p1 = document.createElement('p')
  p1.className = 'p1'

  p1.innerHTML = 'Click the balloons that float be the screen.'
  grid.appendChild(p1)
  const p2 = document.createElement('p')
  p1.className = 'p2'
  p2.innerHTML = 'Pop 10 balloons in 30 secs to win.'
  
  const p3 = document.createElement('p')
  p1.className = 'p3'
  grid.appendChild(p2)
  p3.innerHTML = "Watch out for the toxic balloons. You'll lose - 1."

  grid.appendChild(p3)
  
  
  //Grid//
  const cells = []
  const width = 10
  const gridCellCount = width * width
  let shootPoint = 90
  let score = 0
  let time = 0
  let timerId
  let baloonsId

  const balloonAudio = document.querySelector('#balloonPop')
  const shooterAudio = document.querySelector('#shooterShot')

  function balloonPop() {
    balloonAudio.src = 'style/pop.wav'
    balloonAudio.play()
  }
  function shooterShot() {
    shooterAudio.src = 'style/shooting.wav'
    shooterAudio.play()
  }

  const panelControl = () => {
      
    startBtn.addEventListener('click', function(e){
      startBtn.remove()
      p1.remove()
      p2.remove()
      p3.remove()
      createGrid()
})

document.addEventListener('keyup', function(e){
      
      if(e.keyCode === 32 || e.keyCode === 13){ 
        shoot(shootPoint + 1, shootPoint + 9)   
      }
      if(e.keyCode === 38){
        if(shootPoint == 0){
          return shootPoint
        }
        cells[shootPoint].innerText=''
shootPoint -= 10

        let shooter = document.createElement('div')
        shooter.innerHTML = '<img src="./style/shooter.gif" width="20px"/>'
        // shooter.innerText = "<img src='./style/shooter.gif' />"
        shooter.classList.add('shooter')
        cells[shootPoint].appendChild(shooter)
      }
      if(e.keyCode === 40){
        if(shootPoint == 90){
          return shootPoint
        }
        cells[shootPoint].innerText=''
        shootPoint += 10
        let shooter = document.createElement('div')
        shooter.innerHTML = '<img src="./style/shooter.gif" width="20px"/>'
        // shooter.innerText = "<img src='./style/shooter.gif' />"
        shooter.classList.add('shooter')
        cells[shootPoint].appendChild(shooter)
      }     
})

  }
  panelControl()

  function createGrid() {
    for (let i = 1; i <= gridCellCount; i++) {
      const cell = document.createElement('div')
      cell.classList.add(`box-${i}`)
        

      cells.push(cell)
      grid.appendChild(cell)
      
    }
    createShooter(shootPoint)
    baloonsId = setInterval(()=> {
      createBaloon()
    }, 1000)
    timerId = setInterval(()=> {
      time += 1
      updateResult(score, time)
    }, 1000)
    createResult(score)
        
  }

  function shoot(position, endPoint){
    setTimeout(() => {
            
            
      if(position > endPoint){
        let prevIndex = cells[position - 1].querySelector('.shot')
        prevIndex.remove()

        return
      }
      if(position > endPoint - 8){
        let prevIndex = cells[position - 1].querySelector('.shot')
        prevIndex.remove()
      }
      if(position == endPoint - 8){
        let shadow = document.createElement('div')
        shadow.className = 'smoke'
        shadow.innerHTML = '<img src="./style/smoke.png" heigth="40px"/>'
        cells[position].appendChild(shadow)
      }
      if(position == endPoint - 7){
        let shadow = document.querySelector('.smoke')
        if(shadow) shadow.remove()
      }

      let fire = document.createElement('div')
      fire.className = 'shot'
      fire.innerHTML = '<img src="./style/bullet.png" width="20px"/>'
      // fire.innerText = "<img src='./style/bullet.png' />"
      cells[position].appendChild(fire)
      shooterShot()

      if(cells[position].querySelector('.baloon') && cells[position].querySelector('.shot')){       
        score += 1
        updateResult(score)

        cells[position].querySelector('.baloon').remove()
        cells[position].querySelector('.shot').remove()
        balloonPop()
        if(cells[position].querySelector('.smoke')) cells[position].querySelector('.smoke').remove()
        return
      } 
      else if(cells[position].querySelector('.toxic') && cells[position].querySelector('.shot')){
                
        score -= 1
        updateResult(score)

        cells[position].querySelector('.toxic').remove()
        cells[position].querySelector('.shot').remove()
        if(cells[position].querySelector('.smoke')) cells[position].querySelector('.smoke').remove()
        
        return
      } else if(position <= endPoint){
        shoot(position + 1, endPoint)
      }    
    }, 200)
  }

  function createResult(score){
    let result = document.createElement('div')
    result.className = 'score'
    result.textContent = `${score}/10`
    
    grid.appendChild(result)

    let timer = document.createElement('div')
    timer.className = 'timer'

    timer.textContent = `${time}/30`
    grid.appendChild(timer)
  }
    
  
  function moveBaloon(position, endPoint, toxic = false, createImage){
    setTimeout(() => {
      if(position < endPoint && position !== endPoint){
        let prevIndex = cells[position + 10].querySelector('.baloon') || cells[position + 10].querySelector('.toxic')
        prevIndex.remove()
        return
      }
      const prevIndex = cells[position + 10].querySelector('.baloon') || cells[position + 10].querySelector('.toxic')
      prevIndex.remove()
      const baloon = document.createElement('div')
      console.log('createImage', createImage)
      if (toxic) {
        baloon.className = 'toxic'
        const image = document.createElement('img')
        image.src = createImage
        image.style.width = '20px'
        baloon.appendChild(image)
        // baloon.innerText = `<img src=${createImage} />`
      } else {
        baloon.className = 'baloon'
        const image = document.createElement('img')
        image.src = createImage
        image.style.width = '20px'
        baloon.appendChild(image)
        // baloon.innerText = `<img src=${createImage} />`
      }

      cells[position].appendChild(baloon)

      if(cells[position].querySelector('.shot') && cells[position].querySelector('.baloon')){
        cells[position].querySelector('.shot').remove()
        cells[position].querySelector('.baloon').remove()
        score += 1

        updateResult(score)

        return 
      }
      else if(cells[position].querySelector('.shot') && cells[position].querySelector('.toxic')){
        cells[position].querySelector('.shot').remove()
        cells[position].querySelector('.toxic').remove()
        score -= 1

        updateResult(score)

        return 
      }
            
      else if(position >= endPoint){
        moveBaloon(position - 10, endPoint, toxic, createImage)
      }
}, 700)
  }

  function createBaloon(){
        
    let baloon = document.createElement('div')

    let baloonPosition = Math.floor(Math.random() * (99 - 91 + 1)) + 91
    let baloonImages = new Array()
        
    baloonImages[1] = './style/yellow.png'
    baloonImages[2] = './style/blue.png'
    baloonImages[3] = './style/red.png'
    let toxicImages = new Array()
    
    toxicImages[1] = './style/toxic2.png'
    toxicImages[2] = './style/toxic1.png'

    let toxic = Math.random() < 0.2
    let createImage
    if(toxic){
      createImage = toxicImages[Math.floor(Math.random() * 2) + 1]
      baloon.className = 'toxic'
      baloon.style.backgroundImage = baloonImages[1]
      // baloon.innerHTML = `<img src="${createImage}" width="20px"/>`
    } else {
      createImage = baloonImages[Math.floor(Math.random() * 3) + 1]
      baloon.className = 'baloon'
      baloon.style.backgroundImage = baloonImages[1]
      // baloon.innerHTML = `<img src="${createImage}" width="20px"/>`
    }

    cells[baloonPosition].appendChild(baloon)
    moveBaloon(baloonPosition -10, baloonPosition - 90, toxic, createImage)
  }
  function updateResult(score, time){
    let result = document.querySelector('.score')
    result.textContent = `${score}/10`

    let timer = document.querySelector('.timer')
    if(time) timer.innerText = `${time}/30`

    if(score === 10){
            
      clearInterval(baloonsId)
      clearInterval(timerId)
      grid.textContent = ''
      const victoryResult = document.createElement('div')
      victoryResult.innerHTML = '<b>Victory, well done</b>'
      victoryResult.className = 'victory'
      grid.appendChild(victoryResult)
    }
    if(time === 30){
      clearInterval(baloonsId)
      clearInterval(timerId)
      grid.textContent = ''
      let defaultResult = document.createElement('div')
      defaultResult.innerHTML = '<b>Try again</b>'
      defaultResult.className = 'default'
      grid.appendChild(defaultResult)
            
    }
  }
    
  function createShooter(shootPoint) {
    shooter = document.createElement('div')
    shooter.classList.add('shooter')
    shooter.innerHTML = '<img src="./style/shooter.gif" width="20px"/>'
    // shooter.innerText = "<img src='./style/shooter.gif' />"
    cells[shootPoint].appendChild(shooter)
  }

}
window.addEventListener('DOMContentLoaded', init)

  



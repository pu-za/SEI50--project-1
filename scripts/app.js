function init() {

  const grid = document.querySelector('.grid')

  const startBtn = document.createElement('div')

  startBtn.innerHTML = '<b> START </b>'

  grid.appendChild(startBtn)
  
  //Grid//
  const cells = [];
  const width = 10;
  const gridCellCount = width * width;
  let shootPoint = 90;
  let score = 0
  let time = 0
  let timerId;
  let baloonsId;


  const panelControl = () => {
      
    startBtn.addEventListener('click', function(e){
      startBtn.remove()
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
        shooter.innerText = "<img src='./style/shooter.gif' />"
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
        shooter.innerText = "<img src='./style/shooter.gif' />"
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

      let fire = document.createElement('div')
      fire.className = 'shot'
      fire.innerText = "<img src='./style/bullet.png' />"
      cells[position].appendChild(fire)


      if(cells[position].querySelector('.baloon') && cells[position].querySelector('.shot')){       
        score += 1
        updateResult(score)

        cells[position].querySelector('.baloon').remove()
        cells[position].querySelector('.shot').remove()
        return
      } 
      else if(cells[position].querySelector('.toxic') && cells[position].querySelector('.shot')){
                
        score -= 1
        updateResult(score)

        cells[position].querySelector('.toxic').remove()
        cells[position].querySelector('.shot').remove()
        return
      } else if(position <= endPoint){
        shoot(position + 1, endPoint)
      }    
    }, 200)
  }

  function createResult(score){
    let result = document.createElement('div')
    result.className = 'score-board'
    result.textContent = `${score}/10`
    cells[9].appendChild(result)
    cells[19].textContent = '0/30'
  }
    
  
  function moveBaloon(position, endPoint, toxic = false, createImage){
    setTimeout(() => {
      if(position < endPoint && position !== endPoint){
        let prevIndex = cells[position + 10].querySelector('.baloon') || cells[position + 10].querySelector('.toxic')
        prevIndex.remove()
        return
      }
      let prevIndex = cells[position + 10].querySelector('.baloon') || cells[position + 10].querySelector('.toxic')
      prevIndex.remove()
                
      let baloon = document.createElement('div')

      if(toxic) {
        baloon.className = 'toxic'
        baloon.innerText = `<img src=${createImage} />`

      }
      else {
        baloon.className = 'baloon'
        baloon.innerText = `<img src=${createImage} />`

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
        
    let baloon = document.createElement('div');

    let baloonPosition = Math.floor(Math.random() * (99 - 91 + 1)) + 91
    let baloonImages = new Array()
        
    baloonImages[1] = './style/yellow.png'
    baloonImages[2] = './style/blue.png'
    baloonImages[3] = './style/red.png'
    let toxicImages = new Array()
    
    toxicImages[1] = './style/toxic2.png'
    toxicImages[2] = './style/toxic1.png'

    let toxic = Math.random() < 0.2
    let createImage;
    if(toxic){
      createImage = toxicImages[Math.floor(Math.random() * 2) + 1]
      baloon.className = 'toxic'
      baloon.style.backgroundImage = baloonImages[1]
    } else {
      createImage = baloonImages[Math.floor(Math.random() * 3) + 1]
      baloon.className = 'baloon'
      baloon.style.backgroundImage = baloonImages[1]
      // baloon.innerHTML = `<img src=${createImage} />`
    }

    cells[baloonPosition].appendChild(baloon)
    moveBaloon(baloonPosition -10, baloonPosition - 90, toxic)
  }
  function updateResult(score, time){
    cells[9].innerText = `${score}/10`
    if(time) cells[19].innerText = `${time}/30`
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
    shooter.innerText = "<img src='./style/shooter.gif' />"
    cells[shootPoint].appendChild(shooter)
  }
    
}
window.addEventListener('DOMContentLoaded', init)

  



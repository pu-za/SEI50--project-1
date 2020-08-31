function init() {

  const grid = document.querySelector('.grid')
  
  //Grid//
  const cells = [];
  const width = 10;
  const gridCellCount = width * width;
  var shootPoint = 90;
  
  function createGrid() {
    for (let i = 1; i <= gridCellCount; i++) {
      const cell = document.createElement('div')
      cell.classList.add(`boxes-${i}`)
      

      cells.push(cell)
      grid.appendChild(cell)

    }
    createShooter(shootPoint)
  }
  const panelControl = () => {
    document.addEventListener('keyup', function(e){
          
      if(e.keyCode === 32 || e.keyCode === 13){
        for(let i = shootPoint + 1; i < shootPoint + 10; i++){
          cells[i].innerText = `Pfiu...`
          setTimeout(()=>{
            cells[i].innerText = ''
          }, 200)
        }
      }
      if(e.keyCode === 38){
        if(shootPoint == 0){
          return shootPoint
        }
        cells[shootPoint].innerText=''
        shootPoint -= 10
              
        shooter = document.createElement('div')
        shooter.innerText = 'X'
        shooter.classList.add('shooter')
        cells[shootPoint].appendChild(shooter)
      }
      if(e.keyCode === 40){
        if(shootPoint == 90){
  return shootPoint
        }
        cells[shootPoint].innerText=''
        shootPoint += 10
        shooter = document.createElement('div')
        shooter.innerText = 'X'
        shooter.classList.add('shooter')
        cells[shootPoint].appendChild(shooter)
      }
              
  });
  }
  panelControl()
  
  
  function createShooter(shootPoint) {
    shooter = document.createElement('div')
    shooter.classList.add('shooter')
    shooter.innerText = 'X'
    cells[shootPoint].appendChild(shooter)
  }
  createGrid()
  
}

window.addEventListener('DOMContentLoaded', init)
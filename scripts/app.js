function init() {

  const grid = document.querySelector('.grid')
  
  //Grid//
  const cells = []
  const width = 10
  const gridCellCount = width * width
  let shooterPosition = 90

  
  function createGrid() {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('boxes', i)
      
      cells.push(cell)
      grid.appendChild(cell)

    }
    addShooter(shooterPosition)
  }
  function addShooter() {
    cells[shooterPosition].classList.add('shooter')
  }
  
  const panelControl = () => {
    document.addEventListener('keyup', function(e) {
        
        if(e.keyCode === 32 || e.keyCode === 13){
            for(let i = shootPoint + 1; i < shootPoint + 10; i++){
                cells[i].innerText = `Pfiu...`
                setTimeout(()=>{
                    cells[i].innerText = ''
                }, 200)
            }
        }
  createGrid()

  }

window.addEventListener('DOMContentLoaded', init)
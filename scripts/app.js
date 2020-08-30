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
  createGrid()

}

window.addEventListener('DOMContentLoaded', init)
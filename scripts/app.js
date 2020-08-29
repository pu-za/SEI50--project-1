function init() {

  const grid = document.querySelector('.grid')

  //Grid//
  const cells = []
  const width = 10
  const gridCellCount = width * width


  
  function createGrid() {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement('div')
      cell.setAttribute('data-index', i)
      cells.push(cell)
      grid.appendChild(cell)
    }
    
  }
  function addShooter(position) {
    cells[position].classList.add('shooter')
  }
  createGrid()

}





window.addEventListener('DOMContentLoaded', init)
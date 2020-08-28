function init() {
  let divElement;
let boxes = document.querySelector('.fields');

   

for(let i = 1; i <= 81; i++){
    divElement = document.createElement('div')
   
    divElement.classList.add(`field${i}`)
   
    divElement.classList.add('grid-element')
    divElement.innerHTML = `<b>box${i}</b>`
   
    boxes.appendChild(divElement)
   
}


}



















window.addEventListener('DOMContentLoaded', init)
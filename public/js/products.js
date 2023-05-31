const increaseBtn = document.querySelectorAll('.increase-quantity-button')
const decreaseBtn = document.querySelectorAll('.decrease-quantity-button')

// Aumento la cantidad, pero que no sobrepase el stock
increaseBtn.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        const cardId = e.target.id.split('-')[0]
        const quantityDiv = document.getElementById(`${cardId}-quantity`)
        quantityDiv.innerText ==quantityDiv.getAttribute('max')?
        quantityDiv.innerText=quantityDiv.innerText:
        quantityDiv.innerText ++
    })
})

// Bajo la cantidad, pero que no sea menor a 0
decreaseBtn.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        const cardId = e.target.id.split('-')[0]
        const quantityDiv = document.getElementById(`${cardId}-quantity`)
        quantityDiv.innerText==0?
            quantityDiv.innerText = 0:
            quantityDiv.innerText --
        
    })
})

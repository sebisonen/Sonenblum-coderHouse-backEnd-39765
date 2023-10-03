//HTML tags
const increaseBtn = document.querySelectorAll('.increase-quantity-button')
const decreaseBtn = document.querySelectorAll('.decrease-quantity-button')
const addToCartForms = document.querySelectorAll('.addToCartForm')
const quantityDivs = document.querySelectorAll('.quantity-div')
//Req params
const cid = document.querySelector('.addToCartBtn').id.split('-')[0]

//Consigo las quantitys para armar los placeholders
const getCart = async()=>{
    const response= await fetch(`api/carts/${cid}`,
        {
            method: "Get",
        }
    )
    .then(res=>res.json())
    .then(res=>{
        //Armo los placeholders
        const cartProducts= res.payload.products
        cartProducts.forEach(product=>{
            let selector = `#quantity-${product.product._id}-${cid}`
            let quantityDiv= document.querySelector(selector)
            quantityDiv.innerText = product.quantity
        })
        
    }) 

}
getCart()

// Aumento la cantidad, pero que no sobrepase el stock
increaseBtn.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        const cardId = e.target.id.split('-')[0]
        const quantityDiv = document.getElementById(`quantity-${cardId}-${cid}`)
        quantityDiv.innerText ==quantityDiv.getAttribute('max')?
        quantityDiv.innerText=quantityDiv.innerText:
        quantityDiv.innerText ++

    })
})

// Bajo la cantidad, pero que no sea menor a 0
decreaseBtn.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        const cardId = e.target.id.split('-')[0]
        const quantityDiv = document.getElementById(`quantity-${cardId}-${cid}`)
        quantityDiv.innerText==0?
            quantityDiv.innerText = 0:
            quantityDiv.innerText --
        
    })
})

//Add to cart functionality
addToCartForms.forEach(form => {
    form.addEventListener('submit', async (e)=>{
        e.preventDefault()        
        const cid= e.submitter.id.split('-')[0]
        const pid = e.target.id
        const quantity = document.getElementById(`quantity-${pid}-${cid}`).innerText
        const body= {quantity: quantity}
        const url= `/api/carts/${cid}/products/${pid}`
        const response = await fetch(url,
            { 
                method: "POST",
                body: JSON.stringify(body),
                headers:{
                    "Content-type": "application/json"
                } 
            }
        ).then(res=>res.json())
        .then(res=>{
            e.submitter.innerText = "Added to cart"    
        })
          
    })
});
    



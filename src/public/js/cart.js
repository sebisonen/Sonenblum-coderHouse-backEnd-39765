
const deleteBtns = document.querySelectorAll('.delete-btn')
const buyBtn = document.querySelector('.purchase-btn')
//Btns selected by class are so the ID field (containing pid and cid) is reserved for request data
const messageDiv = document.querySelector('#message')


buyBtn.addEventListener('click', async (e)=>{
    e.preventDefault()
    const cid = e.target.id.split('-')[1]
    const url = `/api/carts/${cid}/purchase`
    const response = await fetch(url,
        { 
            method: "POST",
            headers:{
                "Content-type": "application/json"
            } 
        }
    )
    const responseData = await response.json()
    console.log(responseData)
    if (responseData.status=="success"){
        buyBtn.innerText = "COMPRA REALIZADA CON ÉXITO"
        setTimeout(() => {
            messageDiv.innerText = "Será redirigido a la página principal"
        }, 1000);
        
        setTimeout(() => {
            window.location.replace('/')
        }, 3000);
    }

      
    })

deleteBtns.forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
        e.preventDefault()
        const cid = e.target.id.split('-')[1]
        const pid = e.target.id.split('-')[2]
        const url= `/api/carts/${cid}/products/${pid}`
    
        const response = await fetch(url,
            { 
                method: "DELETE",
                headers:{
                    "Content-type": "application/json"
                } 
            }
        )
        .then(res=>res.json())
        .then(res=>{
            document.querySelector(`#card-${pid}`).remove()
        })
    })
})



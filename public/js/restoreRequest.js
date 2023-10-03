const form = document.getElementById('restoreRequestForm');
const messageDiv = document.getElementById('message'); 
form.addEventListener('submit',async (event)=>{
    event.preventDefault();
    const data = new FormData(form)
    const obj ={}
    data.forEach((value,key)=>
        obj[key]=value
    )
    
    const response = await fetch('/api/sessions/restoreRequest',{ 
        method: "POST",
        body: JSON.stringify(obj),
        headers:{
            "Content-type": "application/json"
        } 
    })
    const responseData = await response.json()
    
    if (responseData.status=="success"){
        
        messageDiv.innerText= "Se ha enviado un correo de verificacion"
        setTimeout(() => {
            window.location.replace('/login')
        }, 2000);
    }else{
        messageDiv.innerText =responseData.message
    }
})
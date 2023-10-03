const form = document.getElementById('restorePasswordForm');
const messageDiv = document.getElementById('message');
const urlParams= new Proxy(new URLSearchParams(window.location.search),{
    get: (searchParams,prop)=> searchParams.get(prop)
})
form.addEventListener('submit',async (event)=>{
    event.preventDefault();
    const data = new FormData(form)
    const obj ={}
    data.forEach((value,key)=>
        obj[key]=value
    )
    obj.token= urlParams.token
    
    const response = await fetch('/api/sessions/restorePassword',{ 
        method: "POST",
        body: JSON.stringify(obj),
        headers:{
            "Content-type": "application/json"
        } 
    })
    const responseData = await response.json()
    
    if (responseData.status=="success"){
        
        messageDiv.innerText= "La contraseña se ha modificado con éxito"
        setTimeout(() => {
            window.location.replace('/login')
        }, 2000);
    }else{
        messageDiv.innerText =responseData.message
    }
})
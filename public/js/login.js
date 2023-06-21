const form = document.getElementById('loginForm');
form.addEventListener('submit',async (event)=>{
    event.preventDefault();
    const data = new FormData(form)
    const obj ={}
    data.forEach((value,key)=>
        obj[key]=value
    )
    
    const response = await fetch('/api/sessions/login',{ //O '/api/sessions/jwtLogin' cuando use JWT
        method: "POST",
        body: JSON.stringify(obj),
        headers:{
            "Content-type": "application/json"
        } 
    })
    const responseData = await response.json()
    
    if (responseData.status ==='success'){
        //Esta linea es para cuando use JWT
            // localStorage.setItem('accessToken', responseData.accessToken)
        window.location.replace('/products')
    }
})
const jwt = localStorage.getItem('accessToken')
if(!jwt)window.location.replace('/login')
fetch('api/sessions/jwtProfile',{
    method:'GET',
    headers:{
        authorization: `Bearer ${jwt}`
    }
})
.then(res=>res.json())
.then(res=>{
    console.log(res)
    //Mando al html la info
    const welcome = document.getElementById('welcome')
    const email = document.getElementById('email')
    welcome.innerHTML = `Hola, ${res.payload.name}`
    email.innerHTML = `Email, ${res.payload.email}`
})
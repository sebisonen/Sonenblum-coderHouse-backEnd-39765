export const privacy = (privacyType) =>{
     return (req,res,next)=>{
        const {user}= req.session;
        switch(privacyType){
            case "PRIVATE":
                //Dejar pasar a los que estén logueados/tengan una sesión
                if(user) next();
                //Sino redirijimos para que se loguee
                else res.redirect('/login')
            case "NOT_AUTHENTICATED":
                //Para que puedas visitar si no tenes usuario (rutas de login y register)
                    //Si ya estas logueado no quiero que te puedas volver a loguear
                if(!user)next()
                else res.redirect('/products') //Aca puedo poner ('/profile'), yo en mi proyecto puse profile como products
        }
     }
}


export const authRoles = (role) =>{ 
    //recibe "user" o "admin", dependiendo si yo quiero que la ruta sea para que tipo de rol
    //Si llegué a este punto, SIEMPRE debo tener un usuario ya. 
    return async(req,res,next) => {
      if(req.user.role!=role) return res.status(403).send({status:"error",error:"Fobidden"})
      next();
    }
  }


// Este middleware va a ser usado cuando yo quiera  y en las rutas que yo quiera
// El proposito de este es que si no hay un usuario autenticado, no acceda a algunas rutas.
// Osea: que si o si tengas que estar logueado para poder ver /products por ej.
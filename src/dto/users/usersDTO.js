export  class loginDTO{
    static getFrom = user =>{
        return{
            id: user._id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role,
            cartId: user.cartId
        }
    }
}
export class registerDTO{
    static getFrom = user =>{
        return{
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            email: user.email
        }
        
    }
}

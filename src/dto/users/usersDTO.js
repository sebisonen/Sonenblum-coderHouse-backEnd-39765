export default class tokenDTO{
    constructor(user){
        this.name = `${user.firstName} ${user.lastName}`,
        this.role = user.role,
        this.id = user._id
        //Completar los que necesite
    }
}
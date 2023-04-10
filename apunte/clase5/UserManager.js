const fs = require('fs')

class UserManager {
    constructor(){
        this.path = './apunte/clase5/files/users.json'
    }

    getUsers = async ()=>{
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const users = JSON.parse(data)
            return users
        }else{
            return []
        }

        
    }
    createUser = async (user)=>{
        const users = await this.getUsers()
        if(users.length ==0){
            user.id = 1;
        }else{
            user.id = users[users.length-1].id + 1
        }
        users.push(user)
        await fs.promises.writeFile(this.path, JSON.stringify(users, null, '\t'))
        return user
    }
}

const userManager = new UserManager();

const context = async ()=>{
    const test = await userManager.getUsers()
    
    let testUser = {
        name: "Pedro",
        last_name: "Perez",
        age: 20
    }
    await userManager.createUser(testUser)
    console.log(test)
    
}
    

context()
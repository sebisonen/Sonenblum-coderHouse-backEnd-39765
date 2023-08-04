export const userErrorIncompleteValues=(user)=>{
    return `One or more requiered parameters were not given:
    Needed parameters:
    *first_name: A defined string was needed, ${user.user.first_name} was received.
    *email: A defined string was needed, ${user.email} was received.
    *password: A defined string was needed, ${user.password} was received.
    `
}
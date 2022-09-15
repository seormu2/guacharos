export interface User {
    id:       string,
    username: string,
    token:    string
}


export interface AccessOK {
    data:    User,
    message: string,
    status:  number
}

export interface DataAccess {
    username: string,
    password: string
}

export interface validateAccess {
    access: boolean,
}

export interface UpdateUser {
    idUser: string,
    username: string,
    token: string
}

export interface UpdatePassword {
    idUser: string,
    password: string,
    token: string
}
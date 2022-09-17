export interface ProductsSaveOK {
    data: any,
    message: string,
    status:  number
}

export interface saveProduct{
    nameProduct: string,
    brand: string,
    amount: string,
    price: string,
    category: number,
    codeProduct: string,
    idPerson: string,
    token: string
}

export interface ListProducts {
    id: string,
    nameproduct: string,
    brand: string,
    amount: string,
    price: string,
    codeProduct: string,
    id_category: string,
    category: string,
    state: string
}
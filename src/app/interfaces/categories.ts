export interface CategoriesList {
    id: string,
    category: string,
    state: string
}

export interface UpdateCategory {
    idUser: string,
    idCategory: string,
    category: string,
    token: string
}

export interface UpdateCategoryOK {
    data: UpdateCategory,
    message: string,
    status: string
}

export interface DeleteCategory {
    data: UpdateCategory,
    message: string,
    status: string
}

export interface SaveCategoryOK {
    data: any,
    message: string,
    status: string
}

export interface SaveCategory {
    idUser: string,
    category: string,
    token: string
}




export interface ExpenceCreateObj {
        title: string
        category: string
        amount: number
        date: string
        E_id: string
        token: string
        uid: string
}

export interface IExpence {
        title: string
        category: string
        amount: number
        date: string
        E_id: string
        token: string
        uid: string
        createdAt: string,
        updatedAt: string,
        __v: number
}
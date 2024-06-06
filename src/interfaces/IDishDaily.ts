export interface IDishDaily {
    [key: string]: Dish
}

export interface Dish {
    id: string
    name: string
    nation: string
    groceries: string
    type: string
    recipe: string
}
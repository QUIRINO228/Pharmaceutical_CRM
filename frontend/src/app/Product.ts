export interface Product {
  id: number
  name: string
  description: string
  price: number
  availability_quantity: number
  supplier: string
  expiration_date: number
  photo: File[] | null
}

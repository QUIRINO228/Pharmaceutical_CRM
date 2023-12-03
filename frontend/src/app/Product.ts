export interface Product {
  sanitizedImage: any;
  id: number
  name: string
  description: string
  price: number
  availability_quantity: number
  supplier: string
  expiration_date: number
  photo: File
  quantity: number;
}

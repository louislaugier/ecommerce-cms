import { Category } from './Category'

export interface Product {
	id: number,
	attributes: Attributes,
	isEditMode: boolean
}

interface Attributes {
	title: string,
	createdAt: string,
	updatedAt: string,
	publishedAt: string,
	description?: string,
	price: number,
	images?: object,
	attributes?: object,
	stock: number,
	salesPrice?: number,
	category: Category,
}

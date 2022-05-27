export interface Category {
	id: number,
	attributes: Attributes
}

interface Attributes {
	title: string,
	createdAt: string,
	updatedAt: string,
	publishedAt: string,
	order?: number,
	parentCategory?: Category
}
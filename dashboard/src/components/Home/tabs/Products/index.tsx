import { useEffect, useState } from "react";

import { Product } from "../../../../interfaces/Product";
import { Context } from "../../../../interfaces/Props";

import EditableTable from "../../tables/EditableTable";

const Products = ({ api, throwErr }: Context) => {
	const columns: readonly any[] = [
		{ id: 'title', label: 'Title', minWidth: 50 },
		{ id: 'description', label: 'Description', minWidth: 50 },
		{ id: 'price', label: 'Price', minWidth: 50 },
	];

	const [products, setProducts] = useState<Product[] | null | undefined>(null)
	useEffect(() => {
		const getProducts = async (): Promise<void> => {
			try {
				const products: Product[] = (await api.get("products?populate[category][populate][0]=parentCategory")).data.data
				for (let i = 0; i < products.length; i++) products[i].isEditMode = false
				setProducts(products)
			} catch (err: any) {
				throwErr("Error loading products", err);
			}
		}
		if (!products) getProducts()
	}, [api, products, throwErr]);
	
	return (
		<EditableTable columns={columns} rows={products}/>
	);
}

export default Products;
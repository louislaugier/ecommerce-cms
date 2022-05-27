import { Fragment, useEffect, useState } from "react";
import { Product } from "../../../interfaces/Product";
import { Context } from "../../../interfaces/Props";

const Products = ({api, throwErr}: Context) => {
	const [products, setProducts] = useState<Product[] | null | undefined>(null)
	useEffect(() => {
		const getProducts = async (): Promise<void> => {
			try {
				setProducts((await api.get("products?populate[category][populate][0]=parentCategory")).data.data)
			} catch (err: any) {
				throwErr("Error loading products", err);
			}
		} 
		if (!products) getProducts()
	}, [api, products, throwErr]);
	console.log(products)

	return (
		<>
			{
				products ? products.map((product, i) => <Fragment key={i}>
					{product.attributes.title}
				</Fragment>) : <></>
			}
		</>
	);
}

export default Products;
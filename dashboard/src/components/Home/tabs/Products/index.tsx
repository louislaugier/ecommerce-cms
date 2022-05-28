import { useEffect, useState } from "react";

import { IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { Product } from "../../../../interfaces/Product";
import { Context } from "../../../../interfaces/Props";

import EditableTable from "../../tables/EditableTable";

const Products = ({ api, throwErr }: Context) => {
	const columns: readonly any[] = [
		{ id: 'isEditMode', label: 'Actions', minWidth: 50 },
		{ id: 'title', label: 'Title', minWidth: 50 },
		{ id: 'description', label: 'Description', minWidth: 50 },
		{ id: 'price', label: 'Price', minWidth: 50 },
		{ id: 'stock', label: 'Stock', minWidth: 50 },
		{ id: 'salePrice', label: 'Sale price', minWidth: 50 },
	];

	const [products, setProducts] = useState<Product[] | null | undefined>(null)
	useEffect(() => {
		const getProducts = async (): Promise<void> => {
			try {
				setProducts((await api.get("products?populate[category][populate][0]=parentCategory")).data.data)
				// add category for each
			} catch (err: any) {
				throwErr("Error loading products", err);
			}
		}
		if (!products) getProducts()
	}, [api, products, throwErr]);

	return (
		<>
			<IconButton
				aria-label="add"
				onClick={() => {}}
				style={{marginBottom: 25}}
			>
				<AddIcon />
			</IconButton>
			{products ? <EditableTable columns={columns} rows={products} /> : <></>}
		</>
		
	);
}

export default Products;
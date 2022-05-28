import { useEffect, useState } from "react";

import { IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { Product } from "../../../../interfaces/Product";
import { Context } from "../../../../interfaces/Props";

import EditableTable from "../../tables/EditableTable";
import NewProduct from "./NewProduct";

const Products = ({ api, throwErr }: Context) => {
	const columns: readonly object[] = [
		{ id: 'isEditMode', label: 'Actions', minWidth: 100 },
		{ id: 'title', label: 'Title' },
		{ id: 'description', label: 'Description' },
		{ id: 'price', label: 'Price' },
		{ id: 'stock', label: 'Stock' },
		{ id: 'salePrice', label: 'Sale price' },
	];

	const [products, setProducts] = useState<Product[] | null | undefined>(null);
	useEffect(() => {
		const getProducts = async (): Promise<void> => {
			try {
				setProducts((await api.get("products?populate[category][populate][0]=parentCategory")).data.data);
				// add category for each
			} catch (err: any) {
				throwErr("Error loading products", err);
			}
		}
		if (!products) getProducts()
	}, [api, products, throwErr]);

	const [isNewProductVisible, setIsNewProductVisible] = useState<boolean>(false);

	return (
		<>
			<IconButton
				aria-label="add"
				onClick={() => setIsNewProductVisible(true)}
				style={{marginBottom: 25}}
			>
				<AddIcon />
			</IconButton>
			{products ? <EditableTable columns={columns} rows={products} /> : <></>}
			{isNewProductVisible ? <NewProduct isVisible={isNewProductVisible} setIsVisible={setIsNewProductVisible} /> : <></>}
		</>
		
	);
}

export default Products;
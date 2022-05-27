import { AxiosInstance } from "axios";

export interface Product {
	attributes: Attributes
}

interface Attributes {
	title: string
}
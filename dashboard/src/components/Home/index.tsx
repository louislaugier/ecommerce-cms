import { useEffect, useState } from "react";
import { BaseProps } from "../../interfaces/Props";
import Products from "./Products";
import Categories from "./Categories";
import Sidebar from "./Sidebar";

const tabs: JSX.Element[] = [
	<Products />,
	<Categories />,
	// <Orders />,
	// <Users />	
]

const Home = (props: BaseProps) => {
	const [tab, setTab] = useState<JSX.Element>(tabs[0]);

	useEffect(() => {
		if (!props.cookies["ecommerce_user"]) props.navigate("/login");
	}, [props]);

	return (
		<>
			<Sidebar setTab={setTab} tabs={tabs}/>
			<div className="Home">
				{tab}
			</div>
		</>

	);
}

export default Home;
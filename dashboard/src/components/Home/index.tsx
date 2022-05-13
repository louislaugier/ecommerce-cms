import { useEffect, useState } from "react";
import { HomeProps } from "../../interfaces/Props";
import Products from "./Products";
import Sidebar from "./Sidebar";

const tabs = [
	<Products />,
	// <Categories />,
	// <Orders />,
	// <Users />	
]

const Home = (props: HomeProps) => {
	useEffect(() => {
		if (!props.cookies["ecommerce_user"]) props.navigate("/login")
	}, [props]);

	const [selectedTab, setSelectedTab] = useState(0)

	return (
		<>
			{<Sidebar setSelectedTab={setSelectedTab} />}
			<div className="Home">
				{tabs[selectedTab]}
			</div>
		</>

	);
}

export default Home;
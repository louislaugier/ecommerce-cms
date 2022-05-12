import { useEffect, useState } from "react";
import { HomeProps } from "../../interfaces/Props";
import Sidebar from "./Sidebar";

const Home = (props: HomeProps) => {
	useEffect(() => {
		if (!props.cookies["ecommerce_user"]) props.navigate("/login")
	}, []);

	const [selectedTab, setSelectedTab] = useState(0)

	return (
		<>
			<Sidebar setSelectedTab={setSelectedTab}/>
			<div className="Home">
				{/* {selectedTab === 0 ? <Products /> : <></>} */}
				{/* {selectedTab === 0 ? <Categories /> : <></>} */}
				{/* {selectedTab === 0 ? <Orders /> : <></>} */}
				{/* {selectedTab === 0 ? <Users /> : <></>} */}
			</div>
		</>
		
	);
}

export default Home;
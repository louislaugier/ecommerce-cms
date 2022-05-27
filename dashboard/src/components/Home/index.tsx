import { useEffect, useState } from "react";
import { HomeProps } from "../../interfaces/Props";
import Products from "./Products";
import Categories from "./Categories";
import Sidebar from "./Sidebar";

const Home = (props: HomeProps) => {
	const {setBearer, cookies, navigate} = props
	const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false)
	useEffect(() => {
		const token: string | null = cookies["ecommerce_bearer"]
		if (!token) navigate("/login");
		else {
			setBearer(token)
			setIsTokenLoaded(true)
		}
		// eslint-disable-next-line
	}, [])
	
	const tabs: JSX.Element[] = [
		<Products {...props}/>,
		<Categories />,
		// <Orders />,
		// <Users />	
	]
	const [tab, setTab] = useState<JSX.Element>(tabs[0]);

	return (
		isTokenLoaded ?
			<>
				<Sidebar setTab={setTab} tabs={tabs}/>
				<div className="Home">
					{tab}
				</div>
			</> 
		:
			<></>
	);
}

export default Home;
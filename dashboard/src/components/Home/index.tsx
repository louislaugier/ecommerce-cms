import { useEffect, useState } from "react";

import { HomeProps } from "../../interfaces/Props";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Sidebar from "./Sidebar";

import Products from "./tabs/Products";
import Categories from "./tabs/Categories";
import Orders from "./tabs/Orders";
import Users from "./tabs/Users";

const DrawerHeader = styled('div')(({ theme }: any) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const Home = (props: HomeProps) => {
	const tabs: object = {
		Products: <Products {...props}/>,
		Categories: <Categories  {...props}/>,
		Orders: <Orders  {...props}/>,
		Users: <Users  {...props}/>	
	}
	const [tab, setTab] = useState<JSX.Element>(Object.values(tabs)[0]);

	const { setBearer, cookies, navigate, removeCookie } = props
	const [isTokenLoaded, setIsTokenLoaded] = useState<boolean>(false)
	useEffect(() => {
		const token: string | null = cookies["ecommerce_bearer"]
		if (!token) navigate("/login");
		else {
			setBearer(token)
			setIsTokenLoaded(true)
			navigate("/" + Object.keys(tabs)[0].toLowerCase())
		}
		// eslint-disable-next-line
	}, [])

	return (
		isTokenLoaded ?
			<>
				<Box sx={{ display: 'flex' }}>
					<Sidebar tabs={tabs} setTab={setTab} DrawerHeader={DrawerHeader} navigate={navigate} removeCookie={removeCookie} setBearer={setBearer}/>
					<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
						<DrawerHeader />
						{tab}
					</Box>
				</Box>
			</>
			:
			<></>
	);
}

export default Home;
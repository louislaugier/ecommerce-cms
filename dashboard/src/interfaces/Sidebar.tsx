import { IconType } from "react-icons";
import { NavigateFunction } from "react-router-dom";
import { CookieSetOptions } from 'universal-cookie';

import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface SidebarProps {
	setTab: React.Dispatch<React.SetStateAction<JSX.Element>>,
	tabs: object,
	DrawerHeader: any,
	navigate: NavigateFunction,
	removeCookie: (name: string, options?: CookieSetOptions | undefined) => void,
	setBearer: (bearer: string | null) => void
};

export interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

export interface LinkItemProps {
	name: string,
	icon: IconType
};
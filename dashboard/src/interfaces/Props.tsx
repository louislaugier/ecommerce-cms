import { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie/cjs/types";
import { IconType } from 'react-icons';
import { BoxProps, FlexProps } from '@chakra-ui/react';
import { User } from "./User";


export interface LinkItemProps {
	name: string,
	icon: IconType
};

export interface SidebarProps extends BoxProps {
	onClose: () => void
};

export interface NavItemProps extends FlexProps {
	icon: IconType,
	children: string | number
};

export interface MobileProps extends FlexProps {
	onOpen: () => void
};

export interface HomeProps {
	api: AxiosInstance,
	navigate: NavigateFunction,
	user: User | null,
	cookies: {
		ecommerce_user?: any,
		ecommerce_bearer?: any
	},
	setIsErrorVisible: React.Dispatch<React.SetStateAction<boolean>>,
	throwErr: (message: string, err?: any) => void
};

export interface LoginProps {
	api: AxiosInstance,
	updateBearer: (bearer: string) => string,
	navigate: NavigateFunction,
	setUser: React.Dispatch<React.SetStateAction<User | null>>,
	cookies: {
		ecommerce_user?: any,
		ecommerce_bearer?: any
	},
	setCookie: (name: string, value: any, options?: CookieSetOptions | undefined) => void,
	isLoading: boolean,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setIsErrorVisible: React.Dispatch<React.SetStateAction<boolean>>,
	throwErr: (message: string, err?: any) => void
};

export interface SidebarProps {
	setSelectedTab: React.Dispatch<React.SetStateAction<number>>
};
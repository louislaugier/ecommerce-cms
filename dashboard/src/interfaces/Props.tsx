import { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie/cjs/types";
import { IconType } from 'react-icons';
import { BoxProps, FlexProps } from '@chakra-ui/react';

export interface Context {
	navigate: NavigateFunction,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	isLoading: boolean,
	api: AxiosInstance,
	setBearer: (bearer: string) => string,
	error: string | null,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	throwErr: (message: string, err?: any) => void
};

export interface LoginProps extends Context {
	setCookie: (name: string, value: any, options?: CookieSetOptions | undefined) => void
};

export interface HomeProps extends Context {
	cookies: {
		ecommerce_user?: any,
		ecommerce_bearer?: any
	},
	removeCookie: (name: string, options?: CookieSetOptions | undefined) => void
};

export interface SidebarProps {
	setTab: React.Dispatch<React.SetStateAction<JSX.Element>>,
	tabs: JSX.Element[]
};

export interface LinkItemProps {
	name: string,
	icon: IconType
};

export interface BarProps extends BoxProps {
	onClose: () => void,
	setTab: React.Dispatch<React.SetStateAction<JSX.Element>>,
	tabs: JSX.Element[]
};

export interface NavItemProps extends FlexProps {
	icon: IconType,
	children: string | number
};

export interface MobileProps extends FlexProps {
	onOpen: () => void
};
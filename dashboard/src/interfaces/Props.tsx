import { AxiosInstance } from "axios";
import { NavigateFunction } from "react-router-dom";
import { CookieSetOptions } from "universal-cookie/cjs/types";

export interface Context {
	navigate: NavigateFunction,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	isLoading: boolean,
	api: AxiosInstance,
	setBearer: (bearer: string | null) => void,
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
import "./App.css";
import { useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom";
import axios, { AxiosInstance } from "axios";
import { useCookies } from "react-cookie";
import { Alert, AlertTitle, AlertIcon } from "@chakra-ui/react";
import { User } from "./interfaces/User"
import Login from "./components/Login";
import Home from "./components/Home";
import { BaseProps } from "./interfaces/Props";

const api: AxiosInstance = axios.create({ baseURL: "http://localhost:1337/api/v1" });
const updateBearer = (bearer: string) => api.defaults.headers.common["Authorization"] = "Bearer " + bearer;

const App = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies<string>(["ecommerce_user", "ecommerce_bearer"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const [errorContent, setErrorContent] = useState<string | null>(null);
  const throwErr = (message: string, err: any = null) => {
    setIsErrorVisible(true);
    setErrorContent(message);
    if (err) console.error(err);
  }

  const context: BaseProps = { api, navigate, user, cookies, setIsErrorVisible, throwErr, removeCookie };
  const loggedIn: JSX.Element = Home(context);
  const loggedOut: JSX.Element = Login({ ...context, updateBearer, setUser, setCookie, isLoading, setIsLoading });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={loggedIn} />
        <Route path="/products" element={loggedIn} />
        <Route path="/categories" element={loggedIn} />
        <Route path="/orders" element={loggedIn} />
        <Route path="/users" element={loggedIn} />
        <Route path="/login" element={loggedOut} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {isErrorVisible ?
        <Alert className="Alert" status="error">
          <AlertIcon />
          <AlertTitle>{errorContent}</AlertTitle>
        </Alert>
      : 
        <></>
      }

    </div>
  );
}

export default App;

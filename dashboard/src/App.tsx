import "./App.css";
import { useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom";
import axios, { AxiosInstance } from "axios";
import { useCookies } from "react-cookie";
import { Alert, AlertTitle, AlertIcon } from "@chakra-ui/react";
import { User } from "./interfaces/User"
import Login from "./components/Login";
import Home from "./components/Home";
import Products from "./components/Home/Products";

const api: AxiosInstance = axios.create({ baseURL: "http://localhost:1337/api/v1" });
const updateBearer = (bearer: string) => api.defaults.headers.common["Authorization"] = "Bearer " + bearer;

const App = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [cookies, setCookie, removeCookie] = useCookies<string>(["ecommerce_user", "ecommerce_bearer"]);
  const [isLoading, setIsLoading] = useState(false);

  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);
  const [errorContent, setErrorContent] = useState<string | null>(null);
  const throwErr = (message: string, err: any = null) => {
    setIsErrorVisible(true);
    setErrorContent(message);
    if (err) console.error(err);
  }

  const homeProps = { api, navigate, user, cookies, setIsErrorVisible, throwErr }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={Home(homeProps)} />
        <Route path="/products" element={Home(homeProps)} />
        <Route path="/categories" element={Home(homeProps)} />
        <Route path="/orders" element={Home(homeProps)} />
        <Route path="/users" element={Home(homeProps)} />
        <Route path="/login" element={Login({ api, updateBearer, navigate, setUser, cookies, setCookie, isLoading, setIsLoading, setIsErrorVisible, throwErr })} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {isErrorVisible ?
        <Alert style={{ position: "absolute", bottom: 0 }} status="error">
          <AlertIcon />
          <AlertTitle>{errorContent}</AlertTitle>
        </Alert>
        : <></>}
    </div>
  );
}

export default App;

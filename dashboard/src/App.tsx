import { useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom";
import axios, { AxiosInstance } from "axios";
import { useCookies } from "react-cookie";

import Login from "./components/Login";
import Home from "./components/Home";

import { Context } from "./interfaces/Props";

const api: AxiosInstance = axios.create({ baseURL: "http://localhost:1337/api" });
const setBearer = (bearer: string | null) => api.defaults.headers.common["Authorization"] = bearer ? "Bearer " + bearer : '';

const App = () => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies<string>(["ecommerce_user", "ecommerce_bearer"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const throwErr = (message: string, err: any = null) => {
    setError(message);
    if (err) console.error(err);
  }

  const context: Context = { navigate, isLoading, setIsLoading, api, setBearer, throwErr, error, setError };

  const home: JSX.Element = Home({ ...context, cookies, removeCookie });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={home} />
        <Route path="/products" element={home} />
        <Route path="/categories" element={home} />
        <Route path="/orders" element={home} />
        <Route path="/users" element={home} />

        <Route path="/login" element={Login({ ...context, setCookie })} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* {error ?
        <Alert className="Alert" status="error">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      : 
        <></>
      } */}

    </div>
  );
}

export default App;

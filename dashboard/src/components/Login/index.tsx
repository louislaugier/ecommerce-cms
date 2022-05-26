import { useState, useEffect } from "react";
import axios, { AxiosInstance } from "axios";
import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import { LoginProps } from "../../interfaces/Props";

const Login = (props: LoginProps) => {
  useEffect(() => {
    if (props.cookies["ecommerce_user"]) props.navigate("/")
    // eslint-disable-next-line
  }, []);

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const login = async (): Promise<void> => {
    props.setIsLoading(true);
    if (!email) props.throwErr("No email provided");
    else if (!password) props.throwErr("No password provided");
    else try {
      const apiWithoutPrefix: AxiosInstance = axios.create({ baseURL: (props.api.defaults.baseURL || "").replace("/v1", "") });
      const res = await apiWithoutPrefix.post("auth/local", { identifier: email, password });
      if (res.data && res.data.user?.isAdmin) {
        props.setIsErrorVisible(false);
        props.setUser(res.data.user);
        props.updateBearer(res.data.jwt);
        props.setCookie("ecommerce_jwt", res.data.jwt, { path: "/" });
        props.setCookie("ecommerce_user", res.data.user.email, { path: "/" });
        props.navigate("/");
      }
    } catch (err: any) {
      let msg: string = "Internal server error!";
      if (err.response.status === 400) msg = "Incorrect login!";
      props.throwErr(msg, err);
    }
    props.setIsLoading(false);
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Admin login</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input onChange={(e) => setPassword(e.target.value)} type="password" />
            </FormControl>
            <Button
              onClick={(e) => login()}
              style={{ marginTop: 25 }}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}>
              Login
            </Button>
          </Stack>
        </Box>
      </Stack>

    </Flex>
  );
}

export default Login;

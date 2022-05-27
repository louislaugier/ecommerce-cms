import { useState } from "react";
import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import { LoginProps } from "../../interfaces/Props";

const Login = ({ navigate, isLoading, setIsLoading, throwErr, api, error, setError, setBearer, setCookie}: LoginProps) => {

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const login = async (): Promise<void> => {
    setIsLoading(true);
    if (!email) throwErr("No email provided");
    else if (!password) throwErr("No password provided");
    else try {
      const res = await api.post("auth/local", { identifier: email, password });
      if (res.data && res.data.user?.isAdmin) {
        if (error) setError(null);
        setBearer(res.data.jwt);
        setCookie("ecommerce_bearer", res.data.jwt, { path: "/" });
        setCookie("ecommerce_user", res.data.user.email, { path: "/" });
        navigate("/");
        window.location.reload()
      }
    } catch (err: any) {
      let msg: string = "Internal server error";
      if (err.response.status === 400) msg = "Incorrect login";
      throwErr(msg, err);
    }
    setIsLoading(false);
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
              <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" />
            </FormControl>
            <Button
              isLoading={isLoading}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => login()}
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

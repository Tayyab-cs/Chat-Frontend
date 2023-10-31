import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "../../../components/separator/Separator";
import DefaultAuth from "../../../layouts/auth/Default";
// Assets
import illustration from "../../../assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import useBoundStore from "../../../store/Store";
import { SidebarContext } from "../../../components/contexts/SidebarContext";

function SignUp() {
  // Chakra color mode
  const { signup, user } = useBoundStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!!user) {
      navigate("/");
    }
  }, [user]);

  const [toggleSidebar, setToggleSidebar] = useState(false);

  const authBg = useColorModeValue("white", "navy.900");
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const onLogin = (e) => {
    e.preventDefault();
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    let userName = e.target.userName?.value;
    if (!email || !password || !userName) {
      console.log("---<", email, password, userName);
      return;
    }
    signup({ email, password, userName });
  };

  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Box
          bg={authBg}
          float="right"
          minHeight="100vh"
          height="100%"
          position="relative"
          w="100%"
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <DefaultAuth
            illustrationBackground={illustration}
            image={illustration}
          >
            <Flex
              maxW={{ base: "100%", md: "max-content" }}
              w="100%"
              mx={{ base: "auto", lg: "0px" }}
              me="auto"
              h="100%"
              alignItems="start"
              justifyContent="center"
              mb={{ base: "30px", md: "60px" }}
              px={{ base: "25px", md: "0px" }}
              mt={{ base: "40px", md: "14vh" }}
              flexDirection="column"
            >
              <Box me="auto">
                <Heading color={textColor} fontSize="36px" mb="10px">
                  Sign Up
                </Heading>
                <Text
                  mb="36px"
                  ms="4px"
                  color={textColorSecondary}
                  fontWeight="400"
                  fontSize="md"
                >
                  Enter your email and password to sign in!
                </Text>
              </Box>
              <Flex
                zIndex="2"
                direction="column"
                w={{ base: "100%", md: "420px" }}
                maxW="100%"
                background="transparent"
                borderRadius="15px"
                mx={{ base: "auto", lg: "unset" }}
                me="auto"
                mb={{ base: "20px", md: "auto" }}
              >
                {/* <Button
                  fontSize="sm"
                  me="0px"
                  mb="26px"
                  py="15px"
                  h="50px"
                  borderRadius="16px"
                  bg={googleBg}
                  color={googleText}
                  fontWeight="500"
                  _hover={googleHover}
                  _active={googleActive}
                  _focus={googleActive}
                >
                  <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                  Sign in with Google
                </Button>
                <Flex align="center" mb="25px">
                  <HSeparator />
                  <Text color="gray.400" mx="14px">
                    or
                  </Text>
                  <HSeparator />
                </Flex> */}
                <form onSubmit={onLogin}>
                  <FormControl>
                    <FormLabel
                      display="flex"
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="8px"
                    >
                      Username<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                      isRequired={true}
                      variant="auth"
                      fontSize="sm"
                      ms={{ base: "0px", md: "0px" }}
                      type="text"
                      placeholder="jhonny"
                      mb="24px"
                      fontWeight="500"
                      size="lg"
                      name="userName"
                    />
                    <FormLabel
                      display="flex"
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="8px"
                    >
                      Email<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                      isRequired={true}
                      variant="auth"
                      fontSize="sm"
                      ms={{ base: "0px", md: "0px" }}
                      type="email"
                      placeholder="mail@simmmple.com"
                      mb="24px"
                      fontWeight="500"
                      size="lg"
                      name="email"
                    />
                    <FormLabel
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      display="flex"
                    >
                      Password<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        isRequired={true}
                        fontSize="sm"
                        name="password"
                        placeholder="Min. 8 characters"
                        mb="24px"
                        size="lg"
                        type={show ? "text" : "password"}
                        variant="auth"
                      />
                      <InputRightElement
                        display="flex"
                        alignItems="center"
                        mt="4px"
                      >
                        <Icon
                          color={textColorSecondary}
                          _hover={{ cursor: "pointer" }}
                          as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                          onClick={handleClick}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormLabel
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      display="flex"
                    >
                      Confirm password<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        isRequired={true}
                        fontSize="sm"
                        name="password2"
                        placeholder="Min. 8 characters"
                        mb="24px"
                        size="lg"
                        type={show ? "text" : "password"}
                        variant="auth"
                      />
                      <InputRightElement
                        display="flex"
                        alignItems="center"
                        mt="4px"
                      >
                        <Icon
                          color={textColorSecondary}
                          _hover={{ cursor: "pointer" }}
                          as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                          onClick={handleClick}
                        />
                      </InputRightElement>
                    </InputGroup>

                    <Button
                      fontSize="sm"
                      variant="brand"
                      fontWeight="500"
                      w="100%"
                      h="50"
                      mb="24px"
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </FormControl>
                </form>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="start"
                  maxW="100%"
                  mt="0px"
                >
                  <Text
                    color={textColorDetails}
                    fontWeight="400"
                    fontSize="14px"
                  >
                    Already registered?
                    <NavLink to="/login">
                      <Text
                        color={textColorBrand}
                        as="span"
                        ms="5px"
                        fontWeight="500"
                      >
                        login
                      </Text>
                    </NavLink>
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </DefaultAuth>
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}

export default SignUp;

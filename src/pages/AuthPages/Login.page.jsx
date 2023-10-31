import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { SidebarContext } from "../../components/contexts/SidebarContext";
import SignIn from "../../views/auth/signIn";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (!!user) {
      navigate("/");
    }
  }, [user]);

  const [toggleSidebar, setToggleSidebar] = useState(false);

  const authBg = useColorModeValue("white", "navy.900");
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
          <SignIn />
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
};

export default LoginPage;

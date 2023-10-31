import { useQuery, useQueryClient } from "react-query";
import reactLogo from "../../assets/react.svg";
import { contacts } from "../../services/apis";
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatRoom from "../../components/chat/chatroom";
import useBoundStore from "../../store/Store";
const Dashboard = () => {
  const { data, isLoading, isError } = useQuery("contacts", contacts);
  console.log(data);
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  let { user } = useBoundStore((state) => state);
  let sidebarBg = useColorModeValue("white", "navy.800");
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset",
  );
  let socket = io(`http://localhost:8800/`, {
    // reconnection: false,
    // autoConnect: false,
    // pingTimeout: 60000,
    // upgrade: true,
  });

  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    // if (isConnected === true) {

    // }
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("============>", "socket conected");
    });
    socket.emit("online", {
      senderId: user.id
    });
    // socket.emit("join", {
    //   senderId: user.id,
    //   receiverId: 1,
    //   roomId: "AmrfeVO4",
    // });
    socket.on("online-status", function (data) {
      console.log("message-recive", data);
    });
    socket.on("message-status", function (data) {
      console.log("message-recive", data);
      console.log("messafes", messages);
      setMessages([data, ...messages]);
    });
    socket.on("received-status", function (data) {
      queryClient.invalidateQueries("contacts");
    });

    socket.on("disconnect", function () {
      console.log("socket disconnected from server: ");
      // handelReset();
    });
    return () => {
      setIsConnected(false);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Grid
        h="100vh"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
      >
        <GridItem
          pt="25px"
          px="16px"
          rowSpan={2}
          colSpan={1}
          bg={sidebarBg}
          shadow={shadow}
        >
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              Chat
            </Text>

            <Box pt={4} px="20px">
              <Text>Chats</Text>
              {!isLoading &&
                data?.userData?.singlechat.map((item, key) => (
                  <Flex
                    cursor="pointer"
                    onClick={() => {
                      if (selected) {
                        setSelected(null);
                      }
                      setSelected(item);
                    }}
                    key={key}
                    py={4}
                    borderBottom={"1px"}
                    borderStyle={"solid"}
                    borderColor={"gray.200"}
                    justify={"space-between"}
                    gap={2}
                  >
                    <Flex gap={2}>
                      <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                      />
                      <Box>
                        <Text fontSize="lg">user id: {item.id}</Text>
                        {item.message && (
                          <Text fontSize="sm" color="green">
                            {item.message[0]}
                          </Text>
                        )}
                      </Box>
                    </Flex>
                    <Box>
                      {/* <Text fontSize={"xs"}>12:00</Text> */}
                      {item.unreadMsgs !== 0 && (
                        <Badge
                          variant="solid"
                          rounded="full"
                          colorScheme="green"
                        >
                          {item.unreadMsgs}
                        </Badge>
                      )}
                    </Box>
                  </Flex>
                ))}
              <Text pt={4}>Group</Text>
              {!isLoading &&
                data?.userData?.group.map((item, key) => (
                  <Flex
                    cursor="pointer"
                    key={key}
                    onClick={() => setSelected(item)}
                    py={4}
                    borderBottom={"1px"}
                    borderStyle={"solid"}
                    borderColor={"gray.200"}
                    justify={"space-between"}
                    gap={2}
                  >
                    <Flex gap={2}>
                      <Avatar
                        name={item.name}
                        src="https://bit.ly/dan-abramov"
                      />
                      <Box>
                        <Text fontSize="lg">{item.name}</Text>
                        {item.message && (
                          <Text fontSize="sm" color="green">
                            {item.message[0]}
                          </Text>
                        )}
                      </Box>
                    </Flex>
                    <Box>
                      {/* <Text fontSize={"xs"}>12:00</Text> */}
                      {item.unreadMsgs !== 0 && (
                        <Badge
                          variant="solid"
                          rounded="full"
                          colorScheme="green"
                        >
                          {item.unreadMsgs}
                        </Badge>
                      )}
                    </Box>
                  </Flex>
                ))}
              <Text pt={4}>channel</Text>
              {!isLoading &&
                data?.userData?.channel.map((item, key) => (
                  <Flex
                    cursor="pointer"
                    key={key}
                    onClick={() => setSelected(item)}
                    py={4}
                    borderBottom={"1px"}
                    borderStyle={"solid"}
                    borderColor={"gray.200"}
                    justify={"space-between"}
                    gap={2}
                  >
                    <Flex gap={2}>
                      <Avatar
                        name={item.name}
                        src="https://bit.ly/dan-abramov"
                      />
                      <Box>
                        <Text fontSize="lg">{item.name}</Text>
                        {item.message && (
                          <Text fontSize="sm" color="green">
                            {item.message[0]}
                          </Text>
                        )}
                      </Box>
                    </Flex>
                    <Box>
                      {/* <Text fontSize={"xs"}>12:00</Text> */}
                      {item.unreadMsgs !== 0 && (
                        <Badge
                          variant="solid"
                          rounded="full"
                          colorScheme="green"
                        >
                          {item.unreadMsgs}
                        </Badge>
                      )}
                    </Box>
                  </Flex>
                ))}
            </Box>
          </Box>
        </GridItem>
        <GridItem bg="#fafafc" colSpan={4} rowSpan={2} h={"full"}>
          {selected && (
            <ChatRoom
              socket={socket}
              messages={messages}
              setMessages={setMessages}
              selected={selected}
            />
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;

<SimpleGrid columns={4}></SimpleGrid>;

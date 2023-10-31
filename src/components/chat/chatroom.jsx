import {
  Avatar,
  Box,
  Center,
  CircularProgress,
  Divider,
  Flex,
  IconButton,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BiVideo } from "react-icons/bi";
import { BsFillSendFill, BsMicFill } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { io } from "socket.io-client";
import useBoundStore from "../../store/Store";
import { useQuery } from "react-query";
import { chatDetails } from "../../services/apis";
import moment from "moment";

const ChatRoom = ({ selected, socket, messages, setMessages }) => {
  const [input, setInput] = useState("");
  const [enable, setEnable] = useState(false);
  const [page, setPage] = useState(1);
  const prevScrollHeightRef = useRef(0);
  let sidebarBg = useColorModeValue("white", "navy.800");
  let { user } = useBoundStore((state) => state);
  let { data, isLoading } = useQuery({
    queryKey: ["chatDetails", selected.id, page],
    queryFn: () => chatDetails(selected.id, page),
    onSuccess: (data) => {
      console.log("=========>", data);
      setMessages([...messages, ...data.data.user]);
      setEnable(false);
    },
    refetchOnWindowFocus: false,
    enabled: enable,
  });
  const listInnerRef = useRef();
  console.log({
    selected,
  });
  useEffect(() => {
    socket.emit("joinConversation", {
      userId: user.id,
      // senderId: selected.senderId,
      // receiverId: selected.id,
      roomId: selected.roomid,
    });

    console.log("this is join conversation");
  }, []);
  useEffect(() => {
    setMessages([]);
    setEnable(true);
    console.log("this is useEffect selected");
  }, []);

  socket.on("message-status", function (data) {
    console.log("message-recive", data);
    console.log("messafes", messages);
    setMessages([data, ...messages]);
  });

  const sendMessage = () => {
    console.log(input);
    // setMessages([
    //   {
    //     createdAt: new Date(),
    //     deletedAt: null,
    //     message: input,
    //     receiverId: selected.id,
    //     senderId: user.id,
    //   },
    //   ...messages,
    // ]);
    socket.emit("message", {
      senderId: user.id,
      conversationId: selected.id,
      message: input,
    });
    setInput("");
    console.log({
      senderId: user.id,
      conversationId: selected.id,
      message: input,
    });
  };
  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    if (listInnerRef.current) {
      if (scrollTop - clientHeight === -scrollHeight) {
        if (messages.length !== data.data.count) {
          setPage(page + 1);
          setEnable(true);
        }
      }
    }
  };
  useEffect(() => {
    // Fetch new data using the 'page' state.
    // Update 'messages' with the new data.
    // Ensure you append new data to the existing 'messages' state.

    // After fetching and updating 'messages', restore the scroll position.
    if (listInnerRef.current) {
      listInnerRef.current.scrollTop =
        listInnerRef.current.scrollHeight - prevScrollHeightRef.current;
    }
  }, [page]);
  return (
    <Flex direction="column" h="full" justify="space-between">
      <Box bg={sidebarBg}>
        <Box p={4}>
          <Flex
            py={4}
            // borderBottom={"1px"}
            // borderStyle={"solid"}
            // borderColor={"gray.200"}
            justify={"space-between"}
            align="center"
            gap={2}
          >
            <Flex gap={2}>
              <Avatar name={"qweqw"} src="https://bit.ly/dan-abramov" />
              <Box>
                <Text fontSize="lg">{"asdasd"}</Text>
                <Text fontSize="sm" color="green">
                  typing...
                </Text>
              </Box>
            </Flex>
            <Flex gap={4}>
              <FiPhoneCall />
              <BiVideo />
              <PiDotsThreeCircleLight />
            </Flex>
          </Flex>
        </Box>
      </Box>
      {!isLoading ? (
        // <Flex
        //   overflowY="scroll"
        //   ref={listInnerRef}
        //   onScroll={onScroll}
        //   direction="column-reverse"
        //   pt={2}
        //   px="40px"
        //   h="990px"
        // >
        //   {data &&
        //     messages?.map((item, key) => (
        //       <Flex
        //         key={key}
        //         ml={item.senderId === user.id && "auto"}
        //         gap={4}
        //         align="center"
        //         color="black"
        //         bg="white"
        //         p={2}
        //         rounded="2xl"
        //         mt={2}
        //         w="fit-content"
        //       >
        //         <Text>{item.message}</Text>
        //         <Text fontSize="xs">
        //           {moment(item.createdAt).format("hh:MM a")}
        //         </Text>
        //       </Flex>
        <Flex
          overflowY="scroll"
          ref={listInnerRef}
          onScroll={onScroll}
          direction="column-reverse"
          pt={2}
          px="40px"
          h="990px"
        >
          {data &&
            messages?.map((item, key) => (
              <Flex
                key={key}
                ml={item.senderId === user.id && "auto"}
                gap={4}
                align="center"
                color="black"
                bg="white"
                p={2}
                rounded="2xl"
                mt={2}
                w="fit-content"
              >
                <Text>{item.message}</Text>
                <Text fontSize="xs">
                  {item.createdAt && moment(item.createdAt).format("hh:MM a")}
                </Text>
              </Flex>
            ))}
        </Flex>
      ) : (
        <Center>
          <CircularProgress />
        </Center>
      )}

      <Box bg="white">
        <Flex p={4} w={"full"}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            border="none"
            w={"full"}
          />
          <IconButton>
            <ImAttachment />
          </IconButton>
          <IconButton>
            <BsMicFill />
          </IconButton>
          <Divider orientation="vertical" />
          <IconButton onClick={sendMessage} color="blue">
            <BsFillSendFill />
          </IconButton>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatRoom;

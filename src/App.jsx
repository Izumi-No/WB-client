import React, { useState } from "react";
import {
  Input,
  HStack,
  Box,
  useColorModeValue,
  Modal,
  useDisclosure,
  ScaleFade,
  Text
} from "@chakra-ui/react";
import ArrowRightButton from "./components/ArrowRightButton";
import styled from "@emotion/styled";
import {Global, css} from "@emotion/react"
import io from "socket.io-client";

const Style = styled.div`
  .entrada::placeholder {
    color: ${props => props.color};
    opacity: .3;
  }
`;



const socket = io("https://cottony-pricey-naranja.glitch.me/");
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure(true);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [previas, setPrevias] = useState([]);
  const [isBinary, setBinary] = useState(false);

  const textColor = useColorModeValue("white","black")
  const OtherTextColor = useColorModeValue("black","white")

  const ph = useColorModeValue("black", "white");

  document.addEventListener("DOMContentLoaded", ()=>{onOpen();
    socket.on("previas", data => setPrevias(data));
  });

  const handleSubmit = e => {
    e.preventDefault();


    if (message.length && message.charAt(0) !== " ") {
      socket.emit("message", { username: username, mensage: message });
    }

    setMessage("");
  };
  const userHandler = e => {
    e.preventDefault();

    if (username.length && username.charAt(0) !== " ") {
      onClose();
      setBinary(false)
    }
  };

  socket.on("connect", () => {
    console.log(socket.id);
  });

const MyBoxBg = useColorModeValue("gray.900", "white")
const OtherBoxBg = useColorModeValue( "white" ,"gray.900")
  return (
    <>
    <Global styles={css`
::-webkit-scrollbar {
  min-width: 35px;
  width: 35px;
  min-height: 20px;
  height: 20px;
  z-index: -1;
  
}
 
::-webkit-scrollbar-width{
  
}
::-webkit-scrollbar-thumb {
  border-radius: 16px;
  min-height: 35px;
  background-color: rgba(207, 207, 207, 0.25);
  
    
}
::-webkit-scrollbar-thumb:hover{
  background-color: rgba(207, 207, 207, 0.5);
  
  
}

    `}>
    </Global>
      <Box
        minH="100vh"
        minW="100vw"
        display={isOpen ? "none" : "grid"}
        placeContent="center"
        placeItems="center"
        overflow="hidden"
      >
        <Box
        className="messages-container"
          borderRadius="16px"
          boxShadow="-1px 1px 3px 0 rgba(0, 0, 0, .25)"
          p="5px"
          h="60vh"
          w="350px"
          display="flex"
          justifyItems="center"
          flexDir="column"
          justifyContent="center"
          overflowY="auto"
          
        >
          {previas.map(bagui => {
            if (bagui.username === username) {
              return (
                <Box
                  display="flex"
                  overscrollY="auto"
                  className="my-message"
                  width="100%"
                  flexDir="row-reverse"
                  
                >
                  <Box textAlign="center" display="block" minWidth="0"  maxWidth="48%" p="3px"  justifyContent="center" justifyItems="center" wordBreak="break-word" boxShadow="-1px 1px 3px 0 rgba(0, 0, 0, .25)" background={MyBoxBg} marginTop="4px" color={textColor} borderRadius="12px">
                  
                  <Text margin="0">{isBinary ? bagui.binary : bagui.text} </Text>
                  </Box>
                </Box>
              );
            } else {
              return (
                <Box
                  display="flex"
                  className="other-message"
                  width="100%"
                  flexDir="row"
                  
                >
                  <Box textAlign="center" display="block" minWidth="0"  maxWidth="50%" p="3px"  justifyContent="center" justifyItems="center" wordBreak="break-word" boxShadow="-1px 1px 3px 0 rgba(0, 0, 0, .25)" background={OtherBoxBg} marginTop="4px" color={OtherTextColor} borderRadius="12px">
                  <Text fontWeight="500">
                    {bagui.username}
                  </Text>
                  <Text>{isBinary ? bagui.binary : bagui.text} </Text>
                  </Box>
                </Box>
              );
            }
          })}
        </Box>
        <form onSubmit={handleSubmit}>
          <HStack marginTop="5px">
            <Style color={ph}>
              <fieldset>
                <Input
                  as="input"
                  className="entrada"
                  onChange={e => setMessage(e.target.value)}
                  textAlign="center"
                  value={message}
                  w="300px"
                  h="35px"
                  borderRadius="35px"
                  placeholder="Mensagem"
                  style={{
                    border: "none",
                    boxShadow: "-1px 2px 5px 0 rgba(0, 0, 0, .25)"
                  }}
                ></Input>
              </fieldset>
            </Style>
            <ArrowRightButton type="submit"></ArrowRightButton>
          </HStack>
        </form>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen}>
        <Box
          display="grid"
          minH="90vh"
          minW="90vw"
          placeContent="center"
          placeItems="center"
          motionPreset="fade"
        >
          <ScaleFade delay="3s" initialScale={0.9} in={isOpen}>
            <form onSubmit={userHandler}>
              <HStack>
                <Style color={ph}>
                  <fieldset>
                    <Input
                      as="input"
                      className="entrada"
                      onChange={e => {
                        setUsername(e.target.value);
                      }}
                      textAlign="center"
                      value={username}
                      w="300px"
                      h="35px"
                      borderRadius="35px"
                      placeholder="digite seu usuario"
                      maxLength={8}
                      style={{
                        border: "none",
                        boxShadow: "-1px 2px 5px 0 rgba(0, 0, 0, .25)"
                      }}
                    ></Input>
                  </fieldset>
                </Style>
                <ArrowRightButton type="submit"></ArrowRightButton>
              </HStack>
            </form>
          </ScaleFade>
        </Box>
      </Modal>
    </>
  );
}

export default App;

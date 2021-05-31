import React, { useState } from 'react'
import { Input, HStack, Box, useColorMode, useColorModeValue, Modal, useDisclosure, ScaleFade, Heading, Text } from '@chakra-ui/react'
import ArrowRightButton from './components/ArrowRightButton'
import styled from '@emotion/styled'

import io from "socket.io-client"

const Style = styled.div`
  .entrada::placeholder{
    color: ${props => props.color};
    opacity: .298
  }

`


const socket = io("http://127.0.0.1:3333")



function App() {
  const { isOpen, onOpen, onClose,  } = useDisclosure(true)
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [previas, setPrevias] = useState([])

  let id

  const ph = useColorModeValue("black", "white")

  document.addEventListener("DOMContentLoaded", onOpen)

  const handleSubmit = e => {
    e.preventDefault();
    
    socket.on("previas", data => setPrevias(data))

    if(message.length && message.charAt(0) !== " "){
    socket.emit("message", { username: username , mensage: message })
    }

    setMessage('')
  }
  const userHandler = (e) => {
    e.preventDefault()

    

    if (username.length && username.charAt(0) !== " "){
    onClose()}
  }

socket.on("connect", () => {
  id = socket.id
  console.log(socket.id) })

  

  return (
   <>
    <Box
      minH="100vh"
      minW="100vw"
      display={isOpen?"none":"grid"}
      placeContent="center"
      placeItems="center" >
      <Box h="40vh" w="350px" overflowY="auto" >
        
      {previas.map((bagui)=>{ if (bagui.id == id ){return (<Text as="h1"><strong>{bagui.username}</strong>:{bagui.text} </Text>)}else{return (<Text as="h1"><strong>{bagui.username}</strong>:{bagui.text} </Text >)}} )}
      </Box>
      <form onSubmit={handleSubmit}>
        <HStack><Style color={ph}>
          <fieldset>
            <Input
              as="input"
              className="entrada"
              onChange={(e) => setMessage(e.target.value)}
              textAlign="center"
              value={message}
              w="300px"
              h="35px"
              borderRadius="35px"
              placeholder="Mensagem"
              style={{
                border: "none",
                boxShadow: "-1px 2px 5px 0 rgba(0, 0, 0, .25)"
              }}></Input>
          </fieldset>
        </Style>
          <ArrowRightButton type="submit" ></ArrowRightButton>
        </HStack></form></Box>

    
    <Modal  onClose={onClose} isOpen={isOpen}><Box display="grid" minH="90vh"
      minW="90vw"
      placeContent="center"
      placeItems="center"
      motionPreset="fade"
      ><ScaleFade delay="2s" initialScale={0.9} in={isOpen}><form onSubmit={userHandler}><HStack><Style color={ph}>
      <fieldset>
        <Input
          as="input"
          className="entrada"
          onChange={(e) => {setUsername(e.target.value)}}
          textAlign="center"
          value={username}
          w="300px"
          h="35px"
          borderRadius="35px"
          placeholder="digite seu usuario"
          style={{
            border: "none",
            boxShadow: "-1px 2px 5px 0 rgba(0, 0, 0, .25)"
          }}
          ></Input>
      </fieldset>
    </Style>
      <ArrowRightButton type="submit"></ArrowRightButton>
    </HStack></form></ScaleFade></Box></Modal>

  </>)
}

export default App
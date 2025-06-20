'use client';
import { VStack, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function LoginInput({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email, password });
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <VStack spacing={3} align="stretch">
        <Text fontSize="sm" color="gray.600" fontWeight="medium">
          Email
        </Text>
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
        />
      </VStack>

      <VStack spacing={3} align="stretch">
        <Text fontSize="sm" color="gray.600" fontWeight="medium">
          Senha
        </Text>
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          bg="white"
          border="1px solid"
          borderColor="gray.300"
          _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }}
        />
      </VStack>

      <Button
        colorScheme="teal"
        size="lg"
        onClick={handleSubmit}
        isDisabled={!email || !password}
        _hover={{ transform: "translateY(-1px)", boxShadow: "lg" }}
      >
        Entrar
      </Button>
    </VStack>
  );
}
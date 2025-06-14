'use client';
import { Box, VStack, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import React, { useState } from "react";
import LoginInput from "@/components/LoginInput";
import RegisterInput from "@/components/RegisterInput";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = (data) => {
    toaster.success(`Bem-vindo, ${data.email}`, {
      duration: 3000,
    });
  };

  const handleRegisterSuccess = () => {
    setIsRegistering(false);
  };

  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      filter="contrast(95%)"
      bgGradient="to-r"
      gradientFrom="blue.900"
      gradientTo="black"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box w="50%" display="flex" justifyContent="center" alignItems="center">
        <Image
          w="100%"
          src="/images/Whisk_883bb3d159 (1).png"
          alt="Logo"
          
        />
      </Box>
      <Box w="50%" display="flex" justifyContent="center" alignItems="center">
        <Box
          bg="rgba(255, 255, 255, 0.1)"
          backdropFilter="blur(10px)"
          borderRadius="xl"
          boxShadow="xl"
          p={8}
          border="1px solid rgba(255, 255, 255, 0.2)"
          w="90%"
          maxW="700px"
          minH="400px"
        >
          <VStack spacing={4} align="stretch">
            <Heading color="white" fontSize={40} fontWeight={800} textAlign="center">
              Seja bem-vindo!
            </Heading>
            {/* <Text color="white" fontSize={39} fontWeight={700} textAlign="center">
              Posto Calmo
            </Text> */}
            <Text fontSize="lg" color="white" opacity={0.8} textAlign="center">
              Acesse sua conta ou cadastre-se para continuar.
            </Text>
            {isRegistering ? (
              <>
                <RegisterInput onRegisterSuccess={handleRegisterSuccess} />
                <Button mt={2} colorScheme="gray" variant="solid" onClick={() => setIsRegistering(false)}>
                  Voltar ao Login
                </Button>
              </>
            ) : (
              <LoginInput onLogin={handleLogin} />
            )}
            <Button
              mt={4}
              onClick={() => setIsRegistering((v) => !v)}
              colorScheme="teal"
              variant="link"
            >
              {isRegistering ? "Já tem uma conta? Faça login" : "Não tem uma conta? Cadastre-se"}
            </Button>
          </VStack>
        </Box>
      </Box>
      <Toaster />
    </Box>
  );
}

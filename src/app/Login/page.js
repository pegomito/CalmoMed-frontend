'use client';
import { Box, VStack, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoginInput from "@/components/LoginInput";
import RegisterInput from "@/components/RegisterInput";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleLogin = (data) => {
    toaster.create({
      title: "Login realizado com sucesso!",
      description: `Bem-vindo, ${data.email}`,
      status: "success",
    });
    
    // Redireciona para o lobby após 1 segundo
    setTimeout(() => {
      router.push('/Lobby');
    }, 1000);
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
      <Box 
        w="50%" 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        position="relative"
        h="100vh"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="linear-gradient(135deg, #38B2AC 0%, #2C7A7B 50%, #1A365D 100%)"
          clipPath="ellipse(100% 100% at 0% 50%)"
          opacity="0.9"
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          w="90%"
          h="100%"
          bg="linear-gradient(135deg, #4FD1C7 0%, #38B2AC 100%)"
          clipPath="ellipse(100% 100% at 0% 50%)"
          opacity="0.7"
        />
        <Box
          position="relative"
          zIndex="2"
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="80%"
          h="100%"
        >
          <Image
            src="/images/Whisk_ba740e948e.png"
            alt="Logo"
            maxW="900px"
            maxH="900px"
            objectFit="contain"
            filter="drop-shadow(0 10px 20px rgba(0,0,0,0.3))"
          />
        </Box>
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
          maxW="500px"
          minH="350px"
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

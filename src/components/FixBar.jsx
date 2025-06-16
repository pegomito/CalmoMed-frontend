import { Box, Flex, Input, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { FaSearch, FaUserCircle, FaCog } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function FixBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <Box 
      w="100%" 
      position="fixed" 
      top="0" 
      left="0" 
      zIndex="1001"
      bg="linear-gradient(135deg, #2C7A7B 0%, #1A365D 100%)"
      boxShadow="0 2px 10px rgba(0,0,0,0.3)"
    >
      <Flex
        w="100%"
        py={3}
        px={6}
        align="center"
        justify="space-between"
        h="80px"
      >
        <Flex align="center" gap={3}>
          <Image
            src="/images/Whisk_883bb3d159.png"
            alt="Logo"
            width={100}
            height={100}
          />
          
        </Flex>

        {/* Barra de pesquisa */}
        <Box position="relative" w="100%" maxW="500px" mx={6}>
          <Input
            borderRadius="full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            pl={12}
            pr={4}
            h="40px"
            fontSize="md"
            placeholder="Buscar postos, relatórios..."
            _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
            bg="rgba(255, 255, 255, 0.15)"
            border="1px solid rgba(255, 255, 255, 0.3)"
            color="white"
            _focus={{
              bg: "rgba(255, 255, 255, 0.2)",
              borderColor: "teal.300",
              outline: "none"
            }}
          />
          <Box position="absolute" left={4} top="50%" transform="translateY(-50%)">
            <FaSearch color="rgba(255, 255, 255, 0.7)" size={16} />
          </Box>
        </Box>

        {/* Menu do usuário */}
        <Flex align="center" gap={4}>
          <Button
            variant="ghost"
            color="white"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            leftIcon={<FaCog />}
            size="sm"
          >
            Configurações
          </Button>
          <Button
            variant="ghost"
            color="white"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            leftIcon={<FaUserCircle />}
            size="sm"
            onClick={() => router.push('/Login')}
          >
            Sair
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

import { Box, Flex, Input, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { FaSearch, FaUserCircle, FaCog } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSearch } from "@/contexts/SearchContext";

export default function FixBar() {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { searchPosto } = useSearch();
  const router = useRouter();

  const postosSuggestions = [
    "UBS Centro",
    "UBS Efapi", 
    "ESF Bela Vista",
    "UBS Jardim América",
    "UBS Passo dos Fortes",
    "UBS Santa Maria",
    "UBS São Pedro",
    "UBS São Cristóvão"
  ];

  const filteredSuggestions = postosSuggestions.filter(posto =>
    posto.toLowerCase().includes(localSearchTerm.toLowerCase()) && localSearchTerm.length > 0
  );

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      searchPosto(localSearchTerm);
      setShowSuggestions(false);
    }
  };

  const searchClickInput = () => {
    searchPosto(localSearchTerm);
    setShowSuggestions(false);
  };

  const suggestionClickInput = (suggestion) => {
    setLocalSearchTerm(suggestion);
    searchPosto(suggestion);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  return (
    <Box 
      w="100%" 
      position="fixed" 
      top="0" 
      left="0" 
      zIndex="1001"
      bg="rgba(93, 167, 167, 0.9)"
      boxShadow="0 2px 10px rgba(0, 0, 0, 0.3)"
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
        <Box position="relative" w="100%" maxW="500px" mx={6}>
          <Input
            borderRadius="full"
            value={localSearchTerm}
            onChange={handleInputChange}
            onKeyPress={handleSearch}
            onFocus={() => setShowSuggestions(localSearchTerm.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            pl={12}
            pr={12}
            h="40px"
            fontSize="md"
            placeholder="Buscar postos de saúde..."
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
          <Button
            position="absolute"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            size="sm"
            variant="ghost"
            color="white"
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            onClick={searchClickInput}
            px={2}
          >
            
          </Button>
          
          {showSuggestions && filteredSuggestions.length > 0 && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              right="0"
              bg="white"
              borderRadius="md"
              boxShadow="lg"
              zIndex="1002"
              mt={1}
              maxH="200px"
              overflowY="auto"
            >
              {filteredSuggestions.map((suggestion, index) => (
                <Box
                  key={index}
                  p={3}
                  cursor="pointer"
                  color="gray.800"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => suggestionClickInput(suggestion)}
                  borderBottom={index < filteredSuggestions.length - 1 ? "1px solid" : "none"}
                  borderColor="gray.200"
                >
                  <Text fontSize="sm">{suggestion}</Text>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        
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

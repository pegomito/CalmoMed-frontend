'use client';
import { Input, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";

export default function RegisterInput({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    username: "",
    phone: "",
    password: "",
    email: "",
    role: ""
  });

  const mudarInfo = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cadastro fictício, sem validação nem chamada ao backend
  const cadastrarInfo = () => {
    toaster.create({
      title: "Sucesso",
      description: "Usuário cadastrado !",
      type: "success",
    });
    onRegisterSuccess && onRegisterSuccess();
  };

  return (  
    <Stack spacing={4}>
      <Input
        name="name"
        placeholder="Nome"
        onChange={mudarInfo}
        borderColor="white"
        _placeholder={{ color: "white" }}
      />
      <Input
        name="cpf"
        placeholder="CPF"
        onChange={mudarInfo}
        borderColor="white"
        _placeholder={{ color: "white" }}
      />
      <Input
        name="username"
        placeholder="Username"
        onChange={mudarInfo}
        borderColor="white"
        _placeholder={{ color: "white" }}
      />
      <Input
        name="phone"
        placeholder="Telefone"
        onChange={mudarInfo}
        borderColor="white"
        _placeholder={{ color: "white" }}
      />
      <Input
        name="email"
        placeholder="E-mail"
        onChange={mudarInfo}
        borderColor="white"
        _placeholder={{ color: "white" }}
      />
      <Input
        name="role"
        placeholder="Cargo (ex: admin, user)"
        onChange={mudarInfo}
        borderColor="white"
        _placeholder={{ color: "white" }}
      />
      <Input
        name="password"
        type="password"
        placeholder="Senha"
        onChange={mudarInfo}
        borderColor="white"
        _placeholder={{ color: "white" }}
      />
      <Button onClick={cadastrarInfo} colorScheme="blue">
        Cadastrar
      </Button>
    </Stack>
  );
}

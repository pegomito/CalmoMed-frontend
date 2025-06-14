'use client';
import { useState } from "react";
import { Input, Button, Stack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

export default function RegisterInput({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (!formData.email || !formData.password) {
      toaster.create({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios!",
      });
      return;
    }
    toaster.create({
      title: "Cadastro realizado!",
      description: "Você pode fazer login agora.",
    });
    onRegisterSuccess();
  };

  return (
    <Stack spacing={4}>
      <Input
        name="email"
        placeholder="E-mail"
        onChange={handleChange}
        borderColor="white"
        _placeholder={{ color: "white" }}
      />
      <Input
        name="password"
        type="password"
        placeholder="Senha"
        onChange={handleChange}
        borderColor="white"
        _placeholder={{ color: "white" }}
      />
      <Button onClick={handleRegister} colorScheme="teal">
        Cadastrar
      </Button>
    </Stack>
  );
}

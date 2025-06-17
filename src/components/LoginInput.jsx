'use client';
import { useState } from "react";
import { Input, Button, Stack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import PasswordDialog from "@/components/PasswordDialog";

export default function LoginInput({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  const changeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendLogin = () => {
    if (!formData.email || !formData.password) {
      toaster.create({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios!",
      });
      return;
    }
    onLogin(formData);
  };

  return (
    <>
      <Stack spacing={4}>
        <Input
          name="email"
          placeholder="E-mail"
          onChange={changeInput}
          borderColor="white"
          _placeholder={{ color: "white" }}
        />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          onChange={changeInput}
          borderColor="white"
          _placeholder={{ color: "white" }}
        />
        
        <Button onClick={sendLogin} colorScheme="blue">
          Entrar
        </Button>
        <Button
          colorScheme="gray"
          variant="link"
          onClick={() => setPasswordDialogOpen(true)}
        >
          Esqueci minha senha
        </Button>
      </Stack>

      <PasswordDialog 
        isOpen={passwordDialogOpen} 
        onClose={() => setPasswordDialogOpen(false)} 
      />
    </>
  );
}

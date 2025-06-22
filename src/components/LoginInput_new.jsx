'use client';
import { useState } from "react";
import {
  Input,
  Button,
  Stack,
  Text,
  Dialog,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import axios from "@/utils/axios";

export default function LoginInput({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [recoverToken, setRecoverToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const applyChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyLogin = () => {
    const { email, password } = formData;
    if (!email || !password) {
      toaster.create({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios!",
        type: "error",
      });
      return;
    }
    onLogin(formData);
  };

  const sendRecoverEmail = async () => {
    if (!recoverEmail) {
      toaster.create({
        title: "Erro",
        description: "Digite seu e-mail para recuperar a senha.",
        type: "error",
      });
      return;
    }
    try {
      const response = await axios.post("/users/email", { email: recoverEmail });
      toaster.create({
        title: "Sucesso",
        description: response.data.message || "Código enviado para o e-mail.",
        type: "success",
      });
      setStep(2);
    } catch (error) {
      toaster.create({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao enviar código de recuperação.",
        type: "error",
      });
    }
  };

  const changePassword = async () => {
    if (!recoverToken || !newPassword) {
      toaster.create({
        title: "Erro",
        description: "Preencha o código e a nova senha.",
        type: "error",
      });
      return;
    }
    try {
      const response = await axios.post("/users/recuperar-senha", {
        token: recoverToken,
        newPassword,
      });
      toaster.create({
        title: "Sucesso",
        description: response.data.message || "Senha alterada com sucesso!",
        type: "success",
      });
      setStep(1);
      setRecoverEmail("");
      setRecoverToken("");
      setNewPassword("");
      setDialogOpen(false);
    } catch (error) {
      toaster.create({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao redefinir senha.",
        type: "error",
      });
    }
  };

  const openDialog = () => {
    setStep(1);
    setRecoverEmail("");
    setRecoverToken("");
    setNewPassword("");
    setDialogOpen(true);
  };

  return (
    <>
      <Stack spacing={4}>
        <Input
          name="email"
          placeholder="E-mail"
          onChange={applyChange}
          borderColor="white"
          _placeholder={{ color: "white" }}
        />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          onChange={applyChange}
          borderColor="white"
          _placeholder={{ color: "white" }}
        />
        <Button
          colorScheme="gray"
          variant="link"
          onClick={openDialog}
        >
          Esqueci minha senha
        </Button>
        <Button onClick={applyLogin} colorScheme="blue">
          Entrar
        </Button>
      </Stack>

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              style={{
                background: "rgba(12, 39, 80, 0.97)",
                borderRadius: 8,
                padding: 24,
                minWidth: 320,
                position: "fixed",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1300,
              }} >
              <Dialog.Header>
                <Dialog.Title>
                  {step === 1 ? "Recuperar Senha" : "Redefinir Senha"}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text mb={4}>
                  {step === 1
                    ? "Digite seu e-mail para receber o código de recuperação."
                    : "Digite o código recebido e sua nova senha."}
                </Text>
                <Stack spacing={3}>
                  {step === 1 ? (
                    <>
                      <Input
                        placeholder="E-mail"
                        value={recoverEmail}
                        onChange={e => setRecoverEmail(e.target.value)}
                      />
                      <Button colorScheme="blue" onClick={sendRecoverEmail}>
                        Enviar código
                      </Button>
                    </>
                  ) : (
                    <>
                      <Input
                        placeholder="Código recebido no e-mail"
                        value={recoverToken}
                        onChange={e => setRecoverToken(e.target.value)}
                      />
                      <Input
                        placeholder="Nova senha"
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                      />
                      <Button colorScheme="blue" onClick={changePassword}>
                        Alterar senha
                      </Button>
                    </>
                  )}
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                 Cancelar
                </Button>
              </Dialog.Footer>
            
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}

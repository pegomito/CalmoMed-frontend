'use client';
import { useState } from "react";
import {
  Input,
  Button,
  Stack,
  Text,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

export default function PasswordDialog({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [recoverToken, setRecoverToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const sendRecoverEmail = () => {
    if (!recoverEmail) {
      toaster.create({
        title: "Erro",
        description: "Digite seu e-mail para recuperar a senha.",
        type: "error",
      });
      return;
    }
    
    toaster.create({
      title: "Sucesso",
      description: "Código enviado para o e-mail com sucesso!",
      type: "success",
    });
    setStep(2);
  };

  const changePassword = () => {
    if (!recoverToken || !newPassword) {
      toaster.create({
        title: "Erro",
        description: "Preencha o código e a nova senha.",
        type: "error",
      });
      return;
    }
    
    toaster.create({
      title: "Sucesso",
      description: "Senha alterada com sucesso!",
      type: "success",
    });
    
    setStep(1);
    setRecoverEmail("");
    setRecoverToken("");
    setNewPassword("");
    onClose();
  };

  const handleClose = () => {
    setStep(1);
    setRecoverEmail("");
    setRecoverToken("");
    setNewPassword("");
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            style={{
              background: "rgba(48, 46, 66, 0.97)",
              borderRadius: 8,
              padding: 24,
              minWidth: 320,
              position: "fixed",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1300,
            }}
          >
            <Dialog.Header>
              <Dialog.Title color="white">
                {step === 1 ? "Recuperar Senha" : "Redefinir Senha"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text mb={4} color="white">
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
                      borderColor="white"
                      _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
                      color="white"
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
                      borderColor="white"
                      _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
                      color="white"
                    />
                    <Input
                      placeholder="Nova senha"
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      borderColor="white"
                      _placeholder={{ color: "rgba(255, 255, 255, 0.7)" }}
                      color="white"
                    />
                    <Button colorScheme="blue" onClick={changePassword}>
                      Alterar senha
                    </Button>
                  </>
                )}
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="ghost" color="white" onClick={handleClose}>
                Cancelar
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

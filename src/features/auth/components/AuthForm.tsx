import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";
import AppText from "@/components/Text";
import {
  Button,
  FieldError,
  InputGroup,
  Label,
  TextField,
} from "heroui-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";

import {
  loginSchema,
  LoginSchemaType,
} from "@/features/types/credential-types";
import { signIn, signUp } from "@/features/auth/services/auth.service";
import Loader from "@/components/Loader";

interface AuthFormProps {
  mode: "login" | "register";
}

function errorMessage(error: unknown): string {
  const raw = error instanceof Error ? error.message : "";
  if (raw.includes("Invalid login credentials")) {
    return "Correo o contraseña incorrectos.";
  }
  if (raw.includes("User already registered")) {
    return "Ya existe una cuenta con ese correo.";
  }
  if (raw.includes("Email not confirmed")) {
    return "Debes confirmar tu correo antes de iniciar sesión.";
  }
  if (raw.includes("Password should be at least")) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  return raw || "Ocurrió un error inesperado.";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const isRegister = mode === "register";
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [isPending, setIsPending] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(
    null
  );

  const groupClassName = (state: "error" | "focused" | "default") =>
    `rounded-2xl border bg-white shadow-sm overflow-hidden ${
      state === "error"
        ? "border-danger"
        : state === "focused"
          ? "border-accent"
          : "border-gray-300"
    }`;

  const onSubmit = async (data: LoginSchemaType) => {
    setSubmitError(null);
    setIsPending(true);
    try {
      const { session } = isRegister
        ? await signUp(data.email, data.password)
        : await signIn(data.email, data.password);

      if (!session) {
        setIsPending(false);
        setSubmitError("Revisa tu correo para confirmar tu cuenta.");
        return;
      }
      router.replace("/(tab)/home");
    } catch (error) {
      setIsPending(false);
      setSubmitError(errorMessage(error));
    }
  };

  return (
    <>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        <View className="p-8 pb-12">
          <View className="mb-8 gap-1.5">
            <AppText className="text-3xl font-bold text-center text-foreground">
              {isRegister ? "Crea tu cuenta" : "Iniciar sesión"}
            </AppText>
            {/*<AppText className="text-base text-[#6B7280]">
              {isRegister
                ? "Completa tus datos para empezar."
                : "Ingresa tus credenciales para continuar."}
            </AppText>*/}
          </View>

          <View className="gap-6">
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <TextField isInvalid={!!fieldState.error}>
                  <Label className="text-base font-semibold text-foreground">
                    Correo electrónico
                  </Label>
                  <InputGroup
                    className={groupClassName(
                      fieldState.error
                        ? "error"
                        : focusedField === "email"
                          ? "focused"
                          : "default"
                    )}
                  >
                    <InputGroup.Prefix isDecorative>
                      <Mail size={20} color="#9CA3AF" />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      placeholder="tucorreo@ejemplo.com"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={field.value}
                      onChangeText={field.onChange}
                      onBlur={() => { field.onBlur(); setFocusedField(null); }}
                      onFocus={() => setFocusedField("email")}
                      style={{ borderWidth: 0 }}
                      className="h-14 text-base"
                    />
                  </InputGroup>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </TextField>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <TextField isInvalid={!!fieldState.error}>
                  <Label className="text-base font-semibold text-foreground">
                    Contraseña
                  </Label>
                  <InputGroup
                    className={groupClassName(
                      fieldState.error
                        ? "error"
                        : focusedField === "password"
                          ? "focused"
                          : "default"
                    )}
                  >
                    <InputGroup.Prefix isDecorative>
                      <Lock size={20} color="#9CA3AF" />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      placeholder="••••••••"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={field.value}
                      onChangeText={field.onChange}
                      onBlur={() => { field.onBlur(); setFocusedField(null); }}
                      onFocus={() => setFocusedField("password")}
                      style={{ borderWidth: 0 }}
                      className="h-14 text-base"
                    />
                  </InputGroup>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </TextField>
              )}
            />
          </View>

          <View className="mt-8 gap-5">
            {submitError && (
              <AppText className="text-center text-sm font-medium text-red-500">
                {submitError}
              </AppText>
            )}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              isDisabled={isPending}
              onPress={form.handleSubmit(onSubmit)}
            >
              {isRegister ? "Registrarme" : "Iniciar sesión"}
            </Button>

            <View className="flex-row items-center gap-3">
              <View className="h-px flex-1 bg-[#E5E7EB]" />
              <AppText className="text-sm text-[#9CA3AF]">o continúa con</AppText>
              <View className="h-px flex-1 bg-[#E5E7EB]" />
            </View>

            {isRegister ? (
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onPress={() => router.replace("/login")}
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onPress={() => router.push("/register")}
              >
                Crear una cuenta
              </Button>
            )}
          </View>
        </View>
      </ScrollView>

      <Modal visible={isPending} animationType="fade" onRequestClose={() => {}}>
        <Loader
          title={isRegister ? "Creando tu cuenta..." : "Iniciando sesión..."}
        />
      </Modal>
    </>
  );
};

export default AuthForm;

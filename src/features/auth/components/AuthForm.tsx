import React, { useState } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
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
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react-native";

import {
  loginSchema,
  registerSchema,
  LoginSchemaType,
  RegisterSchemaType,
} from "@/features/auth/types";
import { signIn, signUp } from "@/features/profile/services/auth.service";
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

  const loginForm = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
  });

  const [isPending, setIsPending] = useState(false);
  const [focusedField, setFocusedField] = useState<
    "firstName" | "lastName" | "email" | "password" | null
  >(null);
  const [showPassword, setShowPassword] = useState(false);

  const groupClassName = (state: "error" | "focused" | "default") =>
    `rounded-2xl border bg-white shadow-sm overflow-hidden ${
      state === "error"
        ? "border-danger"
        : state === "focused"
          ? "border-accent"
          : "border-gray-300"
    }`;

  const inputStyle = {
    borderWidth: 0,
    textAlignVertical: "center" as const,
    height: 48,
    lineHeight: 20,
    paddingTop: 0,
    paddingBottom: 0,
  };

  const onSubmitLogin = async (data: LoginSchemaType) => {
    setSubmitError(null);
    setIsPending(true);
    try {
      const { session } = await signIn(data.email, data.password);
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

  const onSubmitRegister = async (data: RegisterSchemaType) => {
    setSubmitError(null);
    setIsPending(true);
    try {
      const { session } = await signUp(data.email, data.password, {
        first_name: data.firstName,
        last_name: data.lastName,
      });
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
        <View className="px-6 pt-8 pb-6">
          <View className="mb-6 gap-1">
            <AppText className="text-2xl font-bold text-center text-foreground">
              {isRegister ? "Crea tu cuenta" : "Iniciar sesión"}
            </AppText>
          </View>

          <View className="gap-5">
            {isRegister ? (
              <>
                <Controller
                  control={registerForm.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <TextField isInvalid={!!fieldState.error}>
                      <Label className="text-sm font-semibold text-foreground">
                        Nombre
                      </Label>
                      <InputGroup
                        className={groupClassName(
                          fieldState.error
                            ? "error"
                            : focusedField === "firstName"
                              ? "focused"
                              : "default"
                        )}
                      >
                        <InputGroup.Prefix isDecorative>
                          <User size={18} color="#9CA3AF" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                          placeholder="Tu nombre"
                          placeholderTextColor="#9CA3AF"
                          autoCapitalize="words"
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={() => {
                            field.onBlur();
                            setFocusedField(null);
                          }}
                          onFocus={() => setFocusedField("firstName")}
                          style={inputStyle}
                          className="h-12 text-base"
                        />
                      </InputGroup>
                      <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                  )}
                />

                <Controller
                  control={registerForm.control}
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <TextField isInvalid={!!fieldState.error}>
                      <Label className="text-sm font-semibold text-foreground">
                        Apellido
                      </Label>
                      <InputGroup
                        className={groupClassName(
                          fieldState.error
                            ? "error"
                            : focusedField === "lastName"
                              ? "focused"
                              : "default"
                        )}
                      >
                        <InputGroup.Prefix isDecorative>
                          <User size={18} color="#9CA3AF" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                          placeholder="Tu apellido"
                          placeholderTextColor="#9CA3AF"
                          autoCapitalize="words"
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={() => {
                            field.onBlur();
                            setFocusedField(null);
                          }}
                          onFocus={() => setFocusedField("lastName")}
                          style={inputStyle}
                          className="h-12 text-base"
                        />
                      </InputGroup>
                      <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                  )}
                />

                <Controller
                  control={registerForm.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <TextField isInvalid={!!fieldState.error}>
                      <Label className="text-sm font-semibold text-foreground">
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
                          <Mail size={18} color="#9CA3AF" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                          placeholder="tucorreo@ejemplo.com"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={() => {
                            field.onBlur();
                            setFocusedField(null);
                          }}
                          onFocus={() => setFocusedField("email")}
                          style={inputStyle}
                          className="h-12 text-base"
                        />
                      </InputGroup>
                      <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                  )}
                />

                <Controller
                  control={registerForm.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <TextField isInvalid={!!fieldState.error}>
                      <Label className="text-sm font-semibold text-foreground">
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
                          <Lock size={18} color="#9CA3AF" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                          placeholder="••••••••"
                          placeholderTextColor="#9CA3AF"
                          secureTextEntry={!showPassword}
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={() => {
                            field.onBlur();
                            setFocusedField(null);
                          }}
                          onFocus={() => setFocusedField("password")}
                          style={inputStyle}
                          className="h-12 text-base"
                        />
                        <InputGroup.Suffix>
                          <Pressable
                            onPress={() => setShowPassword((prev) => !prev)}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel={
                              showPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                            }
                          >
                            {showPassword ? (
                              <EyeOff size={18} color="#9CA3AF" />
                            ) : (
                              <Eye size={18} color="#9CA3AF" />
                            )}
                          </Pressable>
                        </InputGroup.Suffix>
                      </InputGroup>
                      <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                  )}
                />
              </>
            ) : (
              <>
                <Controller
                  control={loginForm.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <TextField isInvalid={!!fieldState.error}>
                      <Label className="text-sm font-semibold text-foreground">
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
                          <Mail size={18} color="#9CA3AF" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                          placeholder="tucorreo@ejemplo.com"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={() => {
                            field.onBlur();
                            setFocusedField(null);
                          }}
                          onFocus={() => setFocusedField("email")}
                          style={inputStyle}
                          className="h-12 text-base"
                        />
                      </InputGroup>
                      <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                  )}
                />

                <Controller
                  control={loginForm.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <TextField isInvalid={!!fieldState.error}>
                      <Label className="text-sm font-semibold text-foreground">
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
                          <Lock size={18} color="#9CA3AF" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                          placeholder="••••••••"
                          placeholderTextColor="#9CA3AF"
                          secureTextEntry={!showPassword}
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={() => {
                            field.onBlur();
                            setFocusedField(null);
                          }}
                          onFocus={() => setFocusedField("password")}
                          style={inputStyle}
                          className="h-12 text-base"
                        />
                        <InputGroup.Suffix>
                          <Pressable
                            onPress={() => setShowPassword((prev) => !prev)}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel={
                              showPassword
                                ? "Ocultar contraseña"
                                : "Mostrar contraseña"
                            }
                          >
                            {showPassword ? (
                              <EyeOff size={18} color="#9CA3AF" />
                            ) : (
                              <Eye size={18} color="#9CA3AF" />
                            )}
                          </Pressable>
                        </InputGroup.Suffix>
                      </InputGroup>
                      <FieldError>{fieldState.error?.message}</FieldError>
                    </TextField>
                  )}
                />
              </>
            )}
          </View>

          <View className="mt-6 gap-5">
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
              onPress={
                isRegister
                  ? registerForm.handleSubmit(onSubmitRegister)
                  : loginForm.handleSubmit(onSubmitLogin)
              }
            >
              {isRegister ? "Registrarme" : "Iniciar sesión"}
            </Button>

            <View className="flex-row items-center gap-3">
              <View className="h-px flex-1 bg-[#E5E7EB]" />
              <AppText className="text-xs text-[#9CA3AF]">
                o continúa con
              </AppText>
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

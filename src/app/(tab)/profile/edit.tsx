import { useState } from "react";
import { Alert, Pressable, ScrollView, TextInput, View } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Button } from "heroui-native";
import { Camera } from "lucide-react-native";
import Header from "@/components/Header";
import AppText from "@/components/Text";
import { useCurrentUser } from "@/features/profile/hooks/useCurrentUser";
import { updateProfile } from "@/features/profile/services/auth.service";
import { useTypeScale } from "@/util/responsive";

export default function EditProfileScreen() {
  const t = useTypeScale();
  const { fullName, firstName, lastName, email, phone: userPhone, avatarUrl } =
    useCurrentUser();

  const [name, setName] = useState(fullName ?? "");
  const [phone, setPhone] = useState(userPhone ?? "");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const displayName = fullName ?? email?.split("@")[0] ?? "Usuario";
  const initials =
    displayName
      .split(/[\s._-]+/)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "US";
  const avatarSource = photoUri ?? avatarUrl ?? null;

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso",
        "Permite el acceso a tus fotos para cambiar tu imagen."
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const save = async () => {
    const cleanName = name.trim();
    const cleanPhone = phone.replace(/[^\d]/g, "");
    if (cleanName.length < 2) {
      Alert.alert("Aviso", "Escribe un nombre de al menos 2 caracteres.");
      return;
    }
    if (phone.trim() && cleanPhone.length < 7) {
      Alert.alert("Aviso", "Escribe un teléfono válido.");
      return;
    }
    setSaving(true);
    try {
      const parts = cleanName.split(" ");
      await updateProfile({
        first_name: parts[0],
        last_name: parts.slice(1).join(" "),
        phone: cleanPhone || undefined,
      });
      router.back();
    } catch {
      Alert.alert("Error", "No se pudo guardar tu perfil.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <Header title="Editar perfil" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <View className="items-center">
          <Pressable
            onPress={pickImage}
            accessibilityRole="button"
            accessibilityLabel="Cambiar foto de perfil"
          >
            <Avatar size="lg" style={{ width: 96, height: 96 }}>
              {avatarSource ? (
                <Avatar.Image source={{ uri: avatarSource }} />
              ) : (
                <Avatar.Fallback>{initials}</Avatar.Fallback>
              )}
            </Avatar>
            <View className="absolute -bottom-1 -right-1 rounded-full bg-blue-600 p-2">
              <Camera size={14} color="#ffffff" />
            </View>
          </Pressable>
          <AppText
            className="mt-1 text-gray-500 dark:text-[#9ca3af]"
            style={{ fontSize: t.caption }}
          >
            Toca para cambiar tu foto
          </AppText>
        </View>

        <View className="gap-3 rounded-3xl border border-border bg-surface p-4">
          <View className="gap-1">
            <AppText
              className="font-semibold text-foreground"
              style={{ fontSize: t.body }}
            >
              Nombre completo
            </AppText>
            <TextInput
              className="h-12 rounded-2xl border border-border bg-background px-4 text-foreground"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: t.body,
              }}
              placeholder="Tu nombre"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View className="gap-1">
            <AppText
              className="font-semibold text-foreground"
              style={{ fontSize: t.body }}
            >
              Teléfono
            </AppText>
            <TextInput
              className="h-12 rounded-2xl border border-border bg-background px-4 text-foreground"
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: t.body,
              }}
              placeholder="809 555 0101"
              placeholderTextColor="#9CA3AF"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View className="gap-1">
            <AppText
              className="font-semibold text-foreground"
              style={{ fontSize: t.body }}
            >
              Correo
            </AppText>
            <AppText
              className="rounded-2xl bg-blue-100 px-4 py-3.5 text-gray-500 dark:bg-[#1b2f4b] dark:text-[#9ca3af]"
              style={{ fontSize: t.body }}
            >
              {email ?? "—"}
            </AppText>
            <AppText
              className="text-gray-500 dark:text-[#9ca3af]"
              style={{ fontSize: t.caption }}
            >
              El correo no se puede cambiar desde aquí
            </AppText>
          </View>
        </View>

        <View className="gap-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            isDisabled={saving}
            onPress={save}
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full"
            onPress={() => router.back()}
          >
            Cancelar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Button } from "heroui-native";
import { Plus, X } from "lucide-react-native";
import Header from "@/components/Header";
import AppText from "@/components/Text";
import Category from "@/components/category/Category";
import { CATEGORIES } from "@/components/category/categories";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { updateProfile } from "@/features/auth/services/auth.service";
import { useTypeScale } from "@/util/responsive";

const MAX_PHOTOS = 10;

export default function BecomeProfessionalScreen() {
  const t = useTypeScale();
  const { raw } = useCurrentUser();
  const metadata = (raw?.user_metadata ?? {}) as Record<string, unknown>;
  const isEdit = typeof metadata.profession === "string";

  const [profession, setProfession] = useState<string>(
    (metadata.profession as string) ?? ""
  );
  const [phone, setPhone] = useState<string>(
    (metadata.phone as string) ?? ""
  );
  const [location, setLocation] = useState<string>(
    (metadata.location as string) ?? ""
  );
  const [bio, setBio] = useState<string>((metadata.bio as string) ?? "");
  const [photos, setPhotos] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const pickPhoto = async () => {
    if (photos.length >= MAX_PHOTOS) {
      return;
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso",
        "Permite el acceso a tus fotos para agregar trabajos."
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhotos((prev) =>
        prev.length >= MAX_PHOTOS || prev.includes(uri)
          ? prev
          : [...prev, uri]
      );
    }
  };

  const save = async () => {
    const digits = phone.replace(/[^\d]/g, "");
    if (!profession) {
      Alert.alert("Aviso", "Elige tu profesión.");
      return;
    }
    if (digits.length < 7) {
      Alert.alert("Aviso", "Escribe un teléfono de contacto válido.");
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        profession,
        phone: digits,
        location: location.trim() || undefined,
        bio: bio.trim() || undefined,
      });
      Alert.alert(
        "Listo",
        isEdit
          ? "Tu perfil profesional se actualizó."
          : "Ya eres profesional. ¡A recibir clientes!",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch {
      Alert.alert("Error", "No se pudo guardar tu perfil profesional.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <Header
        title={isEdit ? "Mi perfil profesional" : "Ser profesional"}
        subtitle="Ofrece tus servicios"
      />
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
      >
        <View className="gap-2">
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.body }}
          >
            Tu profesión
          </AppText>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Category
                key={category.title}
                title={category.title}
                icon={category.icon}
                selected={profession === category.title}
                onPress={() =>
                  setProfession((prev) =>
                    prev === category.title ? "" : category.title
                  )
                }
              />
            ))}
          </View>
        </View>

        <View className="gap-1">
          <AppText
            className="font-semibold text-foreground"
            style={{ fontSize: t.body }}
          >
            Teléfono de contacto
          </AppText>
          <TextInput
            className="h-12 rounded-2xl border border-border bg-surface px-4 text-foreground"
            style={{ fontFamily: "Poppins_400Regular", fontSize: t.body }}
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
            Zona donde trabajas
          </AppText>
          <TextInput
            className="h-12 rounded-2xl border border-border bg-surface px-4 text-foreground"
            style={{ fontFamily: "Poppins_400Regular", fontSize: t.body }}
            placeholder="Santo Domingo Este"
            placeholderTextColor="#9CA3AF"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View className="gap-1">
          <AppText
            className="font-semibold text-foreground"
            style={{ fontSize: t.body }}
          >
            Sobre ti
          </AppText>
          <TextInput
            className="min-h-24 rounded-2xl border border-border bg-surface p-4 text-foreground"
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: t.body,
              textAlignVertical: "top",
            }}
            placeholder="Años de experiencia, especialidades..."
            placeholderTextColor="#9CA3AF"
            multiline
            value={bio}
            onChangeText={setBio}
          />
        </View>

        <View className="gap-2">
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.body }}
          >
            Fotos de tus trabajos ({photos.length}/{MAX_PHOTOS})
          </AppText>
          <View className="flex-row flex-wrap gap-2">
            {photos.map((uri) => (
              <View
                key={uri}
                style={{ width: 100, height: 100 }}
                className="overflow-hidden rounded-2xl"
              >
                <Image
                  source={{ uri }}
                  style={{ width: 100, height: 100 }}
                  contentFit="cover"
                />
                <Pressable
                  onPress={() =>
                    setPhotos((prev) => prev.filter((item) => item !== uri))
                  }
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-1"
                  accessibilityRole="button"
                  accessibilityLabel="Quitar foto"
                >
                  <X size={14} color="#ffffff" />
                </Pressable>
              </View>
            ))}
            {photos.length < MAX_PHOTOS ? (
              <Pressable
                onPress={pickPhoto}
                style={{ width: 100, height: 100 }}
                className="items-center justify-center gap-1 rounded-2xl border border-dashed border-gray-300"
                accessibilityRole="button"
                accessibilityLabel="Agregar foto"
              >
                <Plus size={24} color="#9ca3af" />
                <AppText
                  className="text-gray-500 dark:text-[#9ca3af]"
                  style={{ fontSize: t.caption }}
                >
                  Agregar
                </AppText>
              </Pressable>
            ) : null}
          </View>
        </View>

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          isDisabled={saving}
          onPress={save}
        >
          {saving
            ? "Guardando..."
            : isEdit
              ? "Guardar cambios"
              : "Convertirme en profesional"}
        </Button>
      </ScrollView>
    </View>
  );
}

import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Switch,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Button } from "heroui-native";
import {
  Bell,
  Briefcase,
  Camera,
  Check,
  ChevronRight,
  CircleHelp,
  Info,
  Pencil,
  ShieldCheck,
  Star,
  type LucideIcon,
} from "lucide-react-native";
import AppText from "@/components/Text";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { updateProfile } from "@/features/auth/services/auth.service";
import { useTypeScale } from "@/util/responsive";

interface MenuItem {
  key: string;
  label: string;
  icon: LucideIcon;
  chip: string;
  color: string;
  darkColor: string;
}

const MENU: MenuItem[] = [
  {
    key: "edit",
    label: "Editar perfil",
    icon: Pencil,
    chip: "bg-blue-100 dark:bg-[#1b2f4b]",
    color: "#2563eb",
    darkColor: "#6ea8fe",
  },
  {
    key: "reviews",
    label: "Mis reseñas",
    icon: Star,
    chip: "bg-amber-100 dark:bg-[#3a2f10]",
    color: "#d97706",
    darkColor: "#fbbf24",
  },
  {
    key: "privacy",
    label: "Privacidad",
    icon: ShieldCheck,
    chip: "bg-green-100 dark:bg-[#12332a]",
    color: "#16a34a",
    darkColor: "#34d399",
  },
  {
    key: "help",
    label: "Ayuda",
    icon: CircleHelp,
    chip: "bg-purple-100 dark:bg-[#2e1f4d]",
    color: "#9333ea",
    darkColor: "#c084fc",
  },
  {
    key: "about",
    label: "Acerca de",
    icon: Info,
    chip: "bg-gray-100 dark:bg-white/10",
    color: "#6b7280",
    darkColor: "#9ca3af",
  },
];

const comingSoon = (label: string) =>
  Alert.alert(label, "Esta opción estará disponible próximamente.");

export default function ProfileScreen() {
  const t = useTypeScale();
  const isDark = useColorScheme() === "dark";
  const { signOut } = useAuth();
  const { fullName, username, email, emailVerified, avatarUrl, createdAt, raw } =
    useCurrentUser();

  const [editing, setEditing] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const displayName = fullName ?? username ?? email?.split("@")[0] ?? "Usuario";
  const isProfessional =
    typeof (raw?.user_metadata?.profession as string | undefined) ===
    "string";
  const storedPhone = (raw?.user_metadata?.phone as string | undefined) ?? "";
  const initials =
    displayName
      .split(/[\s._-]+/)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "US";
  const memberSince = createdAt
    ? new Date(createdAt).toLocaleDateString("es", {
        month: "long",
        year: "numeric",
      })
    : null;

  const startEditing = () => {
    setPhotoUri(null);
    setName(fullName ?? username ?? "");
    setHandle(username ?? "");
    setPhone(storedPhone);
    setEditing(true);
  };

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

  const saveProfile = async () => {
    const cleanName = name.trim();
    const cleanHandle = handle.trim();
    const cleanPhone = phone.replace(/[^\d]/g, "");
    if (cleanName.length < 2) {
      Alert.alert("Aviso", "Escribe un nombre de al menos 2 caracteres.");
      return;
    }
    if (cleanHandle && cleanHandle.length < 3) {
      Alert.alert("Aviso", "El usuario debe tener al menos 3 caracteres.");
      return;
    }
    if (phone.trim() && cleanPhone.length < 7) {
      Alert.alert("Aviso", "Escribe un teléfono válido.");
      return;
    }
    setSaving(true);
    try {
      await updateProfile({
        full_name: cleanName,
        username: cleanHandle || undefined,
        phone: cleanPhone || undefined,
      });
      setEditing(false);
    } catch {
      Alert.alert("Error", "No se pudo guardar tu perfil.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert("Cerrar sesión", "¿Seguro que quieres salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: () => signOut().catch(() => {}),
      },
    ]);
  };

  const handleMenu = (key: string) => {
    if (key === "edit") {
      startEditing();
      return;
    }
    if (key === "about") {
      Alert.alert("MimaConnect", "Versión 1.0.0");
      return;
    }
    comingSoon(
      key === "reviews"
        ? "Mis reseñas"
        : key === "privacy"
          ? "Privacidad"
          : "Ayuda"
    );
  };

  const avatarSource = photoUri ?? avatarUrl ?? null;

  return (
    <View className="flex-1 bg-background">
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
        <View className="overflow-hidden rounded-3xl bg-blue-600 dark:bg-[#1e40af]">
          <View className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <View className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-white/10" />
          <View className="items-center gap-1.5 p-6">
            <Avatar
              size="lg"
              style={{ width: 88, height: 88, borderWidth: 3, borderColor: "#ffffff" }}
            >
              {avatarSource ? (
                <Avatar.Image source={{ uri: avatarSource }} />
              ) : (
                <Avatar.Fallback>{initials}</Avatar.Fallback>
              )}
            </Avatar>
            <AppText
              className="font-bold text-white"
              style={{ fontSize: t.sectionTitle }}
            >
              {displayName}
            </AppText>
            {email ? (
              <AppText
                className="text-white/80"
                style={{ fontSize: t.body }}
              >
                {email}
              </AppText>
            ) : null}
            <View className="mt-1 flex-row items-center gap-2">
              <View
                className={
                  emailVerified
                    ? "flex-row items-center gap-1 rounded-full bg-green-500 px-2.5 py-1"
                    : "flex-row items-center gap-1 rounded-full bg-white/20 px-2.5 py-1"
                }
              >
                {emailVerified ? (
                  <Check size={12} color="#ffffff" />
                ) : null}
                <AppText
                  className="font-semibold text-white"
                  style={{ fontSize: t.caption }}
                >
                  {emailVerified ? "Verificado" : "Sin verificar"}
                </AppText>
              </View>
              {memberSince ? (
                <AppText
                  className="text-white/80"
                  style={{ fontSize: t.caption }}
                >
                  Miembro desde {memberSince}
                </AppText>
              ) : null}
            </View>
            {!editing ? (
              <Pressable
                onPress={startEditing}
                className="mt-3 flex-row items-center gap-2 rounded-2xl bg-white px-6 py-3"
                accessibilityRole="button"
                accessibilityLabel="Editar perfil"
              >
                <Pencil size={16} color="#1d4ed8" />
                <AppText
                  className="font-bold text-blue-700"
                  style={{ fontSize: t.body }}
                >
                  Editar perfil
                </AppText>
              </Pressable>
            ) : null}
          </View>
        </View>

        {editing ? (
          <View className="gap-3 rounded-3xl border border-border bg-surface p-4">
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
                Nombre de usuario
              </AppText>
              <TextInput
                className="h-12 rounded-2xl border border-border bg-background px-4 text-foreground"
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: t.body,
                }}
                placeholder="usuario123"
                placeholderTextColor="#9CA3AF"
                value={handle}
                onChangeText={setHandle}
                autoCapitalize="none"
                autoCorrect={false}
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

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              isDisabled={saving}
              onPress={saveProfile}
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full"
              onPress={() => setEditing(false)}
            >
              Cancelar
            </Button>
          </View>
        ) : null}

        <View className="gap-2.5">
          <Pressable
            onPress={() => setNotifications((prev) => !prev)}
            className="flex-row items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5"
            accessibilityRole="button"
          >
            <View className="rounded-xl bg-orange-100 p-2 dark:bg-[#3a2a12]">
              <Bell size={18} color={isDark ? "#fb923c" : "#ea580c"} />
            </View>
            <AppText
              className="flex-1 font-medium text-foreground"
              style={{ fontSize: t.body }}
            >
              Notificaciones
            </AppText>
            <Switch value={notifications} onValueChange={setNotifications} />
          </Pressable>
          {MENU.map((item) => (
            <Pressable
              key={item.key}
              onPress={() => handleMenu(item.key)}
              className="flex-row items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5"
              accessibilityRole="button"
            >
              <View className={`rounded-xl p-2 ${item.chip}`}>
                <item.icon
                  size={18}
                  color={isDark ? item.darkColor : item.color}
                />
              </View>
              <AppText
                className="flex-1 font-medium text-foreground"
                style={{ fontSize: t.body }}
              >
                {item.label}
              </AppText>
              <ChevronRight size={18} color="#9ca3af" />
            </Pressable>
          ))}
          <Pressable
            onPress={() => router.push("/become-professional")}
            className="flex-row items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5"
            accessibilityRole="button"
            accessibilityLabel="Perfil profesional"
          >
            <View className="rounded-xl bg-teal-100 p-2 dark:bg-[#0f2f2c]">
              <Briefcase size={18} color={isDark ? "#2dd4bf" : "#0d9488"} />
            </View>
            <AppText
              className="flex-1 font-medium text-foreground"
              style={{ fontSize: t.body }}
            >
              {isProfessional
                ? "Mi perfil profesional"
                : "Quiero ser profesional"}
            </AppText>
            <ChevronRight size={18} color="#9ca3af" />
          </Pressable>
        </View>

        <Button
          variant="danger"
          size="lg"
          className="w-full"
          onPress={handleSignOut}
        >
          Cerrar sesión
        </Button>
      </ScrollView>
    </View>
  );
}

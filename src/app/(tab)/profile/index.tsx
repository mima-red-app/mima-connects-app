import { Alert, Pressable, ScrollView, Switch, View, useColorScheme } from "react-native";
import { router } from "expo-router";
import { Avatar } from "heroui-native";
import {
  Bell,
  Briefcase,
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
import { useAuth } from "@/features/profile/hooks/useAuth";
import { useCurrentUser } from "@/features/profile/hooks/useCurrentUser";
import { useTypeScale } from "@/util/responsive";
import { useState } from "react";

interface MenuItem {
  key: string;
  label: string;
  icon: LucideIcon;
  chip: string;
  color: string;
  darkColor: string;
  onPress: () => void;
}

const comingSoon = (label: string) =>
  Alert.alert(label, "Esta opción estará disponible próximamente.");

export default function ProfileScreen() {
  const t = useTypeScale();
  const isDark = useColorScheme() === "dark";
  const { signOut } = useAuth();
  const {
    fullName,
    email,
    emailVerified,
    avatarUrl,
    createdAt,
    raw,
  } = useCurrentUser();

  const [notifications, setNotifications] = useState(true);

  const displayName = fullName ?? email?.split("@")[0] ?? "Usuario";
  const isProfessional =
    typeof (raw?.user_metadata?.profession as string | undefined) === "string";
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

  const MENU: MenuItem[] = [
    {
      key: "edit",
      label: "Editar perfil",
      icon: Pencil,
      chip: "bg-blue-100 dark:bg-[#1b2f4b]",
      color: "#2563eb",
      darkColor: "#6ea8fe",
      onPress: () => router.push("/(tab)/profile/edit"),
    },
    {
      key: "reviews",
      label: "Mis reseñas",
      icon: Star,
      chip: "bg-amber-100 dark:bg-[#3a2f10]",
      color: "#d97706",
      darkColor: "#fbbf24",
      onPress: () => router.push("/(tab)/profile/reviews"),
    },
    {
      key: "privacy",
      label: "Privacidad",
      icon: ShieldCheck,
      chip: "bg-green-100 dark:bg-[#12332a]",
      color: "#16a34a",
      darkColor: "#34d399",
      onPress: () => comingSoon("Privacidad"),
    },
    {
      key: "help",
      label: "Ayuda",
      icon: CircleHelp,
      chip: "bg-purple-100 dark:bg-[#2e1f4d]",
      color: "#9333ea",
      darkColor: "#c084fc",
      onPress: () => comingSoon("Ayuda"),
    },
    {
      key: "about",
      label: "Acerca de",
      icon: Info,
      chip: "bg-gray-100 dark:bg-white/10",
      color: "#6b7280",
      darkColor: "#9ca3af",
      onPress: () => Alert.alert("MimaConnect", "Versión 1.0.0"),
    },
  ];

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
      >
        <View className="overflow-hidden rounded-3xl bg-blue-600 dark:bg-[#1e40af]">
          <View className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <View className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-white/10" />
          <View className="items-center gap-1.5 p-6">
            <Avatar
              size="lg"
              style={{ width: 88, height: 88, borderWidth: 3, borderColor: "#ffffff" }}
            >
              {avatarUrl ? (
                <Avatar.Image source={{ uri: avatarUrl }} />
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
              <AppText className="text-white/80" style={{ fontSize: t.body }}>
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
                {emailVerified ? <Check size={12} color="#ffffff" /> : null}
                <AppText
                  className="font-semibold text-white"
                  style={{ fontSize: t.caption }}
                >
                  {emailVerified ? "Verificado" : "Sin verificar"}
                </AppText>
              </View>
              {memberSince ? (
                <AppText className="text-white/80" style={{ fontSize: t.caption }}>
                  Miembro desde {memberSince}
                </AppText>
              ) : null}
            </View>
          </View>
        </View>

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
              onPress={item.onPress}
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

        <Pressable
          onPress={handleSignOut}
          className="items-center rounded-2xl border border-danger/30 bg-danger/10 py-3.5"
          accessibilityRole="button"
          accessibilityLabel="Cerrar sesión"
        >
          <AppText
            className="font-semibold text-danger"
            style={{ fontSize: t.body }}
          >
            Cerrar sesión
          </AppText>
        </Pressable>
      </ScrollView>
    </View>
  );
}

import { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { ChevronRight, Send, Sparkles, X } from "lucide-react-native";
import { useThemeColor } from "heroui-native/hooks";
import AppText from "@/components/Text";
import { PROFESSIONALS } from "@/features/professional/data/professionals";
import { aiReply, matchProfessionals } from "@/features/ai/ai-matcher";
import type { Professional } from "@/features/professional/types/professional-types";
import { useTypeScale } from "@/util/responsive";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
}

interface AiAssistantProps {
  onResults: (matches: Professional[]) => void;
}

export default function AiAssistant({ onResults }: AiAssistantProps) {
  const t = useTypeScale();
  const accent = useThemeColor("accent");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Hola, soy tu asistente. Describe tu problema y te ayudo a encontrar el profesional ideal.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = () => {
    const text = input.trim();
    if (!text || typing) {
      return;
    }
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", text },
    ]);
    setTyping(true);
    setTimeout(() => {
      const found = matchProfessionals(text, PROFESSIONALS);
      onResults(found);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-ai`,
          role: "ai",
          text: aiReply(found),
        },
      ]);
      setTyping(false);
    }, 900);
  };

  if (!open) {
    return (
      <Pressable
        onPress={() => setOpen(true)}
        className="flex-row items-center gap-3 rounded-3xl bg-blue-100 p-4 dark:bg-[#1b2f4b]"
        accessibilityRole="button"
        accessibilityLabel="Abrir asistente IA"
      >
        <View className="rounded-full bg-white p-2.5 dark:bg-white/10">
          <Sparkles size={22} color={accent} />
        </View>
        <View className="flex-1 gap-0.5">
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.body }}
          >
            Describe tu problema
          </AppText>
          <AppText
            className="text-gray-500 dark:text-[#9ca3af]"
            style={{ fontSize: t.caption }}
          >
            La IA encuentra el profesional ideal
          </AppText>
        </View>
        <ChevronRight size={20} color={accent} />
      </Pressable>
    );
  }

  return (
    <View className="gap-3 rounded-3xl border border-border bg-surface p-4">
      <View className="flex-row items-center gap-2">
        <Sparkles size={18} color={accent} />
        <AppText
          className="flex-1 font-bold text-foreground"
          style={{ fontSize: t.body }}
        >
          Asistente IA
        </AppText>
        <Pressable
          onPress={() => setOpen(false)}
          accessibilityRole="button"
          accessibilityLabel="Cerrar asistente"
          hitSlop={10}
        >
          <X size={18} color="#9ca3af" />
        </Pressable>
      </View>

      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        style={{ maxHeight: 280 }}
        contentContainerStyle={{ gap: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((item) => (
          <View
            key={item.id}
            className={
              item.role === "user"
                ? "max-w-[80%] self-end rounded-2xl rounded-br-md bg-blue-600 px-4 py-2.5"
                : "max-w-[80%] self-start rounded-2xl rounded-bl-md bg-blue-100 px-4 py-2.5 dark:bg-[#1b2f4b]"
            }
          >
            <AppText
              className={
                item.role === "user" ? "text-white" : "text-foreground"
              }
              style={{ fontSize: t.body }}
            >
              {item.text}
            </AppText>
          </View>
        ))}
        {typing ? (
          <AppText
            className="text-gray-500 dark:text-[#9ca3af]"
            style={{ fontSize: t.caption }}
          >
            Escribiendo…
          </AppText>
        ) : null}
      </ScrollView>

      <View className="flex-row items-center gap-2">
        <TextInput
          className="h-12 flex-1 rounded-full border border-border bg-background px-4 text-foreground"
          style={{ fontFamily: "Poppins_400Regular", fontSize: t.body }}
          placeholder="Describe tu problema…"
          placeholderTextColor="#9CA3AF"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <Pressable
          onPress={send}
          className="rounded-full bg-blue-600 p-3"
          accessibilityRole="button"
          accessibilityLabel="Enviar mensaje"
        >
          <Send size={18} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}

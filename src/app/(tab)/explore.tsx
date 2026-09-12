import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, TextInput, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { MapPin, Search, X } from "lucide-react-native";
import AppText from "@/components/Text";
import Category from "@/components/category/Category";
import { CATEGORIES } from "@/components/category/categories";
import AiAssistant from "@/features/ai/components/AiAssistant";
import ProfessionalRowCard from "@/features/professional/components/ProfessionalRowCard";
import { PROFESSIONALS } from "@/features/professional/data/professionals";
import type { Professional } from "@/features/professional/types/professional-types";
import { filterProfessionals } from "@/util/search";
import { useTypeScale } from "@/util/responsive";

export default function ExploreScreen() {
  const t = useTypeScale();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [query, setQuery] = useState(category ?? "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    CATEGORIES.find((item) => item.query === category)?.title ?? null
  );
  const [aiMatches, setAiMatches] = useState<Professional[] | null>(null);

  useEffect(() => {
    if (category) {
      setQuery(category);
      setSelectedCategory(
        CATEGORIES.find((item) => item.query === category)?.title ?? null
      );
    } else {
      setQuery("");
      setSelectedCategory(null);
    }
    setAiMatches(null);
  }, [category]);
  const results = useMemo(
    () => aiMatches ?? filterProfessionals(PROFESSIONALS, query),
    [aiMatches, query]
  );

  const handleCategoryPress = (title: string, categoryQuery: string) => {
    if (selectedCategory === title) {
      setSelectedCategory(null);
      setQuery("");
    } else {
      setSelectedCategory(title);
      setQuery(categoryQuery);
    }
    setAiMatches(null);
  };

  const handleQueryChange = (text: string) => {
    setQuery(text);
    setSelectedCategory(null);
    setAiMatches(null);
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
      >
        <View className="flex-row items-center gap-2 rounded-full border border-border bg-surface px-4">
          <Search size={18} color="#9ca3af" />
          <TextInput
            className="h-12 flex-1 text-foreground"
            style={{ fontFamily: "Poppins_400Regular", fontSize: t.body }}
            placeholder="Buscar por nombre, servicio..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={handleQueryChange}
            returnKeyType="search"
          />
        </View>

        <AiAssistant onResults={setAiMatches} />

        <View className="gap-2">
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.sectionTitle }}
          >
            Categorías
          </AppText>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingRight: 16 }}
            renderItem={({ item }) => (
              <Category
                title={item.title}
                icon={item.icon}
                selected={selectedCategory === item.title}
                onPress={() => handleCategoryPress(item.title, item.query)}
              />
            )}
          />
        </View>

        <View className="gap-2">
          <View className="flex-row items-center justify-between">
            <AppText
              className="font-bold text-foreground"
              style={{ fontSize: t.sectionTitle }}
            >
              {aiMatches
                ? `Sugeridos por la IA (${aiMatches.length})`
                : query
                  ? `Resultados (${results.length})`
                  : "Cerca de ti"}
            </AppText>
            {aiMatches ? (
              <Pressable
                onPress={() => setAiMatches(null)}
                accessibilityRole="button"
                accessibilityLabel="Limpiar sugerencias"
                hitSlop={10}
              >
                <X size={18} color="#9ca3af" />
              </Pressable>
            ) : null}
          </View>
          {!query ? (
            <View className="flex-row items-center gap-1.5">
              <MapPin size={14} color="#9ca3af" />
              <AppText
                className="text-gray-500 dark:text-[#9ca3af]"
                style={{ fontSize: t.caption }}
              >
                Santo Domingo Este
              </AppText>
            </View>
          ) : null}
          {results.length === 0 ? (
            <AppText
              className="py-6 text-center text-gray-500 dark:text-[#9ca3af]"
              style={{ fontSize: t.body }}
            >
              Sin resultados para &quot;{query}&quot;
            </AppText>
          ) : (
            <View className="gap-2.5">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={{
                    pathname: "/professional/[id]",
                    params: { id: item.id },
                  }}
                >
                  <ProfessionalRowCard professional={item} />
                </Link>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

import { useState } from "react";
import { Alert, Linking, Pressable, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Avatar, Button } from "heroui-native";
import { MapPin, MessageCircle, Phone, Star, Users } from "lucide-react-native";
import { useThemeColor } from "heroui-native/hooks";
import Header from "@/components/Header";
import AppText from "@/components/Text";
import ImageCarousel from "@/components/ImageCarousel";
import ProfileReviewList from "@/features/professional/components/ProfileReviewList";
import ReviewForm from "@/features/professional/components/ReviewForm";
import { PROFESSIONALS } from "@/features/professional/data/professionals";
import { PROFILE_REVIEWS } from "@/features/professional/data/profile-reviews";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useTypeScale } from "@/util/responsive";
import type { ProfileReview } from "@/features/professional/types/review-types";

export default function ProfessionalProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const t = useTypeScale();
  const accent = useThemeColor("accent");
  const { username, email } = useCurrentUser();
  const professional = PROFESSIONALS.find((p) => p.id === id);

  const [reviews, setReviews] = useState<ProfileReview[]>(() =>
    PROFILE_REVIEWS.filter((review) => review.professionalId === id)
  );
  const [editing, setEditing] = useState(false);

  const displayName = username ?? email?.split("@")[0] ?? "Tú";
  const myReview = reviews.find((review) => review.isMine);
  const otherReviews = reviews.filter((review) => !review.isMine);

  if (!professional) {
    return (
      <View className="flex-1 bg-background">
        <Header title="Perfil" />
        <View className="flex-1 items-center justify-center gap-4 px-8">
          <AppText
            className="text-center font-semibold"
            style={{ fontSize: t.title }}
          >
            Profesional no encontrado
          </AppText>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onPress={() => router.back()}
          >
            Volver
          </Button>
        </View>
      </View>
    );
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola ${professional.name}, te contacto desde MimaConnect por tus servicios.`
    );
    Linking.openURL(`https://wa.me/${professional.phone}?text=${message}`).catch(
      () => Alert.alert("Aviso", "No se pudo abrir WhatsApp.")
    );
  };

  const callProfessional = () => {
    Linking.openURL(`tel:+${professional.phone}`).catch(() =>
      Alert.alert("Aviso", "No se pudo iniciar la llamada.")
    );
  };

  const initialsOf = (name: string) =>
    name
      .split(/[\s._-]+/)
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "TU";

  const handleSubmitReview = (rating: number, comment: string) => {
    if (editing && myReview) {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === myReview.id
            ? {
                ...review,
                rating,
                comment,
                createdAt: new Date().toISOString(),
              }
            : review
        )
      );
      setEditing(false);
    } else {
      const mine: ProfileReview = {
        id: `mine-${professional.id}-${Date.now()}`,
        professionalId: professional.id,
        reviewerName: displayName,
        reviewerInitials: initialsOf(displayName),
        rating,
        comment,
        createdAt: new Date().toISOString(),
        isMine: true,
      };
      setReviews((prev) => [mine, ...prev]);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <Header title="Perfil profesional" />
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
        <View className="items-center gap-1">
          <Avatar size="lg" style={{ width: 96, height: 96 }}>
            <Avatar.Fallback>{professional.initials}</Avatar.Fallback>
          </Avatar>
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.sectionTitle }}
          >
            {professional.name}
          </AppText>
          <AppText
            className="text-blue-600 dark:text-[#6ea8fe]"
            style={{ fontSize: t.body }}
          >
            {professional.profession}
          </AppText>
          <View className="flex-row items-center gap-1.5">
            <MapPin size={16} color="#9ca3af" />
            <AppText
              className="text-gray-500 dark:text-[#9ca3af]"
              style={{ fontSize: t.body }}
            >
              {professional.location}
            </AppText>
          </View>
        </View>

        <View className="flex-row items-center justify-around rounded-3xl bg-blue-100 px-4 py-4 dark:bg-[#1b2f4b]">
          <View className="items-center gap-0.5">
            <View className="flex-row items-center gap-1">
              <Star size={16} color="#f5a524" fill="#f5a524" />
              <AppText
                className="font-bold text-foreground"
                style={{ fontSize: t.title }}
              >
                {professional.rating.toFixed(1)}
              </AppText>
            </View>
            <AppText
              className="text-gray-500 dark:text-[#9ca3af]"
              style={{ fontSize: t.caption }}
            >
              Valoración
            </AppText>
          </View>
          <View className="items-center gap-0.5">
            <View className="flex-row items-center gap-1">
              <Users size={16} color="#1d4ed8" />
              <AppText
                className="font-bold text-foreground"
                style={{ fontSize: t.title }}
              >
                {professional.recommendations}
              </AppText>
            </View>
            <AppText
              className="text-gray-500 dark:text-[#9ca3af]"
              style={{ fontSize: t.caption }}
            >
              Recomendaciones
            </AppText>
          </View>
          <View className="items-center gap-0.5">
            <AppText
              className="font-bold text-foreground"
              style={{ fontSize: t.title }}
            >
              {professional.reviewsCount}
            </AppText>
            <AppText
              className="text-gray-500 dark:text-[#9ca3af]"
              style={{ fontSize: t.caption }}
            >
              Reseñas
            </AppText>
          </View>
        </View>

        <View className="flex-row gap-3">
          <Pressable
            onPress={openWhatsApp}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-[#25D366] p-4"
            accessibilityRole="button"
            accessibilityLabel="Contactar por WhatsApp"
          >
            <MessageCircle size={20} color="#ffffff" />
            <AppText
              className="font-bold text-white"
              style={{ fontSize: t.body }}
            >
              WhatsApp
            </AppText>
          </Pressable>
          <Pressable
            onPress={callProfessional}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-border bg-surface p-4"
            accessibilityRole="button"
            accessibilityLabel="Llamar al profesional"
          >
            <Phone size={20} color={accent} />
            <AppText
              className="font-bold text-foreground"
              style={{ fontSize: t.body }}
            >
              Llamar
            </AppText>
          </Pressable>
        </View>

        {professional.portfolio.length > 0 ? (
          <View className="gap-2">
            <AppText
              className="font-bold text-foreground"
              style={{ fontSize: t.sectionTitle }}
            >
              Trabajos realizados
            </AppText>
            <ImageCarousel images={professional.portfolio} max={10} />
          </View>
        ) : null}

        {myReview && !editing ? (
          <View className="gap-2">
            <AppText
              className="font-bold text-foreground"
              style={{ fontSize: t.sectionTitle }}
            >
              Tu reseña
            </AppText>
            <ProfileReviewList reviews={[myReview]} />
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onPress={() => setEditing(true)}
            >
              Editar reseña
            </Button>
          </View>
        ) : (
          <View className="gap-2">
            <AppText
              className="font-bold text-foreground"
              style={{ fontSize: t.sectionTitle }}
            >
              {editing ? "Editar tu reseña" : "Deja tu reseña"}
            </AppText>
            <ReviewForm
              key={editing ? myReview?.id : "new"}
              initialRating={editing ? myReview?.rating : 0}
              initialComment={editing ? myReview?.comment : ""}
              submitLabel={editing ? "Guardar cambios" : "Publicar reseña"}
              onSubmit={handleSubmitReview}
              onCancel={editing ? () => setEditing(false) : undefined}
            />
          </View>
        )}

        <View className="gap-2">
          <AppText
            className="font-bold text-foreground"
            style={{ fontSize: t.sectionTitle }}
          >
            Reseñas
          </AppText>
          <ProfileReviewList reviews={otherReviews} />
        </View>
      </ScrollView>
    </View>
  );
}

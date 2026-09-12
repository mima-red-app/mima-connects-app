import { View } from "react-native";
import ProfileReviewCard from "./ProfileReviewCard";
import type { ProfileReview } from "@/features/professional/types/review-types";
import { daysAgoIso } from "@/util/time-ago";

const PROFILE_REVIEWS: ProfileReview[] = [
  {
    id: "1",
    professionalId: "1",
    reviewerName: "Pedro García",
    reviewerInitials: "PG",
    rating: 5.0,
    comment:
      "Excelente trabajo, muy puntual y profesional. Llegó a la hora acordada, trajo todos sus materiales y dejó todo funcionando perfectamente. Recomendado al cien por ciento.",
    createdAt: daysAgoIso(3),
  },
  {
    id: "2",
    professionalId: "1",
    reviewerName: "Ana Martínez",
    reviewerInitials: "AM",
    rating: 4.5,
    comment: "Buen servicio, resolvió el problema el mismo día.",
    createdAt: daysAgoIso(21),
  },
  {
    id: "3",
    professionalId: "2",
    reviewerName: "Carlos Pérez",
    reviewerInitials: "CP",
    rating: 5.0,
    comment: "Muy responsable y dejó todo limpio al terminar.",
    createdAt: daysAgoIso(65),
  },
];

interface ProfileReviewListProps {
  professionalId: string;
}

export default function ProfileReviewList({
  professionalId,
}: ProfileReviewListProps) {
  const reviews = PROFILE_REVIEWS.filter(
    (review) => review.professionalId === professionalId
  );

  return (
    <View className="gap-4">
      {reviews.map((review) => (
        <ProfileReviewCard key={review.id} review={review} />
      ))}
    </View>
  );
}

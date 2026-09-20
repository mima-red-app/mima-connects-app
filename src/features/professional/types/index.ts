import type {
  User,
  ProfessionalProfile,
  PortfolioItem,
  Review,
} from "@/types/models";

export interface ProfessionalUI {
  id: string;
  name: string;
  initials: string;
  profession: string;
  description: string;
  rating: number;
  reviewsCount: number;
  location: string;
  phone: string;
  whatsapp: string;
  portfolio: string[];
}

export interface ReviewUI {
  id: string;
  professionalId: string;
  reviewerName: string;
  reviewerInitials: string;
  rating: number;
  comment: string;
  createdAt: string;
  isMine: boolean;
}

export interface ProfessionalDetail {
  professional: ProfessionalUI;
  reviews: ReviewUI[];
}

export interface RecommendationUI {
  id: string;
  name: string;
  initials: string;
  profession: string;
  rating: number;
  recommender: string;
  recommenderInitials: string;
  comment: string;
}

export function toInitials(firstName: string, lastName: string): string {
  return (
    (firstName?.charAt(0) ?? "") + (lastName?.charAt(0) ?? "")
  ).toUpperCase();
}

export function toProfessionalUI(
  profile: ProfessionalProfile,
  user: User,
  reviews: Review[],
  portfolio: PortfolioItem[]
): ProfessionalUI {
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
  return {
    id: String(profile.id),
    name: profile.professional_name,
    initials: toInitials(user.first_name, user.last_name),
    profession: profile.professional_name,
    description: profile.description ?? "",
    rating: Math.round(avgRating * 10) / 10,
    reviewsCount: reviews.length,
    location: profile.location ?? "",
    phone: user.phone ?? "",
    whatsapp: profile.whatsapp ?? user.phone ?? "",
    portfolio: portfolio.map((p) => p.image_url),
  };
}

export function toReviewUI(
  review: Review,
  user: User | null,
  currentUserId: number | null
): ReviewUI {
  const firstName = user?.first_name ?? "Usuario";
  const lastName = user?.last_name ?? "";
  return {
    id: String(review.id),
    professionalId: String(review.professional_id),
    reviewerName: `${firstName} ${lastName}`.trim(),
    reviewerInitials: toInitials(firstName, lastName),
    rating: review.rating,
    comment: review.comment ?? "",
    createdAt: review.created_at,
    isMine: currentUserId != null && review.user_id === currentUserId,
  };
}

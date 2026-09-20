import type { ProfessionalProfile, User } from "@/types/models";
import type { ProfessionalUI, ReviewUI, ProfessionalDetail, RecommendationUI } from "../types";
import { toProfessionalUI, toReviewUI } from "../types";
import {
  getProfessionalProfiles,
  getProfessionalProfileById,
} from "./professional.service";
import { getReviews } from "./review.service";
import { getPortfolioByProfessional } from "./portfolio.service";
import { getRecommendations } from "./recommendation.service";
import {
  getUserById,
  getUsers,
} from "@/services/user.service";

function fallbackUser(profile: ProfessionalProfile): User {
  return {
    id: profile.user_id,
    first_name: profile.professional_name.split(" ")[0] ?? "",
    last_name: profile.professional_name.split(" ").slice(1).join(" ") ?? "",
    email: "",
    phone: null,
    allow_contact: true,
    status: "Active",
    created_at: "",
    updated_at: "",
  };
}

export async function fetchProfessionalsUI(): Promise<ProfessionalUI[]> {
  const profiles = await getProfessionalProfiles("Active");
  const allReviews = await getReviews();

  return Promise.all(
    profiles.map(async (profile) => {
      const [user, profileReviews, portfolio] = await Promise.all([
        getUserById(profile.user_id).catch(() => null),
        Promise.resolve(
          allReviews.filter((r) => r.professional_id === profile.id)
        ),
        getPortfolioByProfessional(profile.id).catch(() => []),
      ]);
      return toProfessionalUI(
        profile,
        user ?? fallbackUser(profile),
        profileReviews,
        portfolio
      );
    })
  );
}

export async function fetchProfessionalDetailUI(
  id: number
): Promise<ProfessionalDetail> {
  const [profile, allReviews, portfolio] = await Promise.all([
    getProfessionalProfileById(id),
    getReviews(),
    getPortfolioByProfessional(id).catch(() => []),
  ]);

  const user = await getUserById(profile.user_id).catch(() => null);
  const profileReviews = allReviews.filter((r) => r.professional_id === id);

  const reviewerIds = [...new Set(profileReviews.map((r) => r.user_id))];
  const reviewerMap = new Map<number, User>();
  await Promise.all(
    reviewerIds.map(async (uid) => {
      const u = await getUserById(uid).catch(() => null);
      if (u) reviewerMap.set(uid, u);
    })
  );

  return {
    professional: toProfessionalUI(
      profile,
      user ?? fallbackUser(profile),
      profileReviews,
      portfolio
    ),
    reviews: profileReviews.map((r) => {
      const reviewer = reviewerMap.get(r.user_id) ?? null;
      return toReviewUI(r, reviewer, null);
    }),
  };
}

export async function fetchRecommendationsUI(): Promise<RecommendationUI[]> {
  const recs = await getRecommendations();

  return Promise.all(
    recs.slice(0, 10).map(async (rec) => {
      const [profile, user] = await Promise.all([
        getProfessionalProfileById(rec.professional_id).catch(() => null),
        getUserById(rec.user_id).catch(() => null),
      ]);
      return {
        id: String(rec.id),
        name: profile?.professional_name ?? "Profesional",
        initials: profile
          ? profile.professional_name
              .split(" ")
              .map((w) => w.charAt(0))
              .join("")
              .slice(0, 2)
              .toUpperCase()
          : "PR",
        profession: profile?.professional_name ?? "",
        rating: rec.rating,
        recommender: user
          ? `${user.first_name} ${user.last_name}`.trim()
          : "Usuario",
        recommenderInitials: user
          ? (user.first_name.charAt(0) + user.last_name.charAt(0)).toUpperCase()
          : "US",
        comment: rec.comment ?? "",
      };
    })
  );
}

export async function fetchMyReviewsUI(
  userEmail: string
): Promise<ReviewUI[]> {
  const [allUsers, allProfiles, allReviews] = await Promise.all([
    getUsers(),
    getProfessionalProfiles(),
    getReviews(),
  ]);

  const me = allUsers.find((u) => u.email === userEmail);
  if (!me) return [];

  const myProfile = allProfiles.find((p) => p.user_id === me.id);
  if (!myProfile) return [];

  const myReviews = allReviews.filter(
    (r) => r.professional_id === myProfile.id
  );

  const reviewerIds = [...new Set(myReviews.map((r) => r.user_id))];
  const reviewerMap = new Map<number, User>();
  await Promise.all(
    reviewerIds.map(async (uid) => {
      const u = await getUserById(uid).catch(() => null);
      if (u) reviewerMap.set(uid, u);
    })
  );

  return myReviews.map((r) => {
    const reviewer = reviewerMap.get(r.user_id) ?? null;
    return toReviewUI(r, reviewer, me.id);
  });
}

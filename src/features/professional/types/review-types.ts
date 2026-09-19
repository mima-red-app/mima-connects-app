export interface ProfileReview {
  id: string;
  professionalId: string;
  reviewerName: string;
  reviewerInitials: string;
  rating: number;
  comment: string;
  createdAt: string;
  isMine?: boolean;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  allow_contact: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ProfessionalProfile {
  id: number;
  user_id: number;
  professional_name: string;
  description: string | null;
  location: string | null;
  whatsapp: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string | null;
  status: string;
  created_at: string;
}

export interface Service {
  id: number;
  name: string;
  description: string | null;
  status: string;
  created_at: string;
}

export interface PortfolioItem {
  id: number;
  professional_id: number;
  image_url: string;
  description: string | null;
  created_at: string;
}

export interface Review {
  id: number;
  professional_id: number;
  user_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Recommendation {
  id: number;
  professional_id: number;
  user_id: number;
  service_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Report {
  id: number;
  reporter_id: number;
  target_id: number;
  reason: string;
  description: string | null;
  status: string;
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  allow_contact?: boolean;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email?: string;
    user_metadata?: Record<string, unknown>;
  };
}

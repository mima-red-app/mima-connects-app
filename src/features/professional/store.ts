import { create } from "zustand";

interface ProfessionalFormFields {
  profession: string;
  phone: string;
  location: string;
  bio: string;
  photos: string[];
}

interface ProfessionalFormStore extends ProfessionalFormFields {
  setFormField: <K extends keyof ProfessionalFormFields>(
    key: K,
    value: ProfessionalFormFields[K]
  ) => void;
  addPhoto: (uri: string) => void;
  removePhoto: (uri: string) => void;
  resetForm: () => void;
}

const INITIAL: ProfessionalFormFields = {
  profession: "",
  phone: "",
  location: "",
  bio: "",
  photos: [],
};

export const useProfessionalForm = create<ProfessionalFormStore>((set) => ({
  ...INITIAL,
  setFormField: (key, value) => set({ [key]: value }),
  addPhoto: (uri) =>
    set((s) =>
      s.photos.length >= 10 || s.photos.includes(uri)
        ? s
        : { photos: [...s.photos, uri] }
    ),
  removePhoto: (uri) =>
    set((s) => ({ photos: s.photos.filter((p) => p !== uri) })),
  resetForm: () => set(INITIAL),
}));

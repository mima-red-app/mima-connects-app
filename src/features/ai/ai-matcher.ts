import type { Professional } from "@/features/professional/types/professional-types";
import { normalizeText } from "@/util/search";

const PROFESSION_KEYWORDS: { profession: string; words: string[] }[] = [
  {
    profession: "Electricista",
    words: [
      "luz",
      "electricidad",
      "electrico",
      "enchufe",
      "apagon",
      "breaker",
      "cable",
      "bombillo",
      "lampara",
      "corriente",
    ],
  },
  {
    profession: "Plomera",
    words: [
      "agua",
      "plomer",
      "tuberia",
      "fuga",
      "grifo",
      "bano",
      "inodoro",
      "drenaje",
      "caneria",
      "tinaco",
    ],
  },
  {
    profession: "Técnico en Aire",
    words: ["aire", "clima", "acondicionado", "frio", "abanico", "refrigeracion"],
  },
  {
    profession: "Pintora",
    words: ["pintura", "pintar", "pared", "color", "rodillo", "techo"],
  },
  {
    profession: "Carpintero",
    words: ["madera", "puerta", "mueble", "carpinter", "closet", "gabinete"],
  },
  {
    profession: "Especialista en Limpieza",
    words: ["limpieza", "limpiar", "sucio", "polvo", "hogar", "casa", "oficina"],
  },
  {
    profession: "Mecánico",
    words: ["carro", "auto", "vehiculo", "motor", "mecanico", "freno", "goma", "aceite"],
  },
  {
    profession: "Técnica en Celulares",
    words: ["celular", "telefono", "pantalla", "movil", "bateria", "carga"],
  },
];

export function matchProfessionals(
  text: string,
  list: Professional[]
): Professional[] {
  const normalized = normalizeText(text);
  const professions = PROFESSION_KEYWORDS.filter((entry) =>
    entry.words.some((word) => normalized.includes(word))
  ).map((entry) => entry.profession);

  if (professions.length === 0) {
    return [];
  }
  return list.filter((professional) =>
    professions.includes(professional.profession)
  );
}

export function aiReply(matches: Professional[]): string {
  if (matches.length === 0) {
    return "No encontré un servicio relacionado con eso. Prueba describiendo palabras como: luz, agua, pintura, aire, puerta, carro o celular.";
  }
  const names = matches
    .map((match) => `${match.name} (${match.profession})`)
    .join(", ");
  return `Encontré ${matches.length} ${
    matches.length === 1 ? "profesional que puede" : "profesionales que pueden"
  } ayudarte: ${names}.`;
}

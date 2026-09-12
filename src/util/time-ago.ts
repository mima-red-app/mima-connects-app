export function timeAgo(isoDate: string): string {
  const date = new Date(isoDate).getTime();
  const now = Date.now();
  const diffMs = now - date;

  if (Number.isNaN(date) || diffMs < 0) {
    return "ahora mismo";
  }

  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) {
    return "ahora mismo";
  }
  if (minutes < 60) {
    return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `hace ${days} ${days === 1 ? "día" : "días"}`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 5) {
    return `hace ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
  }

  const years = Math.floor(days / 365);
  return `hace ${years} ${years === 1 ? "año" : "años"}`;
}

export function daysAgoIso(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

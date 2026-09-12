import { View } from "react-native";
import Review from "./Review";

const REVIEWS = [
  {
    id: "1",
    name: "José Rodríguez",
    initials: "JR",
    profession: "Electricista",
    rating: 5,
    recommender: "Pedro García",
    recommenderInitials: "PG",
    comment: "Excelente trabajo, muy puntual y profesional. Recomendado.",
  },
  {
    id: "2",
    name: "María López",
    initials: "ML",
    profession: "Plomera",
    rating: 5,
    recommender: "Ana Martínez",
    recommenderInitials: "AM",
    comment: "Muy buen servicio, llegó a tiempo y dejó todo impecable.",
  },
];

const ReviewList = () => {
  return (
    <View className="gap-3">
      {REVIEWS.map((review) => (
        <Review key={review.id} {...review} />
      ))}
    </View>
  );
};

export default ReviewList;

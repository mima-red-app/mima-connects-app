import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Button } from "heroui-native";
import { Star } from "lucide-react-native";
import AppText from "@/components/Text";
import { useTypeScale } from "@/util/responsive";

interface ReviewFormProps {
  initialRating?: number;
  initialComment?: string;
  submitLabel: string;
  onSubmit: (rating: number, comment: string) => void;
  onCancel?: () => void;
}

export default function ReviewForm({
  initialRating = 0,
  initialComment = "",
  submitLabel,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const t = useTypeScale();
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);
  const isValid = rating >= 1 && comment.trim().length >= 2;

  return (
    <View className="gap-3 rounded-3xl border border-border bg-surface p-4">
      <AppText
        className="font-semibold text-foreground"
        style={{ fontSize: t.body }}
      >
        Tu valoración
      </AppText>
      <View className="flex-row gap-1.5">
        {[1, 2, 3, 4, 5].map((value) => (
          <Pressable
            key={value}
            onPress={() => setRating(value)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`${value} ${value === 1 ? "estrella" : "estrellas"}`}
          >
            <Star
              size={30}
              color={value <= rating ? "#f5a524" : "#d1d5db"}
              fill={value <= rating ? "#f5a524" : "#d1d5db"}
            />
          </Pressable>
        ))}
      </View>
      <TextInput
        className="min-h-24 rounded-2xl border border-border bg-background p-4 text-foreground"
        style={{
          fontFamily: "Poppins_400Regular",
          fontSize: t.body,
          textAlignVertical: "top",
        }}
        placeholder="Cuenta tu experiencia..."
        placeholderTextColor="#9CA3AF"
        multiline
        value={comment}
        onChangeText={setComment}
      />
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        isDisabled={!isValid}
        onPress={() => onSubmit(rating, comment.trim())}
      >
        {submitLabel}
      </Button>
      {onCancel ? (
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onPress={onCancel}
        >
          Cancelar
        </Button>
      ) : null}
    </View>
  );
}

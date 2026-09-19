import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { X } from "lucide-react-native";
import AppText from "@/components/Text";
import { useTypeScale } from "@/util/responsive";

const MAX_IMAGES = 10;
const THUMB_SIZE = 120;
const THUMB_GAP = 10;

interface ImageCarouselProps {
  images: string[];
  max?: number;
}

export default function ImageCarousel({
  images,
  max = MAX_IMAGES,
}: ImageCarouselProps) {
  const t = useTypeScale();
  const { width } = useWindowDimensions();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const visible = images.slice(0, max);

  if (visible.length === 0) {
    return null;
  }

  const openViewer = (index: number) => {
    setPage(index);
    setViewerIndex(index);
  };

  return (
    <>
      <FlatList
        data={visible}
        keyExtractor={(uri) => uri}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={THUMB_SIZE + THUMB_GAP}
        decelerationRate="fast"
        contentContainerStyle={{ gap: THUMB_GAP, paddingRight: 16 }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => openViewer(index)}
            accessibilityRole="button"
            accessibilityLabel={`Ver imagen ${index + 1}`}
          >
            <Image
              source={{ uri: item }}
              style={{ width: THUMB_SIZE, height: THUMB_SIZE, borderRadius: 16 }}
              contentFit="cover"
            />
          </Pressable>
        )}
      />

      <Modal
        visible={viewerIndex !== null}
        animationType="fade"
        onRequestClose={() => setViewerIndex(null)}
      >
        <View className="flex-1 bg-black">
          <View className="flex-row items-center justify-between px-4 pb-2 pt-12">
            <Pressable
              onPress={() => setViewerIndex(null)}
              accessibilityRole="button"
              accessibilityLabel="Cerrar visor"
              hitSlop={10}
              className="rounded-full bg-white/10 p-2"
            >
              <X size={22} color="#ffffff" />
            </Pressable>
            <AppText
              className="font-semibold text-white"
              style={{ fontSize: t.body }}
            >
              {page + 1} / {visible.length}
            </AppText>
            <View style={{ width: 38 }} />
          </View>
          <FlatList
            data={visible}
            keyExtractor={(uri) => uri}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={viewerIndex ?? 0}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onMomentumScrollEnd={(event) => {
              const next = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setPage(next);
            }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width, flex: 1 }}
                contentFit="contain"
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
}

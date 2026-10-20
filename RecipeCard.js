
import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

export default function RecipeCard({
  recipe,
  isFavorite,
  onPress,
  onToggleFavorite,
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: recipe.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <Pressable
          style={styles.heartButton}
          onPress={onToggleFavorite}
          hitSlop={8}
        >
          <Text style={styles.heart}>
            {isFavorite ? "❤️" : "🤍"}
          </Text>
        </Pressable>

        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>⏱ {recipe.time}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.category}>{recipe.category}</Text>
        <Text style={styles.name}>{recipe.name}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {recipe.description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.difficulty}>
            ● {recipe.difficulty}
          </Text>
          <Text style={styles.viewText}>View recipe →</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ECEBE3",
  },
  imageContainer: {
    height: 190,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E9EBDD",
  },
  heartButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 39,
    height: 39,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  heart: {
    fontSize: 19,
  },
  timeBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 9,
  },
  timeText: {
    color: "#315B3E",
    fontWeight: "700",
    fontSize: 11,
  },
  content: {
    padding: 16,
  },
  category: {
    color: "#7C8D63",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  name: {
    color: "#254731",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 7,
  },
  description: {
    color: "#777D70",
    fontSize: 12,
    lineHeight: 19,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 17,
  },
  difficulty: {
    color: "#728366",
    fontSize: 11,
    fontWeight: "600",
  },
  viewText: {
    color: "#315B3E",
    fontWeight: "800",
    fontSize: 12,
  },
});


import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

export default function RecipeDetails({
  recipe,
  isFavorite,
  onToggleFavorite,
  onBack,
}) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Back to recipes</Text>
      </Pressable>

      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.titleRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.category}>{recipe.category}</Text>
          <Text style={styles.title}>{recipe.name}</Text>
        </View>

        <Pressable onPress={onToggleFavorite} style={styles.heartButton}>
          <Text style={styles.heart}>
            {isFavorite ? "❤️" : "🤍"}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.description}>{recipe.description}</Text>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoEmoji}>⏱</Text>
          <Text style={styles.infoLabel}>COOKING TIME</Text>
          <Text style={styles.infoValue}>{recipe.time}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoEmoji}>◈</Text>
          <Text style={styles.infoLabel}>DIFFICULTY</Text>
          <Text style={styles.infoValue}>{recipe.difficulty}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      <Text style={styles.subtitle}>
        Everything you need to prepare this dish.
      </Text>

      {recipe.ingredients.map((ingredient, index) => (
        <View
          style={styles.ingredientRow}
          key={`${index}-${ingredient}`}
        >
          <Text style={styles.check}>✓</Text>
          <Text style={styles.ingredient}>{ingredient}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Preparation Steps</Text>
      <Text style={styles.subtitle}>
        Follow these steps to make your dish.
      </Text>

      {recipe.steps.map((step, index) => (
        <View style={styles.stepRow} key={`${index}-${step}`}>
          <View style={styles.numberCircle}>
            <Text style={styles.number}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}

      <Pressable onPress={onBack} style={styles.button}>
        <Text style={styles.buttonText}>Explore more recipes →</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7F1",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 12,
    marginBottom: 10,
  },
  backText: {
    color: "#315B3E",
    fontWeight: "700",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 245,
    borderRadius: 20,
    backgroundColor: "#E9EBDD",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    gap: 10,
  },
  titleContainer: {
    flex: 1,
  },
  category: {
    color: "#71845D",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  title: {
    color: "#254731",
    fontSize: 28,
    fontWeight: "800",
  },
  heartButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
  },
  heart: {
    fontSize: 24,
  },
  description: {
    color: "#777D70",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 23,
    marginBottom: 28,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#E9EBDD",
    borderRadius: 15,
    padding: 15,
  },
  infoEmoji: {
    fontSize: 22,
    marginBottom: 10,
  },
  infoLabel: {
    color: "#75806A",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.7,
  },
  infoValue: {
    color: "#254731",
    fontWeight: "800",
    fontSize: 15,
    marginTop: 6,
  },
  sectionTitle: {
    color: "#254731",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 14,
  },
  subtitle: {
    color: "#85897D",
    fontSize: 12,
    marginTop: 6,
    marginBottom: 15,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E7DF",
  },
  check: {
    color: "#4F7A4E",
    fontWeight: "800",
    fontSize: 17,
    marginRight: 12,
  },
  ingredient: {
    color: "#475345",
    fontSize: 14,
    flex: 1,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 17,
    gap: 12,
  },
  numberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#315B3E",
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  stepText: {
    flex: 1,
    color: "#475345",
    fontSize: 14,
    lineHeight: 22,
    paddingTop: 4,
  },
  button: {
    backgroundColor: "#315B3E",
    borderRadius: 13,
    padding: 16,
    alignItems: "center",
    marginTop: 18,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});

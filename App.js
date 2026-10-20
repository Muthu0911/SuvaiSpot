
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { recipes as initialRecipes, categories } from "./recipes";
import RecipeCard from "./RecipeCard";
import RecipeDetails from "./RecipeDetails";

export default function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [screen, setScreen] = useState("home");
  const [showFavorites, setShowFavorites] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("20 min");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [newCategory, setNewCategory] = useState("Breakfast");

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.join(" ").toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || recipe.category === category;

    const matchesFavorites =
      !showFavorites || favorites.includes(recipe.id);

    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const toggleFavorite = (id) => {
    setFavorites((old) =>
      old.includes(id)
        ? old.filter((item) => item !== id)
        : [...old, id]
    );
  };

  const goHome = () => {
    setScreen("home");
    setSelectedRecipe(null);
  };

  const addRecipe = () => {
    if (!name.trim() || !ingredients.trim() || !steps.trim()) {
      Alert.alert(
        "Missing details",
        "Enter a recipe name, ingredients and preparation steps."
      );
      return;
    }

    const newRecipe = {
      id: Date.now().toString(),
      name: name.trim(),
      category: newCategory,
      time: time.trim() || "20 min",
      difficulty: "Easy",
      description: description.trim() || "A delicious homemade recipe.",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
      ingredients: ingredients
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      steps: steps
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    setRecipes((old) => [newRecipe, ...old]);
    setName("");
    setDescription("");
    setTime("20 min");
    setIngredients("");
    setSteps("");
    setSearch("");
    setCategory("All");
    setShowFavorites(false);
    setSelectedRecipe(newRecipe);
    setScreen("details");

    Alert.alert("Success", "Your recipe has been added!");
  };

  const renderHeader = () => (
    <View>
      <View style={styles.navbar}>
        <Pressable onPress={goHome} style={styles.brand}>
          <Text style={styles.logo}>S</Text>
          <View>
            <Text style={styles.brandName}>SuvaiSpot</Text>
            <Text style={styles.tagline}>DISCOVER YOUR NEXT DISH</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.addButton}
          onPress={() => setScreen("add")}
        >
          <Text style={styles.addButtonText}>＋ Add Recipe</Text>
        </Pressable>
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>A LITTLE TASTE OF HOME</Text>
        <Text style={styles.heroTitle}>Good food,{"\n"}good mood.</Text>
        <Text style={styles.heroDescription}>
          Discover delicious recipes made for your kitchen.
        </Text>
        <Text style={styles.heroNote}>🍲 Homemade recipes  ·  🌿 Made with love</Text>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes or ingredients..."
          placeholderTextColor="#858B7E"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <Text style={styles.clearText}>✕</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.headingRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>
            {showFavorites ? "Your Favorites" : "Explore Recipes"}
          </Text>
          <Text style={styles.sectionSubtitle}>
            Find something delicious today.
          </Text>
        </View>

        <Pressable
          onPress={() => setShowFavorites((old) => !old)}
          style={[
            styles.favoriteButton,
            showFavorites && styles.favoriteButtonActive,
          ]}
        >
          <Text
            style={[
              styles.favoriteText,
              showFavorites && styles.favoriteTextActive,
            ]}
          >
            ♥ Saved ({favorites.length})
          </Text>
        </Pressable>
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setCategory(item)}
            style={[
              styles.categoryChip,
              category === item && styles.categoryActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                category === item && styles.categoryTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        )}
      />

      <Text style={styles.resultCount}>
        {filteredRecipes.length} recipes found
      </Text>
    </View>
  );

  const renderAddScreen = () => (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={goHome} style={styles.backButton}>
          <Text style={styles.backText}>← Back to home</Text>
        </Pressable>

        <Text style={styles.eyebrow}>YOUR KITCHEN, YOUR CREATION</Text>
        <Text style={styles.formTitle}>Share a recipe</Text>
        <Text style={styles.sectionSubtitle}>
          Add your favorite dish to your collection.
        </Text>

        <Text style={styles.label}>Recipe name *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Lemon rice"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe your dish"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Cooking time</Text>
        <TextInput
          style={styles.input}
          placeholder="20 min"
          value={time}
          onChangeText={setTime}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryWrap}>
          {categories.filter((item) => item !== "All").map((item) => (
            <Pressable
              key={item}
              onPress={() => setNewCategory(item)}
              style={[
                styles.categoryChip,
                newCategory === item && styles.categoryActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  newCategory === item && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Ingredients *</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Rice, onion, lemon, salt..."
          value={ingredients}
          onChangeText={setIngredients}
          multiline
        />
        <Text style={styles.hint}>Separate ingredients with commas.</Text>

        <Text style={styles.label}>Preparation steps *</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder={"1. Prepare ingredients\n2. Cook the dish\n3. Serve"}
          value={steps}
          onChangeText={setSteps}
          multiline
        />
        <Text style={styles.hint}>Enter each step on a new line.</Text>

        <Pressable style={styles.primaryButton} onPress={addRecipe}>
          <Text style={styles.primaryButtonText}>＋ Add My Recipe</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F7F1" />

      {screen === "details" && selectedRecipe ? (
        <RecipeDetails
          recipe={selectedRecipe}
          isFavorite={favorites.includes(selectedRecipe.id)}
          onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
          onBack={goHome}
        />
      ) : screen === "add" ? (
        renderAddScreen()
      ) : (
        <FlatList
          key="recipe-list"
          data={filteredRecipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              isFavorite={favorites.includes(item.id)}
              onPress={() => {
                setSelectedRecipe(item);
                setScreen("details");
              }}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🍽️</Text>
              <Text style={styles.emptyTitle}>No recipes found</Text>
              <Text style={styles.sectionSubtitle}>
                Try another search or category.
              </Text>
              <Pressable
                onPress={() => {
                  setSearch("");
                  setCategory("All");
                  setShowFavorites(false);
                }}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>Show all recipes</Text>
              </Pressable>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F7F1",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  listContent: { paddingHorizontal: 18, paddingBottom: 35 },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#315B3E",
    color: "#FFFFFF",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 25,
    fontWeight: "bold",
    overflow: "hidden",
  },
  brandName: { fontSize: 21, fontWeight: "800", color: "#254731" },
  tagline: { fontSize: 8, color: "#888B7C", letterSpacing: 1.2, marginTop: 3 },
  addButton: {
    backgroundColor: "#315B3E",
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 12,
  },
  addButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 12 },
  hero: {
    backgroundColor: "#E9EBDD",
    padding: 23,
    borderRadius: 23,
    marginBottom: 18,
  },
  eyebrow: {
    color: "#66805A",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.6,
    marginBottom: 10,
  },
  heroTitle: {
    color: "#254731",
    fontSize: 38,
    lineHeight: 43,
    fontWeight: "800",
  },
  heroDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#656E5D",
    marginTop: 10,
  },
  heroNote: { fontSize: 11, color: "#315B3E", marginTop: 17 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E7DF",
    borderRadius: 14,
    paddingHorizontal: 13,
    marginBottom: 24,
  },
  searchIcon: { fontSize: 27, color: "#65705E", marginRight: 8 },
  searchInput: { flex: 1, height: 49, fontSize: 13, color: "#263C2C" },
  clearText: { padding: 8, color: "#315B3E" },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    gap: 8,
  },
  sectionTitle: { fontSize: 22, fontWeight: "800", color: "#253C2B" },
  sectionSubtitle: { fontSize: 12, color: "#85897D", marginTop: 5 },
  favoriteButton: {
    borderWidth: 1,
    borderColor: "#DCDDD1",
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 10,
  },
  favoriteButtonActive: { backgroundColor: "#315B3E", borderColor: "#315B3E" },
  favoriteText: { fontSize: 11, fontWeight: "700", color: "#315B3E" },
  favoriteTextActive: { color: "#FFFFFF" },
  categories: { gap: 9, paddingBottom: 14 },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6E5DD",
    marginRight: 4,
  },
  categoryActive: { backgroundColor: "#315B3E", borderColor: "#315B3E" },
  categoryText: { color: "#687163", fontWeight: "600", fontSize: 12 },
  categoryTextActive: { color: "#FFFFFF" },
  resultCount: { fontSize: 11, color: "#888B7D", marginBottom: 10 },
  form: { padding: 20, paddingBottom: 40 },
  backButton: { paddingVertical: 12, marginBottom: 12, alignSelf: "flex-start" },
  backText: { color: "#315B3E", fontWeight: "700", fontSize: 14 },
  formTitle: { fontSize: 30, fontWeight: "800", color: "#254731", marginBottom: 6 },
  label: { color: "#314735", fontWeight: "700", fontSize: 13, marginTop: 20, marginBottom: 8 },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4DA",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 13,
    fontSize: 14,
    color: "#263C2C",
  },
  multiline: { minHeight: 95, textAlignVertical: "top" },
  hint: { fontSize: 11, color: "#85897D", marginTop: 5 },
  categoryWrap: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  primaryButton: {
    backgroundColor: "#315B3E",
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 18,
    alignItems: "center",
    marginTop: 23,
    marginBottom: 10,
  },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 14 },
  emptyState: { alignItems: "center", paddingVertical: 40 },
  emptyEmoji: { fontSize: 44, marginBottom: 10 },
  emptyTitle: { fontSize: 19, fontWeight: "800", color: "#254731" },
});

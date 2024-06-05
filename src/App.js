import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import FavoriteRecipes from "./components/FavoriteRecipes";
import Modal from "./components/Modal";
import GlobalStyle from "./styles/GlobalStyle";

const API_KEY = "4a20a7bb5e5e4a049b9bca5fba95a699";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
        );
        const mappedRecipes = response.data.recipes.map((recipe) => ({
          id: recipe.id,
          title: recipe.title,
          summary: recipe.summary,
          ingredients: recipe.extendedIngredients
            .map((ingredient) => ingredient.original)
            .join(", "),
          instructions: recipe.instructions || "No instructions provided",
        }));
        setRecipes(mappedRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const addRecipe = (recipe) => {
    setRecipes([recipe, ...recipes]); // Add new recipes to the top
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setFavoriteRecipes(
      favoriteRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setEditingRecipe(null);
  };

  const editRecipe = (recipe) => {
    setEditingRecipe(recipe);
  };

  const addFavorite = (recipe) => {
    if (!favoriteRecipes.some((fav) => fav.id === recipe.id)) {
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    } else {
      alert("Recipe is already in favorites.");
    }
  };

  const removeFavorite = (recipe) => {
    setFavoriteRecipes(favoriteRecipes.filter((fav) => fav.id !== recipe.id));
  };

  const viewDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  return (
    <div>
      <GlobalStyle />
      <Header />
      <AddRecipe addRecipe={addRecipe} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: "10px" }}>
          {editingRecipe ? (
            <EditRecipe recipe={editingRecipe} updateRecipe={updateRecipe} />
          ) : (
            <RecipeList
              recipes={recipes}
              onEdit={editRecipe}
              onFavorite={addFavorite}
              onViewDetails={viewDetails}
            />
          )}
        </div>
        <div style={{ flex: 1 }}>
          <FavoriteRecipes
            favoriteRecipes={favoriteRecipes}
            onEdit={editRecipe}
            onRemoveFavorite={removeFavorite}
            onViewDetails={viewDetails}
          />
        </div>
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <RecipeDetail recipe={selectedRecipe} />
        </Modal>
      )}
    </div>
  );
};

export default App;

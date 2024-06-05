/**
 * Testy komponentu FavoriteRecipes
 *
 * Komponent FavoriteRecipes jest odpowiedzialny za wyświetlanie listy ulubionych przepisów.
 * Renderuje tytuły, podsumowania oraz przyciski do edycji, wyświetlania szczegółów
 * i usuwania z ulubionych dla każdego przepisu.
 *
 * Cele testów:
 * 1. Sprawdzenie, czy komponent renderuje się poprawnie z listą ulubionych przepisów.
 * 2. Sprawdzenie, czy komunikat o pustej liście jest wyświetlany, gdy brak ulubionych przepisów.
 * 3. TESTY INTEGRACYJNE: Sprawdzenie współdziałania komponentów RecipeItem i FavoriteRecipes.
 *
 * Wskazania:
 * - Komponent powinien zawsze renderować tytuł i podsumowanie dla każdego ulubionego przepisu.
 * - Komponent powinien renderować komunikat o pustej liście, gdy nie ma ulubionych przepisów.
 */

import React from "react"; // Importowanie React
import { render, screen, fireEvent, cleanup } from "@testing-library/react"; // Importowanie funkcji z @testing-library/react do renderowania, interakcji i wyszukiwania elementów
import FavoriteRecipes from "./FavoriteRecipes"; // Importowanie testowanego komponentu FavoriteRecipes
import "@testing-library/jest-dom"; // Importowanie rozszerzeń matchers do jest-dom

// Tworzenie przykładowych ulubionych przepisów, które będą używane w testach
const mockFavoriteRecipes = [
  {
    id: 1,
    title: "Favorite Recipe 1",
    summary: "Favorite Summary 1",
    ingredients: "Ingredients 1",
    instructions: "Instructions 1",
  },
  {
    id: 2,
    title: "Favorite Recipe 2",
    summary: "Favorite Summary 2",
    ingredients: "Ingredients 2",
    instructions: "Instructions 2",
  },
];

// Czyszczenie po każdym teście
afterEach(cleanup);

// Test sprawdzający, czy komponent FavoriteRecipes renderuje się poprawnie z ulubionymi przepisami
test("renders FavoriteRecipes component with favorite recipes", () => {
  // Renderowanie komponentu FavoriteRecipes z przykładowymi danymi i pustymi funkcjami jako propsy
  render(
    <FavoriteRecipes
      favoriteRecipes={mockFavoriteRecipes}
      onEdit={() => {}}
      onRemoveFavorite={() => {}}
      onViewDetails={() => {}}
    />
  );

  // Sprawdzanie, czy tekst "Favorite Recipe 1" jest w dokumencie
  expect(screen.getByText(/Favorite Recipe 1/i)).toBeInTheDocument();
  // Sprawdzanie, czy tekst "Favorite Summary 1" jest w dokumencie
  expect(screen.getByText(/Favorite Summary 1/i)).toBeInTheDocument();
  // Sprawdzanie, czy tekst "Favorite Recipe 2" jest w dokumencie
  expect(screen.getByText(/Favorite Recipe 2/i)).toBeInTheDocument();
  // Sprawdzanie, czy tekst "Favorite Summary 2" jest w dokumencie
  expect(screen.getByText(/Favorite Summary 2/i)).toBeInTheDocument();
});

// Test sprawdzający, czy komponent FavoriteRecipes renderuje komunikat o pustej liście, gdy nie ma ulubionych przepisów
test("renders empty message when no favorite recipes", () => {
  // Renderowanie komponentu FavoriteRecipes z pustą listą ulubionych przepisów i pustymi funkcjami jako propsy
  render(
    <FavoriteRecipes
      favoriteRecipes={[]}
      onEdit={() => {}}
      onRemoveFavorite={() => {}}
      onViewDetails={() => {}}
    />
  );

  // Sprawdzanie, czy tekst "The list is currently empty..." jest w dokumencie
  expect(
    screen.getByText(/The list is currently empty.../i)
  ).toBeInTheDocument();
});

// TEST INTEGRACYJNY: Sprawdzanie, czy funkcja onRemoveFavorite jest wywoływana po kliknięciu przycisku "Remove from Favorites" w RecipeItem
test("calls onRemoveFavorite when Remove from Favorites button is clicked in RecipeItem", () => {
  // Tworzenie mock funkcji handleRemoveFavorite
  const handleRemoveFavorite = jest.fn();
  // Renderowanie komponentu FavoriteRecipes z mockFavoriteRecipes i handleRemoveFavorite jako prop onRemoveFavorite
  render(
    <FavoriteRecipes
      favoriteRecipes={mockFavoriteRecipes}
      onEdit={() => {}}
      onRemoveFavorite={handleRemoveFavorite}
      onViewDetails={() => {}}
    />
  );

  // Symulowanie kliknięcia przycisku "Remove from Favorites" dla pierwszego przepisu
  fireEvent.click(screen.getAllByText(/Remove from Favorites/i)[0]);
  // Sprawdzanie, czy funkcja handleRemoveFavorite została wywołana dokładnie raz
  expect(handleRemoveFavorite).toHaveBeenCalledTimes(1);
});

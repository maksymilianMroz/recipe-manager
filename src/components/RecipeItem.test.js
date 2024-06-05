/**
 * Testy komponentu RecipeItem
 *
 * Komponent RecipeItem jest odpowiedzialny za wyświetlanie pojedynczego przepisu.
 * Renderuje tytuł, podsumowanie, oraz przyciski umożliwiające edycję przepisu,
 * wyświetlanie szczegółów i dodanie/usunięcie z ulubionych.
 *
 * Cele testów:
 * 1. Sprawdzenie, czy komponent renderuje się poprawnie z dostarczonymi danymi.
 * 2. Sprawdzenie, czy przyciski działają poprawnie i wywołują odpowiednie funkcje.
 *
 * Wskazania:
 * - Komponent powinien zawsze renderować tytuł przepisu.
 * - Komponent powinien renderować podsumowanie przepisu.
 * - Przycisk "Edit" powinien wywoływać funkcję onEdit.
 * - Przycisk "View Details" powinien wywoływać funkcję onViewDetails.
 * - Przycisk "Add to Favorites" lub "Remove from Favorites" powinien wywoływać funkcję onFavorite.
 */

import React from "react"; // Importowanie React
import { render, screen, fireEvent } from "@testing-library/react"; // Importowanie funkcji z @testing-library/react do renderowania, interakcji i wyszukiwania elementów
import RecipeItem from "./RecipeItem"; // Importowanie testowanego komponentu RecipeItem
import "@testing-library/jest-dom"; // Importowanie rozszerzeń matchers do jest-dom

// Tworzenie przykładowego przepisu, który będzie używany w testach
const mockRecipe = {
  id: 1,
  title: "Test Recipe",
  summary: "This is a test recipe summary.",
  ingredients: "Test Ingredients",
  instructions: "Test Instructions",
};

// Test sprawdzający, czy komponent RecipeItem renderuje się poprawnie
test("renders RecipeItem component", () => {
  // Renderowanie komponentu RecipeItem z przykładowymi danymi i pustymi funkcjami jako propsy
  render(
    <RecipeItem
      recipe={mockRecipe}
      onEdit={() => {}}
      onFavorite={() => {}}
      onViewDetails={() => {}}
      isFavorite={false}
    />
  );

  // Sprawdzanie, czy istnieje przynajmniej jeden element z tekstem "Test Recipe"
  const titleElements = screen.getAllByText(/Test Recipe/i);
  expect(titleElements.length).toBeGreaterThan(0);

  // Sprawdzanie, czy istnieje przynajmniej jeden element z tekstem "This is a test recipe summary."
  const summaryElements = screen.getAllByText(
    /This is a test recipe summary./i
  );
  expect(summaryElements.length).toBeGreaterThan(0);

  // Sprawdzanie, czy przycisk "Edit" jest w dokumencie
  expect(screen.getByText(/Edit/i)).toBeInTheDocument();

  // Sprawdzanie, czy przycisk "View Details" jest w dokumencie
  expect(screen.getByText(/View Details/i)).toBeInTheDocument();

  // Sprawdzanie, czy przycisk "Add to Favorites" jest w dokumencie
  expect(screen.getByText(/Add to Favorites/i)).toBeInTheDocument();
});

// Test sprawdzający, czy funkcja onEdit jest wywoływana po kliknięciu przycisku "Edit"
test("calls onEdit when Edit button is clicked", () => {
  // Tworzenie mock funkcji handleEdit
  const handleEdit = jest.fn();
  // Renderowanie komponentu RecipeItem z mockRecipe i handleEdit jako prop onEdit
  render(
    <RecipeItem
      recipe={mockRecipe}
      onEdit={handleEdit}
      onFavorite={() => {}}
      onViewDetails={() => {}}
      isFavorite={false}
    />
  );

  // Symulowanie kliknięcia przycisku "Edit"
  fireEvent.click(screen.getByText(/Edit/i));
  // Sprawdzanie, czy funkcja handleEdit została wywołana dokładnie raz
  expect(handleEdit).toHaveBeenCalledTimes(1);
});

// Test sprawdzający, czy funkcja onFavorite jest wywoływana po kliknięciu przycisku "Add to Favorites"
test("calls onFavorite when Add to Favorites button is clicked", () => {
  // Tworzenie mock funkcji handleFavorite
  const handleFavorite = jest.fn();
  // Renderowanie komponentu RecipeItem z mockRecipe i handleFavorite jako prop onFavorite
  render(
    <RecipeItem
      recipe={mockRecipe}
      onEdit={() => {}}
      onFavorite={handleFavorite}
      onViewDetails={() => {}}
      isFavorite={false}
    />
  );

  // Symulowanie kliknięcia przycisku "Add to Favorites"
  fireEvent.click(screen.getByText(/Add to Favorites/i));
  // Sprawdzanie, czy funkcja handleFavorite została wywołana dokładnie raz
  expect(handleFavorite).toHaveBeenCalledTimes(1);
});

// Test sprawdzający, czy funkcja onViewDetails jest wywoływana po kliknięciu przycisku "View Details"
test("calls onViewDetails when View Details button is clicked", () => {
  // Tworzenie mock funkcji handleViewDetails
  const handleViewDetails = jest.fn();
  // Renderowanie komponentu RecipeItem z mockRecipe i handleViewDetails jako prop onViewDetails
  render(
    <RecipeItem
      recipe={mockRecipe}
      onEdit={() => {}}
      onFavorite={() => {}}
      onViewDetails={handleViewDetails}
      isFavorite={false}
    />
  );

  // Symulowanie kliknięcia przycisku "View Details"
  fireEvent.click(screen.getByText(/View Details/i));
  // Sprawdzanie, czy funkcja handleViewDetails została wywołana dokładnie raz
  expect(handleViewDetails).toHaveBeenCalledTimes(1);
});

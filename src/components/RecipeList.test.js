/**
 * Testy komponentu RecipeList
 *
 * Komponent RecipeList jest odpowiedzialny za wyświetlanie listy przepisów.
 * Renderuje tytuły, podsumowania oraz przyciski do edycji, wyświetlania szczegółów
 * i dodawania/usunięcia z ulubionych dla każdego przepisu.
 *
 * Cele testów:
 * 1. Sprawdzenie, czy komponent renderuje się poprawnie z listą przepisów.
 * 2. Sprawdzenie, czy komunikat o pustej liście jest wyświetlany, gdy brak przepisów.
 * 3. TESTY INTEGRACYJNE: Sprawdzenie współdziałania komponentów RecipeItem i RecipeList.
 *
 * Wskazania:
 * - Komponent powinien zawsze renderować tytuł i podsumowanie dla każdego przepisu.
 * - Komponent powinien renderować komunikat o pustej liście, gdy nie ma przepisów.
 */

import React from "react"; // Importowanie React
import { render, screen, fireEvent, cleanup } from "@testing-library/react"; // Importowanie funkcji z @testing-library/react do renderowania, interakcji i wyszukiwania elementów
import RecipeList from "./RecipeList"; // Importowanie testowanego komponentu RecipeList
import "@testing-library/jest-dom"; // Importowanie rozszerzeń matchers do jest-dom

// Tworzenie przykładowych przepisów, które będą używane w testach
const mockRecipes = [
  {
    id: 1,
    title: "Test Recipe 1",
    summary: "Summary 1",
    ingredients: "Ingredients 1",
    instructions: "Instructions 1",
  },
  {
    id: 2,
    title: "Test Recipe 2",
    summary: "Summary 2",
    ingredients: "Ingredients 2",
    instructions: "Instructions 2",
  },
];

// Czyszczenie po każdym teście
afterEach(cleanup);

// Test sprawdzający, czy komponent RecipeList renderuje się poprawnie z przepisami
test("renders RecipeList component with recipes", () => {
  // Renderowanie komponentu RecipeList z przykładowymi danymi i pustymi funkcjami jako propsy
  render(
    <RecipeList
      recipes={mockRecipes}
      onEdit={() => {}}
      onFavorite={() => {}}
      onViewDetails={() => {}}
    />
  );

  // Sprawdzanie, czy tekst "Test Recipe 1" jest w dokumencie
  expect(screen.getByText(/Test Recipe 1/i)).toBeInTheDocument();
  // Sprawdzanie, czy tekst "Summary 1" jest w dokumencie
  expect(screen.getByText(/Summary 1/i)).toBeInTheDocument();
  // Sprawdzanie, czy tekst "Test Recipe 2" jest w dokumencie
  expect(screen.getByText(/Test Recipe 2/i)).toBeInTheDocument();
  // Sprawdzanie, czy tekst "Summary 2" jest w dokumencie
  expect(screen.getByText(/Summary 2/i)).toBeInTheDocument();
});

// Test sprawdzający, czy komponent RecipeList renderuje komunikat o pustej liście, gdy nie ma przepisów
test("renders empty message when no recipes", () => {
  // Renderowanie komponentu RecipeList z pustą listą przepisów i pustymi funkcjami jako propsy
  render(
    <RecipeList
      recipes={[]}
      onEdit={() => {}}
      onFavorite={() => {}}
      onViewDetails={() => {}}
    />
  );

  // Sprawdzanie, czy tekst "The list is currently empty..." jest w dokumencie
  expect(
    screen.getByText(/The list is currently empty.../i)
  ).toBeInTheDocument();
});

// TEST INTEGRACYJNY: Sprawdzanie, czy funkcja onFavorite jest wywoływana po kliknięciu przycisku "Add to Favorites" w RecipeItem
test("calls onFavorite when Add to Favorites button is clicked in RecipeItem", () => {
  // Tworzenie mock funkcji handleFavorite
  const handleFavorite = jest.fn();
  // Renderowanie komponentu RecipeList z mockRecipes i handleFavorite jako prop onFavorite
  render(
    <RecipeList
      recipes={mockRecipes}
      onEdit={() => {}}
      onFavorite={handleFavorite}
      onViewDetails={() => {}}
    />
  );

  // Symulowanie kliknięcia przycisku "Add to Favorites" dla pierwszego przepisu
  fireEvent.click(screen.getAllByText(/Add to Favorites/i)[0]);
  // Sprawdzanie, czy funkcja handleFavorite została wywołana dokładnie raz
  expect(handleFavorite).toHaveBeenCalledTimes(1);
});

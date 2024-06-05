/**
 * Testy komponentu RecipeDetail
 *
 * Komponent RecipeDetail jest odpowiedzialny za wyświetlanie szczegółowych informacji o przepisie.
 * Renderuje tytuł, podsumowanie, składniki i instrukcje przepisu.
 *
 * Cele testów:
 * 1. Sprawdzenie, czy komponent renderuje się poprawnie z danymi przepisu.
 *
 * Wskazania:
 * - Komponent powinien zawsze renderować tytuł, podsumowanie, składniki i instrukcje przepisu.
 */

import React from "react"; // Importowanie React
import { render, screen, cleanup } from "@testing-library/react"; // Importowanie funkcji z @testing-library/react do renderowania i wyszukiwania elementów
import RecipeDetail from "./RecipeDetail"; // Importowanie testowanego komponentu RecipeDetail
import "@testing-library/jest-dom"; // Importowanie rozszerzeń matchers do jest-dom

// Tworzenie przykładowego przepisu, który będzie używany w testach
const mockRecipe = {
  id: 1,
  title: "Test Recipe",
  summary: "This is a test recipe summary.",
  ingredients: "Test Ingredients",
  instructions: "Test Instructions",
};

// Czyszczenie po każdym teście
afterEach(cleanup);

// Test sprawdzający, czy komponent RecipeDetail renderuje się poprawnie
test("renders RecipeDetail component", () => {
  // Renderowanie komponentu RecipeDetail z przykładowymi danymi
  render(<RecipeDetail recipe={mockRecipe} />);

  // Sprawdzanie, czy istnieje przynajmniej jeden element z tekstem "Test Recipe"
  const titleElements = screen.getAllByText(/Test Recipe/i);
  expect(titleElements.length).toBeGreaterThan(0);

  // Sprawdzanie, czy istnieje przynajmniej jeden element z tekstem "This is a test recipe summary."
  const summaryElements = screen.getAllByText(
    /This is a test recipe summary./i
  );
  expect(summaryElements.length).toBeGreaterThan(0);

  // Sprawdzanie, czy istnieje przynajmniej jeden element z tekstem "Test Ingredients"
  const ingredientsElements = screen.getAllByText(/Test Ingredients/i);
  expect(ingredientsElements.length).toBeGreaterThan(0);

  // Sprawdzanie, czy istnieje przynajmniej jeden element z tekstem "Test Instructions"
  const instructionsElements = screen.getAllByText(/Test Instructions/i);
  expect(instructionsElements.length).toBeGreaterThan(0);
});

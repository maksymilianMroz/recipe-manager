/**
 * Testy komponentu EditRecipe
 *
 * Komponent EditRecipe jest odpowiedzialny za wyświetlanie formularza edycji istniejącego przepisu.
 * Formularz zawiera pola na tytuł, podsumowanie, składniki i instrukcje, oraz przycisk do zaktualizowania przepisu.
 *
 * Cele testów:
 * 1. Sprawdzenie, czy komponent renderuje się poprawnie.
 * 2. Sprawdzenie, czy funkcja updateRecipe jest wywoływana z poprawnymi wartościami po przesłaniu formularza.
 *
 * Wskazania:
 * - Komponent powinien zawsze renderować pola formularza i przycisk "Update Recipe".
 * - Funkcja updateRecipe powinna być wywoływana z poprawnymi wartościami po przesłaniu formularza.
 */

import React from "react"; // Importowanie React
import { render, screen, fireEvent, cleanup } from "@testing-library/react"; // Importowanie funkcji z @testing-library/react do renderowania, interakcji i wyszukiwania elementów
import EditRecipe from "./EditRecipe"; // Importowanie testowanego komponentu EditRecipe
import "@testing-library/jest-dom"; // Importowanie rozszerzeń matchers do jest-dom

// Tworzenie przykładowego przepisu, który będzie używany w testach
const mockRecipe = {
  id: 1,
  title: "Test Recipe",
  summary: "Test Summary",
  ingredients: "Test Ingredients",
  instructions: "Test Instructions",
};

// Czyszczenie po każdym teście
afterEach(cleanup);

// Test sprawdzający, czy komponent EditRecipe renderuje się poprawnie
test("renders EditRecipe component", () => {
  // Renderowanie komponentu EditRecipe z przykładowymi danymi i pustą funkcją jako prop updateRecipe
  render(<EditRecipe recipe={mockRecipe} updateRecipe={() => {}} />);

  // Sprawdzanie, czy placeholder "Title" jest w dokumencie
  expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
  // Sprawdzanie, czy placeholder "Summary" jest w dokumencie
  expect(screen.getByPlaceholderText(/Summary/i)).toBeInTheDocument();
  // Sprawdzanie, czy placeholder "Ingredients" jest w dokumencie
  expect(screen.getByPlaceholderText(/Ingredients/i)).toBeInTheDocument();
  // Sprawdzanie, czy placeholder "Instructions" jest w dokumencie
  expect(screen.getByPlaceholderText(/Instructions/i)).toBeInTheDocument();
  // Sprawdzanie, czy przycisk "Update Recipe" jest w dokumencie
  expect(screen.getByText(/Update Recipe/i)).toBeInTheDocument();
});

// Test sprawdzający, czy funkcja updateRecipe jest wywoływana z poprawnymi wartościami po przesłaniu formularza
test("calls updateRecipe with correct values when form is submitted", () => {
  // Tworzenie mock funkcji handleUpdateRecipe
  const handleUpdateRecipe = jest.fn();
  // Renderowanie komponentu EditRecipe z mockRecipe i handleUpdateRecipe jako prop updateRecipe
  render(<EditRecipe recipe={mockRecipe} updateRecipe={handleUpdateRecipe} />);

  // Symulowanie wypełnienia pola "Title"
  fireEvent.change(screen.getByPlaceholderText(/Title/i), {
    target: { value: "Updated Recipe" },
  });
  // Symulowanie wypełnienia pola "Summary"
  fireEvent.change(screen.getByPlaceholderText(/Summary/i), {
    target: { value: "Updated Summary" },
  });
  // Symulowanie wypełnienia pola "Ingredients"
  fireEvent.change(screen.getByPlaceholderText(/Ingredients/i), {
    target: { value: "Updated Ingredients" },
  });
  // Symulowanie wypełnienia pola "Instructions"
  fireEvent.change(screen.getByPlaceholderText(/Instructions/i), {
    target: { value: "Updated Instructions" },
  });

  // Symulowanie kliknięcia przycisku "Update Recipe"
  fireEvent.click(screen.getByText(/Update Recipe/i));

  // Sprawdzanie, czy funkcja handleUpdateRecipe została wywołana z poprawnymi wartościami
  expect(handleUpdateRecipe).toHaveBeenCalledWith({
    ...mockRecipe,
    title: "Updated Recipe",
    summary: "Updated Summary",
    ingredients: "Updated Ingredients",
    instructions: "Updated Instructions",
  });
});

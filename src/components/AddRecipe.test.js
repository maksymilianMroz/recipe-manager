/**
 * Testy komponentu AddRecipe
 *
 * Komponent AddRecipe jest odpowiedzialny za wyświetlanie formularza dodawania nowego przepisu.
 * Formularz zawiera pola na tytuł, podsumowanie, składniki i instrukcje, oraz przycisk do dodania przepisu.
 *
 * Cele testów:
 * 1. Sprawdzenie, czy komponent renderuje się poprawnie.
 * 2. Sprawdzenie, czy funkcja addRecipe jest wywoływana z poprawnymi wartościami po przesłaniu formularza.
 *
 * Wskazania:
 * - Komponent powinien zawsze renderować pola formularza i przycisk "Add Recipe".
 * - Funkcja addRecipe powinna być wywoływana z poprawnymi wartościami po przesłaniu formularza.
 */

import React from "react"; // Importowanie React
import { render, screen, fireEvent, cleanup } from "@testing-library/react"; // Importowanie funkcji z @testing-library/react do renderowania, interakcji i wyszukiwania elementów
import AddRecipe from "./AddRecipe"; // Importowanie testowanego komponentu AddRecipe
import "@testing-library/jest-dom"; // Importowanie rozszerzeń matchers do jest-dom

// Czyszczenie po każdym teście
afterEach(cleanup);

// Test sprawdzający, czy komponent AddRecipe renderuje się poprawnie
test("renders AddRecipe component", () => {
  // Renderowanie komponentu AddRecipe z pustą funkcją jako prop addRecipe
  render(<AddRecipe addRecipe={() => {}} />);

  // Sprawdzanie, czy placeholder "Title" jest w dokumencie
  expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
  // Sprawdzanie, czy placeholder "Summary" jest w dokumencie
  expect(screen.getByPlaceholderText(/Summary/i)).toBeInTheDocument();
  // Sprawdzanie, czy placeholder "Ingredients" jest w dokumencie
  expect(screen.getByPlaceholderText(/Ingredients/i)).toBeInTheDocument();
  // Sprawdzanie, czy placeholder "Instructions" jest w dokumencie
  expect(screen.getByPlaceholderText(/Instructions/i)).toBeInTheDocument();
  // Sprawdzanie, czy przycisk "Add Recipe" jest w dokumencie
  expect(screen.getByText(/Add Recipe/i)).toBeInTheDocument();
});

// Test sprawdzający, czy funkcja addRecipe jest wywoływana z poprawnymi wartościami po przesłaniu formularza
test("calls addRecipe with correct values when form is submitted", () => {
  // Tworzenie mock funkcji handleAddRecipe
  const handleAddRecipe = jest.fn();
  // Renderowanie komponentu AddRecipe z handleAddRecipe jako prop addRecipe
  render(<AddRecipe addRecipe={handleAddRecipe} />);

  // Symulowanie wypełnienia pola "Title"
  fireEvent.change(screen.getByPlaceholderText(/Title/i), {
    target: { value: "New Recipe" },
  });
  // Symulowanie wypełnienia pola "Summary"
  fireEvent.change(screen.getByPlaceholderText(/Summary/i), {
    target: { value: "New Summary" },
  });
  // Symulowanie wypełnienia pola "Ingredients"
  fireEvent.change(screen.getByPlaceholderText(/Ingredients/i), {
    target: { value: "New Ingredients" },
  });
  // Symulowanie wypełnienia pola "Instructions"
  fireEvent.change(screen.getByPlaceholderText(/Instructions/i), {
    target: { value: "New Instructions" },
  });

  // Symulowanie kliknięcia przycisku "Add Recipe"
  fireEvent.click(screen.getByText(/Add Recipe/i));

  // Sprawdzanie, czy funkcja handleAddRecipe została wywołana z poprawnymi wartościami
  expect(handleAddRecipe).toHaveBeenCalledWith({
    id: expect.any(Number),
    title: "New Recipe",
    summary: "New Summary",
    ingredients: "New Ingredients",
    instructions: "New Instructions",
  });
});

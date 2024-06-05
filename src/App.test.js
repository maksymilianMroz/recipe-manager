/**
 * Testy komponentu App
 *
 * Komponent App jest głównym komponentem aplikacji, który zarządza stanem i logiką aplikacji.
 * Renderuje nagłówek, formularz dodawania przepisów, listy przepisów i ulubionych przepisów.
 *
 * Cele testów:
 * 1. Sprawdzenie, czy komponent renderuje się poprawnie.
 * 2. Sprawdzenie, czy można dodać nowy przepis i dodać go do ulubionych.
 *
 * Wskazania:
 * - Komponent powinien zawsze renderować nagłówek i formularz dodawania przepisów.
 * - Komponent powinien renderować listy przepisów i ulubionych przepisów.
 * - Powinno być możliwe dodanie nowego przepisu i sprawdzenie, czy jest on poprawnie dodany do listy.
 */

import React from "react"; // Importowanie React
import { render, screen, fireEvent, cleanup } from "@testing-library/react"; // Importowanie funkcji z @testing-library/react do renderowania, interakcji i wyszukiwania elementów
import App from "./App"; // Importowanie testowanego komponentu App
import "@testing-library/jest-dom"; // Importowanie rozszerzeń matchers do jest-dom

// Czyszczenie po każdym teście
afterEach(cleanup);

// Test sprawdzający, czy komponent App renderuje się poprawnie
test("renders App component", () => {
  // Renderowanie komponentu App
  render(<App />);
  // Sprawdzanie, czy nagłówek "All Recipes" jest w dokumencie
  const headerElement = screen.getByText(/All Recipes/i);
  expect(headerElement).toBeInTheDocument();
});

// Test integracyjny sprawdzający, czy można dodać nowy przepis i dodać go do ulubionych
test("can add and favorite a recipe", () => {
  // Renderowanie komponentu App
  render(<App />);

  // Symulowanie wypełnienia formularza dodawania przepisu
  fireEvent.change(screen.getByPlaceholderText(/Title/i), {
    target: { value: "Test Recipe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Summary/i), {
    target: { value: "This is a test recipe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Ingredients/i), {
    target: { value: "Test Ingredients" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Instructions/i), {
    target: { value: "Test Instructions" },
  });

  // Symulowanie kliknięcia przycisku "Add Recipe"
  fireEvent.click(screen.getByText(/Add Recipe/i));

  // Sprawdzanie, czy nowy przepis jest dodany do listy przepisów
  const titleElements = screen.getAllByText(/Test Recipe/i);
  const summaryElements = screen.getAllByText(/This is a test recipe/i);

  expect(titleElements.length).toBeGreaterThan(0);
  expect(summaryElements.length).toBeGreaterThan(0);

  // Symulowanie kliknięcia przycisku "Add to Favorites"
  fireEvent.click(screen.getByText(/Add to Favorites/i));

  // Sprawdzanie, czy nowy przepis jest dodany do listy ulubionych przepisów
  const favoriteTitleElements = screen.getAllByText(/Test Recipe/i);
  expect(favoriteTitleElements.length).toBeGreaterThan(1); // Jest w dwóch miejscach: lista przepisów i ulubione
});

/**
 * Testy komponentu Header
 *
 * Komponent Header jest odpowiedzialny za wyświetlanie nagłówka aplikacji.
 * Renderuje tytuł aplikacji.
 *
 * Cele testów:
 * 1. Sprawdzenie, czy komponent renderuje się poprawnie.
 *
 * Wskazania:
 * - Komponent powinien zawsze renderować tytuł aplikacji.
 */

import React from "react"; // Importowanie React
import { render, screen, cleanup } from "@testing-library/react"; // Importowanie funkcji z @testing-library/react do renderowania i wyszukiwania elementów
import Header from "./Header"; // Importowanie testowanego komponentu Header
import "@testing-library/jest-dom"; // Importowanie rozszerzeń matchers do jest-dom

// Czyszczenie po każdym teście
afterEach(cleanup);

// Test sprawdzający, czy komponent Header renderuje się poprawnie
test("renders Header component", () => {
  // Renderowanie komponentu Header
  render(<Header />);

  // Sprawdzanie, czy tekst "Recipe Manager" jest w dokumencie
  expect(screen.getByText(/Recipe Manager/i)).toBeInTheDocument();
});

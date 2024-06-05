/**
 * Testy komponentu Modal
 *
 * Komponent Modal jest odpowiedzialny za wyświetlanie modala z zawartością.
 * Renderuje zawartość modala oraz przycisk zamykający modal.
 *
 * Cele testów:
 * 1. Sprawdzenie, czy komponent renderuje się poprawnie z zawartością.
 * 2. Sprawdzenie, czy funkcja onClose jest wywoływana po kliknięciu przycisku zamykającego.
 *
 * Wskazania:
 * - Komponent powinien zawsze renderować zawartość modala.
 * - Funkcja onClose powinna być wywoływana po kliknięciu przycisku zamykającego.
 */

import React from "react"; // Importowanie React
import { render, screen, fireEvent, cleanup } from "@testing-library/react"; // Importowanie funkcji z @testing-library/react do renderowania, interakcji i wyszukiwania elementów
import Modal from "./Modal"; // Importowanie testowanego komponentu Modal
import "@testing-library/jest-dom"; // Importowanie rozszerzeń matchers do jest-dom

// Czyszczenie po każdym teście
afterEach(cleanup);

// Test sprawdzający, czy komponent Modal renderuje się poprawnie z zawartością
test("renders Modal component with content", () => {
  // Renderowanie komponentu Modal z przykładową zawartością i pustą funkcją jako prop onClose
  render(
    <Modal onClose={() => {}}>
      <div>Modal Content</div>
    </Modal>
  );

  // Sprawdzanie, czy tekst "Modal Content" jest w dokumencie
  expect(screen.getByText(/Modal Content/i)).toBeInTheDocument();
});

// Test sprawdzający, czy funkcja onClose jest wywoływana po kliknięciu przycisku zamykającego
test("calls onClose when close button is clicked", () => {
  // Tworzenie mock funkcji handleClose
  const handleClose = jest.fn();
  // Renderowanie komponentu Modal z przykładową zawartością i handleClose jako prop onClose
  render(
    <Modal onClose={handleClose}>
      <div>Modal Content</div>
    </Modal>
  );

  // Symulowanie kliknięcia przycisku zamykającego modal
  fireEvent.click(screen.getByText(/Close/i));
  // Sprawdzanie, czy funkcja handleClose została wywołana dokładnie raz
  expect(handleClose).toHaveBeenCalledTimes(1);
});

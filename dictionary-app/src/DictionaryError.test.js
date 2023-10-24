import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dictionary from './Dictionary';

test('Displays an error message when the search input is empty', () => {
  // Skapa en spy för window.alert
  const alertSpy = jest.spyOn(window, 'alert');
  
  render(<Dictionary />);
  const searchButton = screen.getByText('Sök');
  fireEvent.click(searchButton);

  // Kontrollera att window.alert blev anropad med rätt meddelande
  expect(alertSpy).toHaveBeenCalledWith('sökfältet kan inte vara tomt');
  
  // Återställ alert-spyn
  alertSpy.mockRestore();
});

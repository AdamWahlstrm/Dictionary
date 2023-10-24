import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dictionary from './Dictionary';

it('Displays an error message when the search input is empty', () => {
  // Skapa en spion för window.alert
  const alertSpy = jest.spyOn(window, 'alert');


  const component = render(<Dictionary />);
  const searchButton = component.getByText('Sök');
  fireEvent.click(searchButton);


  expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/sökfältet kan inte vara tomt/i));


  alertSpy.mockRestore();
});


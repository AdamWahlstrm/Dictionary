import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Dictionary from './Dictionary';

test('Displays search results when a word is entered and the button is clicked', async () => {
  render(<Dictionary />);
  const searchInput = screen.getByPlaceholderText('Sök efter ord...');
  const searchButton = screen.getByText('Sök');

  fireEvent.change(searchInput, { target: { value: 'example' } });
  fireEvent.click(searchButton);

  // Wait for search results to appear
  const searchResult = await screen.findByText('example');
  
  // Check that the result exists
  expect(searchResult).toBeTruthy();
});

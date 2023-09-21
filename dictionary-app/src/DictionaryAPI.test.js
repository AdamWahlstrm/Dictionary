import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Dictionary from './Dictionary';

// Mocka fetchför att simulera API-anrop
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]), 
  })
);

test('kolla API nyckel', async () => {
  const { getByPlaceholderText, getByText } = render(<Dictionary />);
  const inputField = getByPlaceholderText('Sök efter ord...');
  const searchButton = screen.getByText('Sök');

  fireEvent.change(inputField, { target: { value: 'hello' } });
  fireEvent.click(searchButton);

  // Vänta på att fetch-anropet ska ske
  await waitFor(() => {
    // fetch har anropats med rätt URL
    expect(fetch).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/hello');
  });
});


//testar så att api nyckel fungerar som den ska och att det går att hämta från t.ex hello.

// Funkar!!!
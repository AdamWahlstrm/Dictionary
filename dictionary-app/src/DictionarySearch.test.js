import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dictionary from './Dictionary';

test('sökfält test', () => {
  const { getByPlaceholderText } = render(<Dictionary />);
  const inputField = getByPlaceholderText('Sök efter ord...');

  fireEvent.change(inputField, { target: { value: 'apple' } });

  expect(inputField.value).toBe('apple');
});


// testar om sökfälter fungerar som de ska. 

// FUNKAR!
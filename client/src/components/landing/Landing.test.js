import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Landing from './Landing';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Landing />, div);
  });

it('renders welcome message', () => {
  render(<Landing />);
  expect(screen.getByText('Bjórsmakk')).toBeInTheDocument();
  expect(screen.getByText('Smökkum jólabjór')).toBeInTheDocument();
});
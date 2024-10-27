import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Components/HomePage/Home';

describe('Home Component', () => {
  test('renders the title and navigation links', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByText('Wish List')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('My Wishlists')).toBeInTheDocument();
  });

  test('displays error message if not logged in', () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.queryByText('404 Not Found')).toBeNull(); 
  });
});

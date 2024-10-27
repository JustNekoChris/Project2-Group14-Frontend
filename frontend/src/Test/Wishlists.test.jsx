import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Wishlists from '../Components/Wishlists/Wishlists';

describe('Wishlists Component', () => {
  test('renders the wishlists page', () => {
    render(<MemoryRouter><Wishlists /></MemoryRouter>);
    expect(screen.getByText("No wishlists found.")).toBeInTheDocument();
  });

  test('handles creating a new wishlist', () => {
    render(<MemoryRouter><Wishlists /></MemoryRouter>);
    
    fireEvent.click(screen.getByText('+ New Wishlist'));
    fireEvent.change(screen.getByPlaceholderText('Wishlist Name'), { target: { value: 'Holiday Wishlist' } });
    
    fireEvent.click(screen.getByText('Create'));
    
  });
});

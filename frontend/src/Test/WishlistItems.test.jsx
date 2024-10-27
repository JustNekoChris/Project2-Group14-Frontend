import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useParams } from 'react-router-dom';
import WishlistItems from '../Components/WishlistItems/WishlistItems';

// Mocking useParams to provide a specific wishlistID
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('WishlistItems Component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ wishlistID: '1' });
  });

  test('renders loading state initially', () => {
    render(<MemoryRouter><WishlistItems /></MemoryRouter>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message if fetching items fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    render(<MemoryRouter><WishlistItems /></MemoryRouter>);
    expect(await screen.findByText('Error: Failed to fetch items')).toBeInTheDocument();
  });

  test('displays unauthorized message for non-owners', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ userID: 'non-owner-id' }),
      })
    );

    render(<MemoryRouter><WishlistItems /></MemoryRouter>);
    expect(await screen.findByText('You are not authorized to view this page.')).toBeInTheDocument();
  });

  test('opens and closes create item modal', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ userID: '1' }),
      })
    );

    render(<MemoryRouter><WishlistItems /></MemoryRouter>);
    
    fireEvent.click(await screen.findByText('Add New Item'));
    expect(screen.getByText('Create New Item')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Create New Item')).toBeNull();
  });

  test('opens and closes item details modal', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ productID: '1', name: 'Test Item' }]),
      })
    );

    render(<MemoryRouter><WishlistItems /></MemoryRouter>);
    
    expect(await screen.findByText('Test Item')).toBeInTheDocument();
    fireEvent.click(screen.getByText('View Details'));
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });
});

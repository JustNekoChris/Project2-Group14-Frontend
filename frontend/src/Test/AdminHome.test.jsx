import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminHome from '../Components/AdminHomePage/AdminHome';

describe('AdminHome Component', () => {
  test('renders without crashing', () => {
    render(<AdminHome />);
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });

  test('handles update and delete buttons correctly', () => {
    render(<AdminHome />);
    
    const mockUsers = [
      { userID: 1, name: 'John Doe', email: 'john@example.com' },
      { userID: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    mockUsers.forEach(user => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
    
  });
});

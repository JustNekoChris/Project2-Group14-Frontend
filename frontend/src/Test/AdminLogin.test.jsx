import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AdminLogin from '../Components/AdminLogin/AdminLogin';

describe('AdminLogin Component', () => {
  test('renders login form', () => {
    render(<MemoryRouter><AdminLogin /></MemoryRouter>);
    expect(screen.getByPlaceholderText('Enter Admin Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Admin Password')).toBeInTheDocument();
  });

  test('handles form submission', () => {
    render(<MemoryRouter><AdminLogin /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText('Enter Admin Email'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Admin Password'), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByText('Login as Admin'));
    
  });
});

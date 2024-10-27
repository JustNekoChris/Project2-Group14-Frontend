import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../Components/LoginForm/LoginForm';

describe('LoginForm Component', () => {
  test('renders login inputs and button', () => {
    render(<MemoryRouter><LoginForm /></MemoryRouter>);
    expect(screen.getByPlaceholderText('Enter Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
  });

  test('handles login form submission', () => {
    render(<MemoryRouter><LoginForm /></MemoryRouter>);
    
    fireEvent.change(screen.getByPlaceholderText('Enter Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), { target: { value: 'securePassword' } });
    
    fireEvent.click(screen.getByText('Login'));
    
  });
});

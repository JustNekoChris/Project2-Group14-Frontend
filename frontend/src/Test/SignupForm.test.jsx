import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import SignupForm from '../Components/SignupForm/SignupForm';

describe('SignupForm Component', () => {
  test('renders signup form inputs', () => {
    render(<MemoryRouter><SignupForm /></MemoryRouter>);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });

  test('validates passwords match', () => {
    render(<MemoryRouter><SignupForm /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password1' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password2' } });
    
    fireEvent.click(screen.getByText('Create Account'));

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});

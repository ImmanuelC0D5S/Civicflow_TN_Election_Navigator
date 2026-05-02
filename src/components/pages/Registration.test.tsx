import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Registration } from './Registration';

// Mock the contexts
vi.mock('../../contexts/ProgressContext', () => ({
  useProgress: () => ({
    setRegistrationStatus: vi.fn(),
  }),
}));

vi.mock('../../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'en',
  }),
}));

describe('Registration Component', () => {
  it('renders the registration form', () => {
    render(<Registration />);
    expect(screen.getByRole('heading', { name: /Voter Registration Hub/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/PIN Code/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<Registration />);
    const submitButton = screen.getByRole('button', { name: /Check Status/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Zod validation should kick in and show required field errors
      const errorMessages = screen.getAllByRole('alert');
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it('allows user to fill out the form', () => {
    render(<Registration />);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput).toHaveValue('John');
  });
});

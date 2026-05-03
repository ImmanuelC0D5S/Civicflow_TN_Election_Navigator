import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChatBot } from './ChatBot';

// Mock getGeminiResponse
vi.mock('../../lib/gemini', () => ({
  getGeminiResponse: vi.fn(),
}));

import { getGeminiResponse } from '../../lib/gemini';

describe('ChatBot Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock scrollIntoView for jsdom
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('renders correctly and opens', () => {
    render(<ChatBot />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    const mockError = new Error('API Key Invalid');
    (getGeminiResponse as any).mockRejectedValue(mockError);

    render(<ChatBot />);
    
    // Open chat
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    // Verify modal is open by checking for the close button or header
    await waitFor(() => {
      expect(screen.getByText(/CivicGuide AI/i)).toBeInTheDocument();
    });

    // Find input and send message
    const input = screen.getByPlaceholderText(/Ask about election protocols/i);
    const sendButton = screen.getByRole('button', { name: /Send Message/i });

    // Type and send
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/Error: API Key Invalid/i)).toBeInTheDocument();
    });
  });
});

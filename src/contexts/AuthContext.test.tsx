import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';
import { signInWithPopup, signOut } from 'firebase/auth';

// Mock firebase/auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn((auth, cb) => {
    cb(null); // Initial state: not logged in
    return vi.fn(); // Unsubscribe
  }),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  GoogleAuthProvider: vi.fn(),
}));

// Mock firebase app
vi.mock('../lib/firebase', () => ({
  auth: {},
  googleProvider: {},
}));

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides authentication state', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBe(null);
    expect(result.current.loading).toBe(false);
  });

  it('calls signInWithPopup on login', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );
  
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signInWithGoogle();
    });

    expect(signInWithPopup).toHaveBeenCalled();
  });

  it('calls signOut on logout', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );
  
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.signOut();
    });

    expect(signOut).toHaveBeenCalled();
  });
});

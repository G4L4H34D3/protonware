import axios from 'axios';
import { LoginCredentials, SignUpCredentials, AuthResponse } from '../../types/auth';

class AuthService {
  // For development, we'll use mock data
  private mockUser = {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin' as const
  };

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // In development, we'll mock the authentication
    if (credentials.email === 'admin@example.com' && credentials.password === 'admin') {
      return {
        user: this.mockUser,
        token: 'mock-jwt-token'
      };
    }
    throw new Error('Invalid credentials');
  }

  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    // In development, we'll mock the registration
    if (credentials.email && credentials.password && credentials.name) {
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        name: credentials.name,
        role: 'user' as const
      };
      
      return {
        user: newUser,
        token: 'mock-jwt-token'
      };
    }
    throw new Error('Invalid registration data');
  }

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

export const authService = new AuthService();
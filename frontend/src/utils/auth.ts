/**
 * Stateless JWT Token Management Layer for AI Resume Analyzer Client
 */

export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    // Session states reset dynamic reload refresh injection
    window.location.reload();
  }
};

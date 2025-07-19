class TokenManager {
  constructor(private accessToken: string | null) {}
  setAccessToken(token: string): void {
    this.accessToken = token;
  }
  getAccessToken(): string | null {
    return this.accessToken;
  }
  clear() {
    this.accessToken = null;
  }
}
export const tokenManager = new TokenManager(null);

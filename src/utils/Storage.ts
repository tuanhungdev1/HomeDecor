export class Storage {
  static get accessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  static set accessToken(token: string | null) {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }

  static get refreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  }

  static set refreshToken(token: string | null) {
    if (token) {
      localStorage.setItem("refresh_token", token);
    } else {
      localStorage.removeItem("refresh_token");
    }
  }

  static clearTokens(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
}

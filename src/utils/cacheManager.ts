/* eslint-disable @typescript-eslint/no-explicit-any */
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class CacheManager {
  private static cache = new Map<string, CacheItem<any>>();

  static set<T>(key: string, data: T, expirationTime: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + expirationTime,
    });
  }

  static get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  static clear(): void {
    this.cache.clear();
  }

  static delete(key: string): void {
    this.cache.delete(key);
  }
}

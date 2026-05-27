class ApiClient {
  private baseURL = import.meta.env.VITE_API_URL || "/api";
  private useMocks = import.meta.env.VITE_MOCKS === "true";

  async request<T>(config: RequestInit & { url: string }): Promise<T> {
    if (this.useMocks) {
      return this.mockRequest(config);
    }
    return this.realRequest(config);
  }

  private async mockRequest<T>(
    config: RequestInit & { url: string },
  ): Promise<T> {
    // Delay for realistic feel
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 300));

    const { url, method = "GET", body } = config;
    const mockData = await this.loadMockData(url);
    return mockData as T;
  }

  private async realRequest<T>(
    config: RequestInit & { url: string },
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${config.url}`, {
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  }

  private async loadMockData(url: string): Promise<any> {
    // Map URL to mock file
    const path = url.split("?")[0].replace(/^\//, "");
    try {
      const response = await fetch(`/data/${path}.json`);
      if (!response.ok) return [];
      return response.json();
    } catch {
      return [];
    }
  }
}

export const apiClient = new ApiClient();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const apiService = {
  isRemoteConfigured: () => Boolean(API_BASE_URL),

  fetchPortfolio: async () => {
    if (!API_BASE_URL) {
      return null;
    }
    const response = await fetch(`${API_BASE_URL}/portfolio`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio (${response.status})`);
    }
    return response.json();
  },

  savePortfolio: async (payload, accessToken) => {
    if (!API_BASE_URL) {
      return payload;
    }
    const response = await fetch(`${API_BASE_URL}/portfolio`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Failed to save portfolio (${response.status})`);
    }
    return response.json();
  },
};

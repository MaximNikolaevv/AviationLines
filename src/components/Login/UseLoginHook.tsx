import { useState } from "react";
import type { LoginData } from "./LoginTypes";

function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function login(userData: LoginData) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        
        const result = await response.json().catch(() => null);
        throw new Error(result?.message ?? "Invalid email or password");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}

export default useLogin;

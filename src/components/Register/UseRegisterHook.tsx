import { useState } from "react";
import type { RegisterData } from "./registerTypes";

function useRegister() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function register(userData: RegisterData) {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const data = await response.json();

            return data;
        } catch (error) {
            setError(error instanceof Error ? error.message : "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return {
        register,
        loading,
        error,
    };
}

export default useRegister;
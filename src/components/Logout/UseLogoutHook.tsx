import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useLogout() {
	const navigate = useNavigate();
	
	const [loading, setLoading] = useState(true);

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function logout() {
			try {
				const response = await fetch("/api/logout", { method: "POST" });
				if (!response.ok) throw new Error("Logout failed. Please try again.");
				navigate("/");
			} catch (error) {
				setError(error instanceof Error ? error.message : "Logout failed.");
				setLoading(false);
			}
		}

		void logout();
	}, [navigate]);

	return { loading, error };
}

export default useLogout;

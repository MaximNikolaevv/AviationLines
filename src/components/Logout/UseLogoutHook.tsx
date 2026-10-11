import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/context";

function useLogout() {
	const navigate = useNavigate();
	const { setIsLogged } = useUserContext();

	const [loading, setLoading] = useState<boolean | null>(null);

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function logout() {
			try {
				const response = await fetch("/api/logout", { method: "POST" });
				if (!response.ok) throw new Error("Logout failed. Please try again.");
				setIsLogged(false);
				navigate("/");

			} catch (error) {
				
				setError(error instanceof Error ? error.message : "Logout failed.");
				setLoading(false);
			}
		}

		void logout();
	}, );

	return { loading, error };
}

export default useLogout;

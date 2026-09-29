import useLogout from "./UseLogoutHook";

export default function Logout() {
  const { loading, error } = useLogout();

  return (
    <p role={error ? "alert" : undefined}>
      {error ?? (loading ? "Logging out..." : "")}
    </p>
  );
}
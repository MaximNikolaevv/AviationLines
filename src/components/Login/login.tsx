import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "./UseLoginHook.tsx";

export default function Login() {
  const { login, loading} = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement;
  }) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData);

    if (!values.email || !values.password) {
      return console.log("All fields are required");
    }

    const result = await login({
      email: values.email as string,
      password: values.password as string,
    });

    if (result) {
      navigate("/");
    }
    
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>PlanesOnLive</h1>
        </div>
        <p className="login-subtitle">
          Влез в акаунта си, за да следиш полети в реално време
        </p>

        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="email">Имейл</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ivan@example.com"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Парола</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-link">
          Нямаш акаунт? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

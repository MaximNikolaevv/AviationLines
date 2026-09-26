import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const onSubmit = (e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    if (!values.email || !values.password) {
      return console.log("All fields are required");
    }

    console.log(values);
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

          <button type="submit" className="submit-btn">
            Вход
          </button>
        </form>

        <p className="register-link">
          Нямаш акаунт? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

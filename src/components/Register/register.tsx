import "./Register.css";
import useRegister from "./UseRegisterHook";

export default function Register() {
  const { register, loading } = useRegister();

  const onSubmit = async (e: {
    preventDefault: () => void;
    target: HTMLFormElement | undefined;
  }) => {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    if (values.password !== values["confirm-password"]) {
      return console.log("Passwords do not match");
    }

    if (!values.email || !values.password || !values["confirm-password"]) {
      return console.log("All fields are required");
    }

    await register({
      fullname: values.fullname as string,
      email: values.email as string,
      country: values.country as string,
      password: values.password as string,
    });

    console.log(values); // тук вече имаш всички данни от формата
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h1>PlanesOnLive</h1>
        </div>
        <p className="register-subtitle">
          Създай си акаунт, за да следиш полети в реално време
        </p>

        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="fullname">Име и фамилия</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Иван Иванов"
              required
            />
          </div>

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
            <label htmlFor="country">Държава</label>
            <select id="country" name="country" required defaultValue="">
              <option value="" disabled>
                Избери държава
              </option>
              <option value="BG">България</option>
              <option value="DE">Германия</option>
              <option value="TR">Турция</option>
              <option value="GR">Гърция</option>
              <option value="RO">Румъния</option>
              <option value="GB">Великобритания</option>
              <option value="US">САЩ</option>
              <option value="FR">Франция</option>
              <option value="IT">Италия</option>
              <option value="ES">Испания</option>
              <option value="PL">Полша</option>
              <option value="NL">Нидерландия</option>
            </select>
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

          <div className="field">
            <label htmlFor="confirm-password">Потвърди парола</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="••••••••"
              required
            />
          </div>

          <button disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="login-link">
          Вече имаш акаунт? <a href="/login">Вход</a>
        </p>
      </div>
    </div>
  );
}

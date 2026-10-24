import "./verify.css"; // Зарежда стиловете на страницата за потвърждение.
import { useNavigate, Link } from "react-router-dom"; // Позволява навигация след успешно потвърждение.
import { useState } from "react"; // Съхранява въведените цифри и състоянието на заявките.
import type { FormEvent } from "react"; // Типизира събитието при изпращане на формата.
import { useUserContext } from "../../context/context"; // Обновява състоянието за вход след потвърждение.

export default function Verify() {
  const [code, setCode] = useState(""); // Съхранява кода, въведен от потребителя.
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const { setIsLogged } = useUserContext();
  const email = sessionStorage.getItem("verificationEmail"); // Взема имейла на профила, но не и тайния код.

  function handleCodeChange(value: string) {
    setCode(value.replace(/\D/g, "").slice(0, 6));
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email) {
      setError(
        "Влезте или се регистрирайте отново, за да получите код за потвърждение.",
      );
      return;
    }

    if (code.length !== 6) {
      setError("Въведете пълния шестцифрен код.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }), // Изпраща въведения код, а не запазения.
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Потвърждението не бе успешно.");
      }

      sessionStorage.removeItem("verificationEmail");
      setIsLogged(true);
      navigate("/");
    } catch (verificationError) {
      setCode("");
      setError(
        verificationError instanceof Error
          ? verificationError.message
          : "Потвърждението не бе успешно.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError(null);
    setNotice(null);

    if (!email) {
      setError(
        "Влезте или се регистрирайте отново, за да получите код за потвърждение.",
      );
      return;
    }

    setResending(true);
    try {
      const response = await fetch("/api/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ?? "Новият код не можа да бъде изпратен.",
        );
      }

      setCode("");
      setNotice(result.message);
    } catch (resendError) {
      setError(
        resendError instanceof Error
          ? resendError.message
          : "Новият код не можа да бъде изпратен.",
      ); // Показва неуспеха във формата.
    } finally {
      setResending(false);
    }
  }

  return (
    <main className="verify-page">
      <Link to="/" className="back-main">
        ← Назад към началната страница
      </Link>

      <section className="verify-card">
        <div className="verify-icon">
          ✉<span>✓</span>
        </div>

        <h1>
          Потвърди своя <span>профил</span>
        </h1>

        <p className="description">
          Изпратихме шестцифрен код за потвърждение на
        </p>

        <p className="email">{email ?? "Имейл адресът не е наличен"}</p>

        <form className="verify-form" onSubmit={handleSubmit}>
          <div className="code-inputs">
            <input
              type="text"
              value={code}
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              onChange={(event) => handleCodeChange(event.target.value)}
              required
              aria-label="Шестцифрен код за потвърждение"
            />
          </div>

          {/* Съобщава грешките по достъпен начин. */}
          {error && <p role="alert">{error}</p>}

          <div className="expiration">
            <span className="clock">◷</span>
            <span>Кодът изтича след</span>
            <strong>10 минути</strong>
          </div>

          <div className="resend">
            <p>Не получи ли кода?</p>
            <button type="button" onClick={handleResend} disabled={resending}>
              {resending ? "Изпращане..." : "↻ Изпрати нов код"}
            </button>
          </div>

          {/* Потвърждава повторното изпращане и съобщава грешките достъпно. */}
          {notice && <p role="status">{notice}</p>}
          <button type="submit" className="verify-button" disabled={loading}>
            {loading ? "Потвърждаване..." : "Потвърди профила"}
            <span>→</span>
          </button>

          <div className="security-message">
            <span>♢</span>
            <p>Профилът ти е защитен при нас</p>
          </div>
        </form>
      </section>
    </main>
  );
}

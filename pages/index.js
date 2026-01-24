import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

async function handleLogin(username, password) {
  let res;
  try {
    res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  } catch (e) {
    // Network error / backend down
    return { ok: false, message: "Cannot reach server. Please try again." };
  }

  // Try to parse JSON (FastAPI HTTPException returns { detail: "..." })
  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    // Expected: invalid credentials
    return { ok: false, message: data.detail || "Invalid credentials" };
  }

  if (!res.ok) {
    // Unexpected errors (400/422/500/etc.)
    return { ok: false, message: data.detail || "Login failed. Please try again." };
  }

  // Success
  return { ok: true, data };
}

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        fontFamily: 'Segoe UI, -apple-system, sans-serif',
        marginBottom: "77px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          width: "100%",
          maxWidth: "420px",
          padding: "48px 40px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "700",
              margin: "0",
              background: "linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Login
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.6)",
              margin: "8px 0 0 0",
            }}
          >
            Welcome back
          </p>
        </div>

        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            font: "14px Segoe UI, -apple-system, sans-serif",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            color: "rgba(255, 255, 255, 0.9)",
            boxSizing: "border-box",
            transition: "all 0.3s ease",
            outline: "none",
          }}
          onFocus={e => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.borderColor = "rgba(0, 212, 255, 0.5)";
          }}
          onBlur={e => {
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            font: "14px Segoe UI, -apple-system, sans-serif",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            background: "rgba(255, 255, 255, 0.05)",
            color: "rgba(255, 255, 255, 0.9)",
            boxSizing: "border-box",
            transition: "all 0.3s ease",
            outline: "none",
          }}
          onFocus={e => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.borderColor = "rgba(0, 212, 255, 0.5)";
          }}
          onBlur={e => {
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
          }}
        />

    <button
      onClick={async () => {
        setIsLoggingIn(true);
        setLoginError(null);

        //const result = await handleLogin(email, password);

        const result = await handleLogin(username, password);

        setIsLoggingIn(false);

        if (!result.ok) {
          setLoginError(result.message);
          return;
        }

        // Success: redirect to template page with username
        router.push(`/template?username=${encodeURIComponent(result.data.username)}`);
      }}
      disabled={isLoggingIn}
      style={{
        width: "100%",
        padding: "12px 24px",
        font: "16px Segoe UI, -apple-system, sans-serif",
        fontWeight: "600",
        background: "linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)",
        color: "#1a1a2e",
        border: "none",
        borderRadius: "8px",
        cursor: isLoggingIn ? "not-allowed" : "pointer",
        opacity: isLoggingIn ? 0.7 : 1,
        transition: "all 0.3s ease",
        marginTop: "8px",
      }}
      onMouseEnter={e => {
        if (isLoggingIn) return;
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 8px 24px rgba(0, 212, 255, 0.4)";
      }}
      onMouseLeave={e => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "none";
      }}
    >
      {isLoggingIn ? "Signing In..." : "Sign In"}
    </button>
    {loginError && (
    <div style={{ marginTop: "10px", color: "#ff6b6b", fontSize: "14px" }}>
      {loginError}
    </div>
    )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            width: "100%",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Link
            href="/create-user"
            style={{
              fontSize: "13px",
              color: "rgba(0, 212, 255, 0.8)",
              textDecoration: "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              e.target.style.color = "rgba(0, 212, 255, 1)";
              e.target.style.textDecoration = "underline";
            }}
            onMouseLeave={e => {
              e.target.style.color = "rgba(0, 212, 255, 0.8)";
              e.target.style.textDecoration = "none";
            }}
          >
            Create new user
          </Link>
          <a
            href="#"
            style={{
              fontSize: "13px",
              color: "rgba(0, 212, 255, 0.8)",
              textDecoration: "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              e.target.style.color = "rgba(0, 212, 255, 1)";
              e.target.style.textDecoration = "underline";
            }}
            onMouseLeave={e => {
              e.target.style.color = "rgba(0, 212, 255, 0.8)";
              e.target.style.textDecoration = "none";
            }}
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}

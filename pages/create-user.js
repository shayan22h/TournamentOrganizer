import { useState } from "react";
import Link from "next/link";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateUser(name, username, password, email) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          username: username,
          password: password,
          email: email,
        }),
      });

      if (!res.ok) throw new Error("Registration failed");
      // Optionally redirect to login or handle success
      alert("User created successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
            Create Account
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.6)",
              margin: "8px 0 0 0",
            }}
          >
            Join us today
          </p>
        </div>

        <input
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
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
          placeholder="User Name"
          value={username}
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
          value={password}
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

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
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

        {error && (
          <p style={{
            fontSize: "13px",
            color: "#ff6b6b",
            margin: "0",
            textAlign: "center",
          }}>
            {error}
          </p>
        )}

        <button
          onClick={() => handleCreateUser(name, email)}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px 24px",
            font: "16px Segoe UI, -apple-system, sans-serif",
            fontWeight: "600",
            background: "linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)",
            color: "#1a1a2e",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            marginTop: "8px",
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={e => {
            if (!loading) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 24px rgba(0, 212, 255, 0.4)";
            }
          }}
          onMouseLeave={e => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <div
          style={{
            width: "100%",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <p style={{
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.6)",
            margin: "0",
          }}>
            Already have an account?{" "}
            <Link
              href="/"
              style={{
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
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

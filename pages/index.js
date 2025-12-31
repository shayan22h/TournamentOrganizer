import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, action: "login" }),
    });

    const data = await res.json();
    alert(data.message);
  }

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: "100vh",
        padding: "20px",
        color: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        font: '400 16px "Times New Roman"',
        marginBottom: "77px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            margin: "0 0 16px 0",
          }}
        >
          Login
        </h1>
        <input
          placeholder="username"
          onChange={e => setUsername(e.target.value)}
          style={{
            width: "100%",
            display: "inline-block",
            borderColor: "rgb(118, 118, 118)",
            font: "400 13px Arial",
            padding: "8px 12px",
            border: "1px solid rgb(118, 118, 118)",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
          style={{
            width: "100%",
            display: "inline-block",
            borderColor: "rgb(118, 118, 118)",
            font: "400 13px Arial",
            padding: "8px 12px",
            border: "1px solid rgb(118, 118, 118)",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            display: "inline-block",
            borderColor: "rgb(0, 0, 0)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            font: "400 13px Arial",
            padding: "10px 16px",
            border: "1px solid rgb(0, 0, 0)",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          marginTop: "20px",
          height: "auto",
        }}
      >
        Enter some text...
      </div>
    </div>
  );
}

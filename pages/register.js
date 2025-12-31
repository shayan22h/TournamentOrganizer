export default function Register() {
  async function register() {
    await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({ action: "register" }),
    });
  }

  return <button onClick={register}>Register</button>;
}
let users = [];

export default function handler(req, res) {
  const { username, password, action } = req.body;

  if (action === "register") {
    users.push({ username, password });
    return res.json({ message: "User created" });
  }

  if (action === "login") {
    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) return res.status(401).json({ message: "Invalid login" });
    return res.json({ message: "Login successful" });
  }
}

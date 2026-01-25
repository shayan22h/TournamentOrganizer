# Interacting with PostgreSQL via Docker CLI

This guide explains how to access and interact with the PostgreSQL database running inside Docker without using pgAdmin.

---

## 🔌 Connect to PostgreSQL Container

Start an interactive `psql` session:

```bash
docker compose exec db psql -U appuser -d appdb
```

- `db` → container name (Postgres service in docker-compose)
- `appuser` → database user
- `appdb` → database name

---

## 📋 Useful PostgreSQL Commands (Inside psql)

### 1️⃣ List all tables

```sql
\dt
```

---

### 2️⃣ Show table structure (columns, types, constraints)

```sql
\d users
```

---

### 3️⃣ Show all users (all rows)

```sql
SELECT * FROM users;
```

---

### 4️⃣ Count number of users

```sql
SELECT COUNT(*) FROM users;
```

---

### 5️⃣ Expanded display mode (better for wide tables)

```sql
\x
SELECT * FROM users;
```

To disable expanded mode:

```sql
\x
```

---

## 🧠 Additional Helpful Commands

### List all databases

```sql
\l
```

---

### List all schemas

```sql
\dn
```

---

### List all roles (database users)

```sql
\du
```

---

### List all tables in all schemas

```sql
\dt *.*
```

---

## ⚡ Run a Single Query Without Entering psql

You can execute a command directly from your terminal:

```bash
docker compose exec db psql -U appuser -d appdb -c "SELECT * FROM users;"
```

This runs the query and exits immediately.

---

## 🚪 Exit psql

When inside the PostgreSQL prompt:

```sql
\q
```

---

## 🧩 Example: Insert a Test User Manually

```sql
INSERT INTO users (email, hashed_password, full_name, is_active)
VALUES ('test@example.com', 'fakehashedpassword', 'Test User', true);
```

---

## 🔎 Example: Find a User by Email

```sql
SELECT * FROM users WHERE email = 'test@example.com';
```

---

## 🗑️ Example: Delete a User

```sql
DELETE FROM users WHERE email = 'test@example.com';
```

---


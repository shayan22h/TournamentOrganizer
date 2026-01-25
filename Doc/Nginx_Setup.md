# HTTPS Setup with Docker + Certbot
**Domain:** shayan22.ddns.net  
**Host Machine:** Windows (10.0.0.36)  
**Web Server:** Nginx (Docker)  
**SSL Provider:** Let's Encrypt (Certbot)

---

# Overview

This document describes the complete process for configuring HTTPS using Docker, Nginx, and Certbot on a Windows machine behind a home router.

Goal:

- Expose `https://yourDDNS.com` publicly
- Use Let’s Encrypt for a trusted SSL certificate
- Forward traffic from Internet → Router → Windows → Docker → Nginx

---

# 1. Verify Domain Points to Your Public IP

Check DNS resolution:

```powershell
nslookup yourDDNS.com
```

Check your public IP:

```powershell
curl https://api.ipify.org
```

Both IP addresses must match.

---

# 2. Router Configuration (Port Forwarding)

Configure the router to forward:

- WAN Port 80 → Windows Port 80
- WAN Port 443 → Windows Port 443

Example configuration:

- Protocol: TCP

Purpose:

- Port 80 is required for Let's Encrypt HTTP-01 validation.
- Port 443 is required for HTTPS traffic.

Important:

- Only one internal device can own public port 443 at a time.

Save settings and reboot router if required.

---

# 3. Windows Firewall Configuration

Open PowerShell as Administrator and run:

```powershell
New-NetFirewallRule -DisplayName "Allow HTTP 80 (Docker)" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow

New-NetFirewallRule -DisplayName "Allow HTTPS 443 (Docker)" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow
```

Verify ports are listening:

```powershell
netstat -ano | findstr :80
netstat -ano | findstr :443
```

You should see `LISTENING` on:

- 0.0.0.0:80
- 0.0.0.0:443

---

# 4. Docker Port Exposure

Ensure `docker-compose.yml` exposes ports 80 and 443:

```yaml
ports:
  - "80:80"
  - "443:443"
```

Restart containers:

```bash
docker compose down
docker compose up -d
```

Verify:

```bash
docker ps
```

Expected output:

```
0.0.0.0:80->80/tcp
0.0.0.0:443->443/tcp
```

---

# 5. Verify Public HTTP Access

From a device using mobile data (not local Wi-Fi), test:

```
http://shayan22.ddns.net
```

If it loads, port forwarding is correctly configured.

This step must succeed before running Certbot.

---

# 6. Issue SSL Certificate with Certbot

Ensure:

- Nginx container is running
- Port 80 is publicly reachable
- The webroot volume is shared between nginx and certbot

Run:

```bash
docker compose run --rm certbot certonly --webroot -w /var/www/certbot -d yourDNNS.com --email youremail@example.com --agree-tos --no-eff-email
```

Command explanation:

- `run --rm` → Runs a temporary certbot container and removes it after completion
- `certonly` → Obtain certificate only
- `--webroot` → Use HTTP-01 webroot validation
- `-w /var/www/certbot` → Directory where challenge file is written
- `-d yourDDNS.com` → Domain name
- `--email` → Email for expiration notices
- `--agree-tos` → Accept Let's Encrypt terms
- `--no-eff-email` → Disable marketing emails

If successful, output will show:

```
Successfully received certificate.
```

Certificates are stored at:

```
/etc/letsencrypt/live/yourDDNS.com/
```

---

# 7. Restart Nginx

After successful certificate issuance:

```bash
docker compose restart nginx
```

---

# 8. Verify HTTPS

Open in browser:

```
https://yourDDNS
```

Expected:

- Secure lock icon
- No certificate warning

---

# 9. Certificate Renewal

Let’s Encrypt certificates expire every 90 days.

Manual renewal:

```bash
docker compose run --rm certbot renew
```

For production environments, configure automated renewal using scheduled tasks or cron.

Note:

- Port 80 must remain accessible for automatic HTTP-01 renewal.

---

# 10. Hosting Considerations

- The Windows machine must remain powered on.
- If the machine sleeps or shuts down, the website becomes unreachable.
- Only one internal device can own public port 443 at a time.
- If moving HTTPS to another device (e.g., Raspberry Pi), update router port forwarding rules accordingly.

---

# Network Architecture Summary

```
Internet
   ↓
Public IP (WAN)
   ↓
Router Port Forwarding (80 / 443)
   ↓
Windows Host (10.0.0.36)
   ↓
Docker
   ↓
Nginx
   ↓
Frontend / Backend Services
```

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Template() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get username from query params
    if (router.isReady) {
      const { username: queryUsername } = router.query;
      if (queryUsername) {
        setUsername(decodeURIComponent(queryUsername));
      }
      setIsLoading(false);
    }
  }, [router.isReady, router.query]);

  const handleLogout = () => {
    // Clear auth and redirect to login
    router.push("/");
  };

  const handleNavigate = (page) => {
    router.push(page);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            color: "white",
            fontWeight: "600",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        fontFamily: 'Segoe UI, -apple-system, sans-serif',
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #00f5fe 0%, #0099ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          🎯 Tournament Organizer
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 24px",
            background: "rgba(255, 255, 255, 0.1)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 107, 107, 0.3)";
            e.target.style.borderColor = "rgba(255, 107, 107, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
          }}
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
          gap: "40px",
        }}
      >
        {/* Welcome Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            maxWidth: "600px",
            textAlign: "center",
            animation: "slideUp 0.8s ease-out",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              animation: "bounce 2s infinite",
            }}
          >
            👑
          </div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "white",
              margin: "0",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            Welcome <span style={{ color: "#00f5fe" }}>@{username}</span>
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.8)",
              margin: "0",
              lineHeight: "1.6",
            }}
          >
            to the Event Organizer
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.6)",
              margin: "10px 0 0 0",
            }}
          >
            You're all set! Start creating and managing your tournaments below.
          </p>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            maxWidth: "900px",
            width: "100%",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              padding: "30px 24px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
            }}
            onClick={() => handleNavigate("/create-tournament")}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🏆</div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                margin: "0 0 8px 0",
              }}
            >
              Create Tournament
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                margin: "0",
              }}
            >
              Start organizing your next event
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              padding: "30px 24px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
            }}
            onClick={() => handleNavigate("/my-tournaments")}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📋</div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                margin: "0 0 8px 0",
              }}
            >
              My Tournaments
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                margin: "0",
              }}
            >
              View and manage your tournaments
            </p>
          </div>

          {/* Card 3 */}
          <div
            style={{
              padding: "30px 24px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.boxShadow = "0 16px 48px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
            }}
            onClick={() => handleNavigate("/settings")}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>⚙️</div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "white",
                margin: "0 0 8px 0",
              }}
            >
              Settings
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 0.7)",
                margin: "0",
              }}
            >
              Customize your profile and preferences
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "12px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          background: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ margin: "0" }}>
          © 2026 Tournament Organizer. Made with ❤️ for tournament enthusiasts.
        </p>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}

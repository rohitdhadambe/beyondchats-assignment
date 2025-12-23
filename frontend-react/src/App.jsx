import { useEffect, useState } from "react";

const API = "https://beyondchats-assignment-sxi8.onrender.com/api/articles";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px"
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            border: "4px solid rgba(59, 130, 246, 0.3)",
            borderTop: "4px solid #3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{ color: "#94a3b8", fontSize: "16px", fontWeight: "500" }}>
            Loading articles...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      padding: "0"
    }}>
      {/* Header Section */}
      <div style={{
        background: "rgba(255, 255, 255, 0.03)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 32px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px"
          }}>
            <div>
              <h1 style={{
                fontSize: "42px",
                fontWeight: "700",
                color: "#ffffff",
                marginBottom: "8px",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                letterSpacing: "-0.02em"
              }}>
                BeyondChats Articles
              </h1>
              <p style={{
                color: "#94a3b8",
                fontSize: "16px",
                fontWeight: "400"
              }}>
                {articles.length} {articles.length === 1 ? "article" : "articles"} in your knowledge base
              </p>
            </div>
            
            <div style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.05)",
              padding: "12px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 8px rgba(16, 185, 129, 0.5)"
                }} />
                <span style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: "500" }}>
                  New
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#3b82f6",
                  boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)"
                }} />
                <span style={{ color: "#e2e8f0", fontSize: "14px", fontWeight: "500" }}>
                  Updated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "48px 32px"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
          gap: "28px"
        }}>
          {articles.map((article) => (
            <article
              key={article.id}
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "28px",
                transition: "all 0.3s ease",
                cursor: "default",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.4)";
                e.currentTarget.style.border = "1px solid rgba(59, 130, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.1)";
              }}
            >
              <div style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "100px",
                height: "100px",
                background: article.is_updated 
                  ? "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
                pointerEvents: "none"
              }} />

              <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "16px",
                marginBottom: "16px"
              }}>
                <h3 style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  color: "#f8fafc",
                  lineHeight: "1.4",
                  flex: "1",
                  margin: "0",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                }}>
                  {article.title || "Untitled Article"}
                </h3>
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: article.is_updated ? "#3b82f6" : "#10b981",
                    flexShrink: "0",
                    marginTop: "6px",
                    boxShadow: article.is_updated 
                      ? "0 0 10px rgba(59, 130, 246, 0.6)"
                      : "0 0 10px rgba(16, 185, 129, 0.6)"
                  }}
                  title={article.is_updated ? "Updated" : "New"}
                />
              </div>

              <p style={{
                color: "#cbd5e1",
                fontSize: "15px",
                lineHeight: "1.7",
                marginBottom: "20px",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              }}>
                {article.content.slice(0, 180)}
                {article.content.length > 180 && "..."}
              </p>

              {article.source_url !== "N/A" && (
                <a
                  href={article.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#3b82f6",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    padding: "8px 16px",
                    background: "rgba(59, 130, 246, 0.1)",
                    borderRadius: "8px",
                    border: "1px solid rgba(59, 130, 246, 0.2)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(59, 130, 246, 0.2)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  Read Full Article
                  <svg
                    style={{ width: "16px", height: "16px", marginLeft: "6px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Web20Page() {

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  })

  const [posts, setPosts] = useState([

    {
      user: "Alex",
      avatar: "🧑‍💻",
      text:
        "La web dejó de ser estática y comenzó a conectar personas.",
      likes: 124,
      commented: false,
      reposted: false,
      commentText: "",
      publishedComment: "",
    },

    {
      user: "Sophie",
      avatar: "🎧",
      text:
        "Los blogs, redes sociales y comentarios cambiaron internet.",
      likes: 203,
      commented: false,
      reposted: false,
      commentText: "",
      publishedComment: "",
    },

    {
      user: "Daniel",
      avatar: "📸",
      text:
        "Web 2.0 convirtió a los usuarios en creadores de contenido.",
      likes: 341,
      commented: false,
      reposted: false,
      commentText: "",
      publishedComment: "",
    },
  ])

  useEffect(() => {

    const handleMouse = (e: MouseEvent) => {

      const x =
        (e.clientX / window.innerWidth - 0.5) * 30

      const y =
        (e.clientY / window.innerHeight - 0.5) * 30

      setMouse({ x, y })
    }

    window.addEventListener(
      "mousemove",
      handleMouse
    )

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouse
      )

  }, [])

  return (

    <main
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",

        background:
          "radial-gradient(circle at center, #172554 0%, #020617 100%)",

        color: "white",

        fontFamily:
          "Inter, sans-serif",
      }}
    >

      {/* PARTICLES */}

      {[...Array(35)].map((_, i) => (

        <motion.div
          key={i}

          animate={{
            y: [0, -120, 0],
            opacity: [0.2, 1, 0.2],
          }}

          transition={{
            duration: 5 + i * 0.15,
            repeat: Infinity,
          }}

          style={{
            position: "absolute",

            width:
              i % 3 === 0 ? "10px" : "6px",

            height:
              i % 3 === 0 ? "10px" : "6px",

            borderRadius: "50%",

            background:
              i % 2 === 0
                ? "#60A5FA"
                : "#38BDF8",

            left:
              `${Math.random() * 100}%`,

            top:
              `${Math.random() * 100}%`,

            filter: "blur(1px)",

            boxShadow:
              "0 0 20px rgba(96,165,250,0.8)",

            transform: `
              translate(
                ${mouse.x * (i % 4)}px,
                ${mouse.y * (i % 4)}px
              )
            `,
          }}
        />
      ))}

      {/* GLOW */}

      <div
        style={{
          position: "absolute",

          width: "700px",
          height: "700px",

          borderRadius: "50%",

          background:
            "rgba(59,130,246,0.18)",

          filter: "blur(140px)",

          top: "-200px",
          right: "-100px",
        }}
      />

      {/* NAVBAR */}

      <nav
        style={{
          width: "100%",

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          padding: "28px 50px",

          borderBottom:
            "1px solid rgba(255,255,255,0.08)",

          backdropFilter:
            "blur(18px)",

          background:
            "rgba(255,255,255,0.03)",

          position: "relative",

          zIndex: 10,
        }}
      >

        <h1
          style={{
            fontSize: "1.2rem",

            letterSpacing: "5px",

            color: "#60A5FA",
          }}
        >
          WEB 2.0
        </h1>

        <Link
          href="/timeline"

          style={{
            color: "#60A5FA",

            textDecoration: "none",

            border:
              "1px solid rgba(96,165,250,0.25)",

            padding:
              "10px 18px",

            borderRadius: "12px",

            backdropFilter:
              "blur(10px)",
          }}
        >
          ← Timeline
        </Link>

      </nav>

      {/* HERO */}

      <section
        style={{
          minHeight:
            "calc(100vh - 100px)",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          alignItems: "center",

          padding: "60px 30px",

          position: "relative",

          zIndex: 2,
        }}
      >

        {/* TITLE */}

        <motion.div

          animate={{
            y: [0, -10, 0],
          }}

          transition={{
            duration: 6,
            repeat: Infinity,
          }}

          style={{
            textAlign: "center",

            marginBottom: "70px",

            transform: `
              perspective(1600px)
              rotateY(${mouse.x * 0.08}deg)
              rotateX(${mouse.y * -0.08}deg)
            `,
          }}
        >

          <h1
            style={{
              fontSize: "6rem",

              marginBottom: "30px",

              background:
                "linear-gradient(90deg,#60A5FA,#38BDF8,#ffffff)",

              WebkitBackgroundClip:
                "text",

              WebkitTextFillColor:
                "transparent",

              textShadow:
                "0 0 40px rgba(96,165,250,0.4)",
            }}
          >
            WEB 2.0
          </h1>

          <p
            style={{
              maxWidth: "900px",

              lineHeight: "2",

              fontSize: "1.3rem",

              color:
                "rgba(255,255,255,0.82)",
            }}
          >
            La web se volvió social,
            colaborativa e interactiva.
            Los usuarios dejaron de ser
            espectadores y comenzaron
            a crear contenido.
          </p>

        </motion.div>

        {/* NOTIFICATION */}

        <motion.div

          initial={{
            opacity: 0,
            x: 80,
          }}

          animate={{
            opacity: 1,
            x: 0,
            y: [0, -10, 0],
          }}

          transition={{
            duration: 4,
            repeat: Infinity,
          }}

          style={{
            position: "fixed",

            top: "110px",

            right: "40px",

            background:
              "rgba(255,255,255,0.08)",

            border:
              "1px solid rgba(255,255,255,0.12)",

            padding: "14px 22px",

            borderRadius: "18px",

            backdropFilter: "blur(18px)",

            boxShadow:
              "0 0 30px rgba(96,165,250,0.25)",

            zIndex: 9999,

            color: "white",
          }}
        >
          🔔 Nueva notificación
        </motion.div>

        {/* POSTS */}

        <div
          style={{
            width: "100%",

            maxWidth: "1100px",

            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",

            gap: "30px",
          }}
        >

          {posts.map((post, index) => (

            <motion.div

              key={index}

              whileHover={{
                scale: 1.04,
                rotateY: 5,
                rotateX: -5,
              }}

              style={{
                background:
                  "rgba(255,255,255,0.08)",

                border:
                  "1px solid rgba(255,255,255,0.12)",

                borderRadius: "28px",

                padding: "30px",

                backdropFilter:
                  "blur(18px)",

                boxShadow:
                  "0 0 35px rgba(96,165,250,0.15)",
              }}
            >

              {/* USER */}

              <div
                style={{
                  display: "flex",

                  alignItems: "center",

                  gap: "14px",

                  marginBottom: "25px",
                }}
              >

                <div
                  style={{
                    width: "58px",
                    height: "58px",

                    borderRadius: "50%",

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    fontSize: "1.7rem",

                    background:
                      "rgba(255,255,255,0.08)",

                    border:
                      "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {post.avatar}
                </div>

                <div>

                  <h3
                    style={{
                      marginBottom: "4px",
                    }}
                  >
                    {post.user}
                  </h3>

                  <span
                    style={{
                      fontSize: "0.9rem",

                      color:
                        "rgba(255,255,255,0.5)",
                    }}
                  >
                    Hace 2 min
                  </span>

                </div>

              </div>

              {/* TEXT */}

              <p
                style={{
                  lineHeight: "1.9",

                  marginBottom: "30px",

                  color:
                    "rgba(255,255,255,0.85)",
                }}
              >
                {post.text}
              </p>

              {/* ACTIONS */}

              <div
                style={{
                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems: "center",
                }}
              >

                <div
                  style={{
                    display: "flex",

                    gap: "18px",

                    alignItems: "center",
                  }}
                >

                  {/* LIKE */}

                  <motion.button

                    whileTap={{
                      scale: 1.4,
                    }}

                    onClick={() => {

                      const updatedPosts =
                        posts.map((p, i) => {

                          if (i === index) {

                            return {
                              ...p,
                              likes: p.likes + 1,
                            }
                          }

                          return p
                        })

                      setPosts(updatedPosts)
                    }}

                    style={{
                      background: "transparent",

                      border: "none",

                      color: "white",

                      cursor: "pointer",

                      fontSize: "1.2rem",
                    }}
                  >
                    ❤️
                  </motion.button>

                  {/* COMMENT */}

                  <motion.button

                    whileTap={{
                      scale: 1.3,
                    }}

                    onClick={() => {

                      const updatedPosts =
                        posts.map((p, i) => {

                          if (i === index) {

                            return {
                              ...p,
                              commented:
                                !p.commented,
                            }
                          }

                          return p
                        })

                      setPosts(updatedPosts)
                    }}

                    style={{
                      background: "transparent",

                      border: "none",

                      color:
                        post.commented
                          ? "#60A5FA"
                          : "white",

                      cursor: "pointer",

                      fontSize: "1.2rem",
                    }}
                  >
                    💬
                  </motion.button>

                  {/* REPOST */}

                  <motion.button

                    whileTap={{
                      scale: 1.2,
                    }}

                    onClick={() => {

                      const updatedPosts =
                        posts.map((p, i) => {

                          if (i === index) {

                            return {
                              ...p,
                              reposted:
                                !p.reposted,
                            }
                          }

                          return p
                        })

                      setPosts(updatedPosts)
                    }}

                    style={{
                      background:
                        post.reposted
                          ? "rgba(96,165,250,0.15)"
                          : "transparent",

                      border:
                        post.reposted
                          ? "1px solid rgba(96,165,250,0.4)"
                          : "1px solid transparent",

                      color:
                        post.reposted
                          ? "#60A5FA"
                          : "white",

                      borderRadius: "12px",

                      padding: "4px 10px",

                      cursor: "pointer",

                      fontSize: "1.1rem",

                      boxShadow:
                        post.reposted
                          ? "0 0 25px rgba(96,165,250,0.8)"
                          : "none",
                    }}
                  >
                    🔁
                  </motion.button>

                </div>

                <span
                  style={{
                    color:
                      "rgba(255,255,255,0.6)",
                  }}
                >
                  {post.likes} likes
                </span>

              </div>

              {/* COMMENT BOX */}

              {post.commented && (

                <motion.div

                  initial={{
                    opacity: 0,
                    y: 10,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  style={{
                    marginTop: "20px",
                  }}
                >

                  <input

                    value={post.commentText}

                    onChange={(e) => {

                      const updatedPosts =
                        posts.map((p, i) => {

                          if (i === index) {

                            return {
                              ...p,
                              commentText:
                                e.target.value,
                            }
                          }

                          return p
                        })

                      setPosts(updatedPosts)
                    }}

                    placeholder="Escribe un comentario..."

                    style={{
                      width: "100%",

                      padding: "14px",

                      borderRadius: "14px",

                      border:
                        "1px solid rgba(255,255,255,0.08)",

                      background:
                        "rgba(255,255,255,0.06)",

                      color: "white",

                      outline: "none",

                      marginBottom: "12px",
                    }}
                  />

                  <motion.button

                    whileTap={{
                      scale: 0.95,
                    }}

                    onClick={() => {

                      const updatedPosts =
                        posts.map((p, i) => {

                          if (i === index) {

                            return {

                              ...p,

                              publishedComment:
                                p.commentText,

                              commentText: "",
                            }
                          }

                          return p
                        })

                      setPosts(updatedPosts)
                    }}

                    style={{
                      background:
                        "rgba(96,165,250,0.2)",

                      border:
                        "1px solid rgba(96,165,250,0.3)",

                      color: "#60A5FA",

                      padding: "10px 18px",

                      borderRadius: "12px",

                      cursor: "pointer",
                    }}
                  >
                    Publicar
                  </motion.button>

                  {post.publishedComment && (

                    <motion.div

                      initial={{
                        opacity: 0,
                        y: 10,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      style={{
                        marginTop: "18px",

                        padding: "14px",

                        borderRadius: "14px",

                        background:
                          "rgba(255,255,255,0.06)",

                        border:
                          "1px solid rgba(255,255,255,0.08)",

                        color:
                          "rgba(255,255,255,0.82)",
                      }}
                    >
                      💬 {post.publishedComment}
                    </motion.div>
                  )}

                </motion.div>
              )}

            </motion.div>
          ))}

        </div>

      </section>

    </main>
  )
}
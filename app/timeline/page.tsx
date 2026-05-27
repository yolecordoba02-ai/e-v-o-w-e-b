"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

const eras = [
  {
    title: "WEB 1.0",
    year: "1990s",
    href: "/era/web10",
    color: "#FFE28A",
    description:
      "Sitios estáticos, tablas HTML y el nacimiento del internet.",
  },

  {
    title: "WEB 2.0",
    year: "2000s",
    href: "/era/web20",
    color: "#66A3FF",
    description:
      "La web social, colaborativa e interactiva.",
  },

  {
    title: "MAINFRAME VR",
    year: "2010s",
    href: "/mainframe",
    color: "#7CFF4F",
    description:
      "Interfaces inmersivas y sistemas digitales futuristas.",
  },

  {
    title: "WEB 3D",
    year: "Future",
    href: "/era/web3d",
    color: "#A8FFF5",
    description:
      "Spatial computing, hologramas y experiencias vivas.",
  },
]

export default function TimelinePage() {

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {

    const handleMouseMove = (e: MouseEvent) => {

      const x =
        (e.clientX / window.innerWidth - 0.5) * 2

      const y =
        (e.clientY / window.innerHeight - 0.5) * 2

      setMousePosition({ x, y })
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove
    )

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      )
    }

  }, [])

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#050816 0%,#000814 100%)",

        overflow: "hidden",

        position: "relative",

        padding: "140px 60px",
      }}
    >

      {/* BACKGROUND GLOW */}

      <div
        style={{
          position: "absolute",

          inset: 0,

          background:
            "radial-gradient(circle at center, rgba(124,255,79,0.12), transparent 60%)",

          filter: "blur(100px)",

          pointerEvents: "none",
        }}
      />

      {/* PARTICLES */}

      {[...Array(70)].map((_, i) => (

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
              i % 4 === 0 ? "5px" : "2px",

            height:
              i % 4 === 0 ? "5px" : "2px",

            borderRadius: "50%",

            background:
              i % 2 === 0
                ? "#7CFF4F"
                : "#66A3FF",

            left: `${Math.random() * 100}%`,

            top: `${Math.random() * 100}%`,

            boxShadow:
              "0 0 12px currentColor",
          }}
        />
      ))}

      {/* TITLE */}

      <motion.div

        initial={{
          opacity: 0,
          y: 80,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 1,
        }}

        style={{
          textAlign: "center",
          marginBottom: "140px",
        }}
      >

        <motion.h1

          animate={{
            textShadow: [
              "0 0 25px rgba(124,255,79,0.35)",
              "0 0 55px rgba(102,163,255,0.7)",
              "0 0 25px rgba(124,255,79,0.35)",
            ],
          }}

          transition={{
            duration: 5,
            repeat: Infinity,
          }}

          style={{
            fontSize: "6rem",

            fontWeight: 900,

            marginBottom: "25px",

            background:
              "linear-gradient(90deg,#7CFF4F,#66A3FF,#ffffff)",

            WebkitBackgroundClip: "text",

            WebkitTextFillColor: "transparent",
          }}
        >
          EVOLUCIÓN WEB
        </motion.h1>

        <p
          style={{
            color: "rgba(255,255,255,0.7)",

            fontSize: "1.4rem",

            maxWidth: "900px",

            margin: "0 auto",

            lineHeight: 1.8,
          }}
        >
          Un recorrido inmersivo a través de la
          evolución visual, tecnológica y social
          del internet.
        </p>

      </motion.div>

      {/* TIMELINE */}

      <div
        style={{
          position: "relative",

          width: "100%",

          maxWidth: "1200px",

          margin: "0 auto",
        }}
      >

        {/* CENTRAL LINE */}

        <motion.div

          animate={{
            opacity: [0.6, 1, 0.6],

            boxShadow: [
              "0 0 20px rgba(124,255,79,0.4)",
              "0 0 45px rgba(124,255,79,1)",
              "0 0 20px rgba(124,255,79,0.4)",
            ],
          }}

          transition={{
            duration: 3,
            repeat: Infinity,
          }}

          style={{
            position: "absolute",

            left: "50%",

            top: 0,

            width: "4px",

            height: "100%",

            background:
              "linear-gradient(180deg,#7CFF4F,#66A3FF)",

            transform: "translateX(-50%)",
          }}
        />

        {eras.map((era, index) => {

          const leftSide =
            index % 2 === 0

          return (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                x: leftSide ? -120 : 120,
              }}

              whileInView={{
                opacity: 1,
                x: 0,
              }}

              transition={{
                duration: 1,
              }}

              viewport={{
                once: true,
              }}

              style={{
                position: "relative",

                width: "100%",

                display: "flex",

                justifyContent:
                  leftSide
                    ? "flex-start"
                    : "flex-end",

                marginBottom: "140px",
              }}
            >

              {/* NODE */}

              <motion.div

                animate={{
                  scale: [1, 1.3, 1],

                  boxShadow: [
                    `0 0 10px ${era.color}`,
                    `0 0 35px ${era.color}`,
                    `0 0 10px ${era.color}`,
                  ],
                }}

                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}

                style={{
                  position: "absolute",

                  left: "50%",

                  top: "50%",

                  transform:
                    "translate(-50%,-50%)",

                  width: "24px",

                  height: "24px",

                  borderRadius: "50%",

                  background: era.color,
                }}
              />

              {/* CARD */}

              <Link
                href={era.href}
                style={{
                  textDecoration: "none",
                }}
              >

                <motion.div

                  whileHover={{

                    scale: 1.04,

                    rotateX:
                      mousePosition.y * -10,

                    rotateY:
                      mousePosition.x * 10,

                    y: -10,

                    boxShadow:
                      `0 0 60px ${era.color}`,
                  }}

                  style={{

                    width: "460px",

                    paddingLeft:
                      leftSide
                        ? "80px"
                        : "35px",

                    paddingRight:
                      leftSide
                        ? "35px"
                        : "80px",

                    paddingTop: "35px",

                    paddingBottom: "35px",

                    borderRadius: "30px",

                    background:
                      "rgba(255,255,255,0.05)",

                    backdropFilter:
                      "blur(22px)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",

                    boxShadow:
                      `0 0 40px ${era.color}22`,

                    color: "white",

                    position: "relative",

                    overflow: "hidden",

                    transformStyle:
                      "preserve-3d",
                  }}
                >

                  {/* CARD GLOW */}

                  <div
                    style={{
                      position: "absolute",

                      width: "220px",

                      height: "220px",

                      borderRadius: "50%",

                      background: era.color,

                      opacity: 0.12,

                      filter: "blur(100px)",

                      top: "-60px",

                      right: "-60px",
                    }}
                  />

                  <div
                    style={{
                      position: "relative",
                      zIndex: 2,
                    }}
                  >

                    <span
                      style={{
                        color: era.color,

                        fontWeight: 800,

                        letterSpacing: "3px",
                      }}
                    >
                      {era.year}
                    </span>

                    <h2
                      style={{
                        fontSize: "2.4rem",

                        marginTop: "12px",

                        marginBottom: "20px",

                        color: era.color,
                      }}
                    >
                      {era.title}
                    </h2>

                    <p
                      style={{
                        fontSize: "1.15rem",

                        lineHeight: 1.8,

                        color:
                          "rgba(255,255,255,0.78)",
                      }}
                    >
                      {era.description}
                    </p>

                  </div>

                </motion.div>

              </Link>

            </motion.div>
          )
        })}
      </div>
    </main>
  )
}
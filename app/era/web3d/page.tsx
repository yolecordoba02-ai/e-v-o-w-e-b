"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"

const cards = [
  {
    title: "🧠 AI Systems",
    description:
      "Interfaces inteligentes que reaccionan dinámicamente al usuario.",
    glow: "#7CFF4F",
    top: "220px",
    left: "80px",
  },

  {
    title: "🥽 Spatial Computing",
    description:
      "La web abandona lo plano y comienza a sentirse espacial.",
    glow: "#66E0FF",
    top: "220px",
    right: "80px",
  },

  {
    title: "🌐 Metaverso",
    description:
      "Espacios persistentes donde los usuarios existen mediante avatares.",
    glow: "#66CCFF",
    top: "520px",
    left: "80px",
  },

  {
    title: "✨ Holographic UI",
    description:
      "Paneles translúcidos, holográficos y flotantes.",
    glow: "#FFD36B",
    top: "520px",
    right: "80px",
  },
]

export default function Web3DPage() {

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
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
        background:
          "radial-gradient(circle at center, #001B5E 0%, #000814 55%, #000 100%)",
      }}
    >

      {/* NAVBAR */}

      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "26px 40px",
          backdropFilter: "blur(18px)",
          background:
            "rgba(0,0,0,0.18)",
          borderBottom:
            "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            color: "#7CFF4F",
            fontWeight: 900,
            letterSpacing: "8px",
            fontSize: "1.3rem",
          }}
        >
          WEB 3D
        </div>

        <Link
          href="/timeline"
          style={{
            color: "#FFD36B",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← Timeline
        </Link>
      </div>

      {/* PARTICLES */}

      {[...Array(90)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.15,
            repeat: Infinity,
          }}
          style={{
            position: "absolute",
            width: i % 4 === 0 ? "5px" : "2px",
            height: i % 4 === 0 ? "5px" : "2px",
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

      {/* CENTER GLOW */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,255,79,0.18), transparent 70%)",
          left: "50%",
          top: "50%",
          transform:
            "translate(-50%, -50%)",
          filter: "blur(80px)",
        }}
      />

      {/* HERO */}

      <div
        style={{
          position: "absolute",
          top: "90px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 20,
          width: "900px",
        }}
      >

        <motion.h1

          animate={{
            opacity: [0.8, 1, 0.8],
          }}

          transition={{
            duration: 4,
            repeat: Infinity,
          }}

          style={{
            fontSize: "6rem",
            fontWeight: 900,
            lineHeight: 1,

            background:
              "linear-gradient(90deg,#7CFF4F,#66A3FF,#ffffff)",

            WebkitBackgroundClip: "text",

            WebkitTextFillColor: "transparent",

            textShadow:
              "0 0 40px rgba(124,255,79,0.35)",
          }}
        >
          WEB 3D
        </motion.h1>

        <p
          style={{
            marginTop: "24px",
            color: "rgba(255,255,255,0.82)",
            fontSize: "1.35rem",
            lineHeight: 1.8,
          }}
        >
          La web evoluciona hacia experiencias
          inmersivas, holográficas y espaciales
          donde las interfaces dejan de sentirse
          como páginas y comienzan a sentirse
          como entornos digitales vivos.
        </p>
      </div>

      {/* CARDS */}

      {cards.map((card, index) => (
        <motion.div
          key={index}

          initial={{
            opacity: 0,
            scale: 0.7,
          }}

          animate={{
            opacity: 1,
            y: [0, -10, 0],
            scale: 1,
          }}

          transition={{
            duration: 6,
            repeat: Infinity,
            delay: index * 0.4,
          }}

          whileHover={{
            scale: 1.08,

            rotateX:
              mousePosition.y * -12,

            rotateY:
              mousePosition.x * 12,

            y: -18,

            boxShadow:
              `0 0 60px ${card.glow}`,
          }}

          style={{
            position: "absolute",

            top: card.top,

            left: card.left,

            right: card.right,

            width: "280px",

            minHeight: "220px",

            padding: "30px",

            borderRadius: "30px",

            backdropFilter: "blur(22px)",

            background:
              "rgba(255,255,255,0.05)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            boxShadow:
              `0 0 40px ${card.glow}22`,

            transformStyle:
              "preserve-3d",

            zIndex: 5,
          }}
        >

          <h2
            style={{
              fontSize: "2.1rem",
              fontWeight: 900,
              marginBottom: "20px",
              color: card.glow,
              lineHeight: 1.1,
            }}
          >
            {card.title}
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.78)",
              fontSize: "1.15rem",
              lineHeight: 1.8,
            }}
          >
            {card.description}
          </p>
        </motion.div>
      ))}

      {/* CORE */}

      <motion.div

        animate={{
          x: mousePosition.x * 60,
          y: mousePosition.y * 60,
        }}

        transition={{
          type: "spring",
          stiffness: 120,
          damping: 18,
        }}

        style={{
          position: "absolute",

          top: "390px",

          left: "50%",

          marginLeft: "-70px",

          width: "140px",

          height: "140px",

          borderRadius: "50%",

          border:
            "2px solid rgba(124,255,79,0.7)",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          boxShadow:
            "0 0 80px rgba(124,255,79,0.85)",

          backdropFilter: "blur(20px)",

          background:
            "rgba(0,0,0,0.28)",

          zIndex: 20,
        }}
      >

        <motion.div

          animate={{
            rotate: 360,
            scale: [1, 1.15, 1],
          }}

          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}

          style={{
            width: "56px",

            height: "56px",

            borderRadius: "18px",

            background:
              "linear-gradient(135deg,#66A3FF,#7CFF4F)",

            boxShadow:
              "0 0 50px rgba(124,255,79,0.95)",
          }}
        />
      </motion.div>
    </main>
  )
}
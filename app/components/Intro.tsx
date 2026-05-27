"use client"

import { motion } from "framer-motion"

export default function Intro() {
  return (
    <main
      style={{
        width: "100%",
        height: "100vh",
        background:
          "radial-gradient(circle at center, #111827 0%, #050816 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ESTRELLAS */}
      {[...Array(70)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: Math.random() * 4 + "px",
            height: Math.random() * 4 + "px",
            borderRadius: "50%",
            background:
              i % 2 === 0 ? "#d9ff00" : "#8be9fd",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            opacity: 0.8,
            boxShadow:
              i % 2 === 0
                ? "0 0 10px #d9ff00"
                : "0 0 10px #8be9fd",
          }}
        />
      ))}

      <div
        style={{
          textAlign: "center",
          zIndex: 2,
        }}
      >
        {/* TITULO */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1,
          }}
          style={{
            fontSize: "6rem",
            fontWeight: 900,
            marginBottom: "20px",
            background:
              "linear-gradient(90deg,#39ff14,#8be9fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0 0 25px rgba(57,255,20,0.8)",
            letterSpacing: "-2px",
          }}
        >
          EvoWeb
        </motion.h1>

        {/* TEXTO */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 1,
          }}
          style={{
            color: "#ffffff",
            fontSize: "1rem",
            letterSpacing: "4px",
            marginBottom: "25px",
            opacity: 0.8,
          }}
        >
          INITIALIZING EXPERIENCE...
        </motion.p>

        {/* BARRA */}
        <div
          style={{
            width: "320px",
            height: "4px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "999px",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
            }}
            style={{
              height: "100%",
              background:
                "linear-gradient(90deg,#39ff14,#8be9fd)",
              boxShadow:
                "0 0 15px #39ff14",
            }}
          />
        </div>
      </div>
    </main>
  )
}
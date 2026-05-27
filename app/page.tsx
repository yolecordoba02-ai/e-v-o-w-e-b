"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import Intro from "./components/Intro"

export default function LandingPage() {

  const [showIntro, setShowIntro] =
    useState(true)

  const [mousePosition, setMousePosition] =
    useState({
      x: 0,
      y: 0,
    })

  useEffect(() => {

    const timer = setTimeout(() => {
      setShowIntro(false)
    }, 3200)

    return () => clearTimeout(timer)

  }, [])

  useEffect(() => {

    const handleMouseMove = (
      e: MouseEvent
    ) => {

      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
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

  if (showIntro) {
    return <Intro />
  }

  const cards = [

    {
      title: "Timeline",

      desc:
        "Explora cronológicamente la evolución completa del internet y sus interfaces.",

      link: "/timeline",

      color: "#39ff14",
    },

    {
      title: "Web 1.0",

      desc:
        "HTML puro, gifs animados, tablas y el nacimiento de la web estática.",

      link: "/era/web10",

      color: "#39ff14",
    },

    {
      title: "Web 2.0",

      desc:
        "Redes sociales, interacción y plataformas donde el usuario crea contenido.",

      link: "/era/web20",

      color: "#66A3FF",
    },

    {
      title: "Mainframe",

      desc:
        "Una visión experimental y futurista sobre el siguiente nivel del internet.",

      link: "/mainframe",

      color: "#C084FC",
    },

  ]

  return (

    <main
      style={{
        minHeight: "100vh",

        overflow: "hidden",

        position: "relative",

        color: "white",

        fontFamily: "Arial",

        paddingBottom: "120px",

        background: `
          radial-gradient(
            circle at
            ${mousePosition.x}px
            ${mousePosition.y}px,

            rgba(57,255,20,0.14),

            transparent 20%
          ),

          radial-gradient(
            circle at top,

            #111827 0%,
            #020617 55%,
            #000000 100%
          )
        `,
      }}
    >

      {/* PARTICLES */}

      {[...Array(100)].map((_, i) => (

        <motion.div
          key={i}

          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 1, 0.2],
          }}

          transition={{
            duration: 3 + (i % 5),
            repeat: Infinity,
          }}

          style={{
            position: "absolute",

            width:
              `${Math.random() * 4 + 2}px`,

            height:
              `${Math.random() * 4 + 2}px`,

            borderRadius: "999px",

            background:
              i % 2 === 0
                ? "#39ff14"
                : "#66A3FF",

            left:
              `${Math.random() * 100}%`,

            top:
              `${Math.random() * 100}%`,

            boxShadow:
              i % 2 === 0
                ? "0 0 12px #39ff14"
                : "0 0 12px #66A3FF",
          }}
        />
      ))}

      {/* NAVBAR */}

      <nav
        style={{
          width: "100%",

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          padding: "24px 50px",

          background:
            "rgba(0,0,0,0.55)",

          backdropFilter:
            "blur(18px)",

          borderBottom:
            "1px solid rgba(255,255,255,0.06)",

          position: "sticky",

          top: 0,

          zIndex: 20,
        }}
      >

        <h1
          style={{
            color: "#39ff14",

            fontSize: "1.6rem",

            fontWeight: 900,

            textShadow:
              "0 0 18px rgba(57,255,20,0.8)",
          }}
        >
          EvoWeb
        </h1>

        <div
          style={{
            display: "flex",

            gap: "28px",

            alignItems: "center",
          }}
        >

          {[
            {
              label: "Timeline",
              href: "/timeline",
            },

            {
              label: "Web 1.0",
              href: "/era/web10",
            },

            {
              label: "Web 2.0",
              href: "/era/web20",
            },

            {
              label: "Mainframe",
              href: "/mainframe",
            },

          ].map((item, index) => (

            <Link
              key={index}

              href={item.href}

              style={{
                color: "#cbd5e1",

                textDecoration: "none",

                fontSize: "0.95rem",
              }}
            >
              {item.label}
            </Link>

          ))}

        </div>

      </nav>

      {/* HERO */}

      <section
        style={{
          width: "100%",

          display: "flex",

          flexDirection: "column",

          justifyContent: "center",

          alignItems: "center",

          textAlign: "center",

          padding:
            "110px 20px 90px 20px",

          position: "relative",

          zIndex: 2,
        }}
      >

        <motion.h1

          animate={{
            textShadow: [
              "0 0 10px rgba(57,255,20,0.5)",
              "0 0 35px rgba(57,255,20,1)",
              "0 0 10px rgba(57,255,20,0.5)",
            ],
          }}

          transition={{
            duration: 2,
            repeat: Infinity,
          }}

          style={{
            fontSize: "6.5rem",

            fontWeight: 900,

            marginBottom: "30px",

            color: "#39ff14",
          }}
        >
          EvoWeb
        </motion.h1>

        <p
          style={{
            maxWidth: "950px",

            fontSize: "1.35rem",

            lineHeight: "2.6rem",

            color: "#cbd5e1",
          }}
        >
          EvoWeb es una experiencia visual e interactiva
          que explora la transformación del internet desde
          sus primeras páginas estáticas hasta las interfaces
          inmersivas, sociales y futuristas que redefinen la
          manera en que las personas navegan, crean y se conectan
          digitalmente.
        </p>

      </section>

      {/* CARDS */}

      <section
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
          padding: "0 40px 120px 40px",
          position: "relative",
          zIndex: 2,
        }}
      >

        {cards.map((card, index) => (

          <motion.div

            key={index}

            whileHover={{
              scale: 1.14,
              y: -35,
            }}

            transition={{
              type: "spring",
              stiffness: 300,
              damping: 14,
            }}

            style={{

              width: "350px",

              borderRadius: "36px",

              cursor: "pointer",

            }}
          >

            <Link
              href={card.link}
              style={{
                textDecoration: "none",
                display: "block",
              }}
            >

              <motion.div

                whileHover={{
                  boxShadow: `
                    0 45px 90px rgba(0,0,0,0.65),
                    0 0 90px ${card.color}88,
                    0 0 160px ${card.color}44
                  `,
                }}

                style={{

                  position: "relative",

                  minHeight: "270px",

                  padding: "40px",

                  overflow: "hidden",

                  borderRadius: "36px",

                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",

                  border:
                    `1px solid ${card.color}55`,

                  backdropFilter: "blur(28px)",

                  WebkitBackdropFilter: "blur(28px)",

                  boxShadow: `
                    0 25px 50px rgba(0,0,0,0.45),
                    0 0 40px ${card.color}22
                  `,

                  transition: "0.35s ease",
                }}
              >

                {/* HUGE GLOW */}

                <motion.div

                  animate={{
                    scale: [1, 1.35, 1],
                    opacity: [0.4, 1, 0.4],
                  }}

                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}

                  style={{
                    position: "absolute",

                    width: "280px",
                    height: "280px",

                    borderRadius: "50%",

                    background:
                      `${card.color}33`,

                    filter: "blur(100px)",

                    top: "-120px",
                    right: "-120px",
                  }}
                />

                {/* NUMBER */}

                <span
                  style={{
                    position: "absolute",

                    top: "20px",
                    right: "25px",

                    fontSize: "5rem",

                    fontWeight: 900,

                    color: `${card.color}22`,
                  }}
                >
                  0{index + 1}
                </span>

                {/* TITLE */}

                <h2
                  style={{
                    color: card.color,

                    fontSize: "2.3rem",

                    fontWeight: 900,

                    marginBottom: "25px",

                    textShadow:
                      `0 0 25px ${card.color}`,
                  }}
                >
                  {card.title}
                </h2>

                {/* DESCRIPTION */}

                <p
                  style={{
                    color: "#cbd5e1",

                    lineHeight: "2",

                    fontSize: "1rem",
                  }}
                >
                  {card.desc}
                </p>

                {/* FLOATING LIGHT */}

                <motion.div

                  animate={{
                    y: [0, -14, 0],
                  }}

                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}

                  style={{
                    position: "absolute",

                    bottom: "28px",
                    right: "28px",

                    width: "20px",
                    height: "20px",

                    borderRadius: "50%",

                    background: card.color,

                    boxShadow:
                      `0 0 30px ${card.color}`,
                  }}
                />

                {/* REFLECTION */}

                <div
                  style={{
                    position: "absolute",

                    inset: 0,

                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.16), transparent 40%)",

                    pointerEvents: "none",
                  }}
                />

              </motion.div>

            </Link>

          </motion.div>

        ))}

      </section>

    </main>
  )
}
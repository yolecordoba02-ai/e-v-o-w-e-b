"use client"

import Link from "next/link"

export default function Web10Page() {

  return (

    <main
      style={{
        minHeight: "100vh",

        background:
          "linear-gradient(to bottom, #d6d6d6, #bcbcbc)",

        fontFamily:
          "'Times New Roman', serif",

        color: "#000",

        paddingBottom: "80px",
      }}
    >

      {/* BOTÓN VOLVER */}

<Link
  href="/"
  style={{
    display: "inline-block",

    margin: "20px",

    background: "#c0c0c0",

    border:
      "3px outset #fff",

    padding: "8px 14px",

    color: "#000080",

    textDecoration: "none",

    fontWeight: "bold",

    fontSize: "1rem",

    boxShadow:
      "2px 2px 0 #808080",
  }}
>
  ← Volver
</Link>

      {/* BARRA SUPERIOR */}

      <div
        style={{
          background: "#000080",

          color: "white",

          padding: "12px 20px",

          fontSize: "1.2rem",

          fontWeight: "bold",

          borderBottom:
            "4px solid #00004d",
        }}
      >
        EvoWeb - Web 1.0
      </div>

      {/* HEADER */}

      <div
        style={{
          textAlign: "center",

          padding: "30px 20px",
        }}
      >

        <h1
          style={{
            fontSize: "4rem",

            color: "#000080",

            marginBottom: "20px",

            textDecoration: "underline",
          }}
        >
          BIENVENIDO A LA WEB 1.0
        </h1>

        <marquee
          style={{
            background: "#ffff00",

            padding: "10px",

            border:
              "2px dashed #000",

            marginBottom: "20px",
          }}
        >
          🌐 SITIO EN CONSTRUCCIÓN 🌐 MEJOR VISTO EN INTERNET EXPLORER 🌐 GIFS GRATIS 🌐 DESCARGAS GRATIS 🌐
        </marquee>

        <img
          src="https://media.tenor.com/2roX3uxz_68AAAAC/internet.gif"
          alt="internet"

          width="220"

          style={{
            border:
              "4px ridge #808080",
          }}
        />

      </div>

      {/* CONTENEDOR PRINCIPAL */}

      <div
        style={{
          width: "95%",

          margin: "0 auto",

          background: "white",

          border:
            "4px ridge #808080",

          padding: "20px",
        }}
      >

        <table
          style={{
            width: "100%",

            borderCollapse:
              "collapse",
          }}
        >

          <tbody>

            <tr>

              {/* SIDEBAR */}

              <td
                style={{
                  width: "22%",

                  verticalAlign:
                    "top",

                  background:
                    "#dbe4ff",

                  border:
                    "2px solid #000080",

                  padding: "15px",
                }}
              >

                <h2
                  style={{
                    color: "#000080",
                  }}
                >
                  Navegación
                </h2>

                <ul
                  style={{
                    lineHeight: "2.2",
                  }}
                >

                  <li>
                    <Link href="/">
                      Inicio
                    </Link>
                  </li>

                  <li>
                    <Link href="/timeline">
                      Timeline
                    </Link>
                  </li>

                  <li>
                    <Link href="/era/web20">
                      Web 2.0
                    </Link>
                  </li>

                  <li>
                    <Link href="/mainframe">
                      Mainframe
                    </Link>
                  </li>

                </ul>

                <hr />

                <p>
                  👤 Usuarios conectados:
                </p>

                <img
                  src="https://media.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif"
                  alt="loading"

                  width="120"
                />

                <br />
                <br />

                <img
                  src="https://media.tenor.com/DimzPZMypFcAAAAi/laptop.gif"
                  alt="pc"

                  width="140"
                />

                <br />
                <br />

                <img
                  src="https://media.tenor.com/GprZ3zwHYVIAAAAi/cat-computer.gif"
                  alt="cat"

                  width="120"
                />

                <hr />

                <p>
                  💾 Última actualización:
                </p>

                <p>
                  07 / 12 / 1999
                </p>

                <hr />

                <marquee
                  direction="up"

                  height="120"
                >
                  🚧 SITIO EN CONSTRUCCIÓN 🚧
                  <br />
                  <br />
                  🌎 BIENVENIDO A EVOWEB 🌎
                  <br />
                  <br />
                  💻 HTML POR SIEMPRE 💻
                </marquee>

              </td>

              {/* CONTENIDO PRINCIPAL */}

              <td
                style={{
                  padding: "20px",

                  verticalAlign:
                    "top",
                }}
              >

                <h2
                  style={{
                    color: "#800000",
                  }}
                >
                  Los primeros años del internet
                </h2>

                <p
                  style={{
                    lineHeight: "2",
                  }}
                >
                  Durante la era de la Web 1.0,
                  los sitios eran principalmente
                  estáticos e informativos. Las personas
                  podían leer contenido, pero casi nunca
                  interactuar con él. Todo estaba construido
                  usando HTML básico, tablas y diseños simples.
                </p>

                <p
                  style={{
                    lineHeight: "2",
                  }}
                >
                  En esta época comenzaron a aparecer
                  las primeras páginas personales,
                  directorios web, foros y comunidades
                  digitales. Era común encontrar texto
                  parpadeante, colores brillantes,
                  contadores de visitas y muchísimos GIFs animados.
                </p>

                <center>

                  <img
                    src="https://media.tenor.com/YUzRkMOL-3EAAAAC/computer-computer-guy.gif"
                    alt="retro"

                    width="320"

                    style={{
                      border:
                        "4px ridge #808080",
                    }}
                  />

                </center>

                <br />

                {/* TABLA */}

                <table
                  border={1}

                  cellPadding={10}

                  style={{
                    width: "100%",

                    background:
                      "#f2f2f2",
                  }}
                >

                  <tbody>

                    <tr
                      style={{
                        background:
                          "#000080",

                        color: "white",
                      }}
                    >
                      <th>
                        Característica
                      </th>

                      <th>
                        Estado
                      </th>
                    </tr>

                    <tr>
                      <td>
                        Páginas estáticas
                      </td>

                      <td>
                        ✅
                      </td>
                    </tr>

                    <tr>
                      <td>
                        Interacción de usuarios
                      </td>

                      <td>
                        ❌
                      </td>
                    </tr>

                    <tr>
                      <td>
                        Foros
                      </td>

                      <td>
                        ✅
                      </td>
                    </tr>

                    <tr>
                      <td>
                        Redes sociales
                      </td>

                      <td>
                        ❌
                      </td>
                    </tr>

                    <tr>
                      <td>
                        Tablas HTML
                      </td>

                      <td>
                        ✅
                      </td>
                    </tr>

                  </tbody>

                </table>

                <br />

                {/* CONTENIDO EXTRA */}

                <table
                  width="100%"

                  border={1}

                  cellPadding={10}
                >

                  <tbody>

                    <tr>

                      <td>

                        <img
                          src="https://media.tenor.com/TCMWkxIkF9IAAAAi/windows-xp.gif"
                          alt="xp"

                          width="150"
                        />

                      </td>

                      <td>

                        <h3>
                          ¿Sabías esto?
                        </h3>

                        <p>
                          En los años 90 muchas páginas
                          web reproducían música MIDI
                          automáticamente apenas alguien
                          entraba al sitio.
                        </p>

                      </td>

                    </tr>

                  </tbody>

                </table>

                <br />

                <center>

                  <img
                    src="https://media.tenor.com/Lm6B7L1QxSIAAAAi/globe-internet.gif"
                    alt="globe"

                    width="180"
                  />

                </center>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* FOOTER */}

      <footer
        style={{
          textAlign: "center",

          marginTop: "40px",

          fontSize: "0.9rem",

          color: "#333",
        }}
      >
        © 1999 EvoWeb Corporation - Mejor visto en resolución 800x600
      </footer>

    </main>
  )
}
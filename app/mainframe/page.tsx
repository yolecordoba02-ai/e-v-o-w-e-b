"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import Link from "next/link";

function MainframeBox({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <boxGeometry args={[2, 4, 2]} />
        <meshStandardMaterial color="#cfc7b0" />
      </mesh>
    </Float>
  );
}

function CRTScreen() {
  return (
    <Float speed={1.5} floatIntensity={1}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 2.5, 0.2]} />
        <meshStandardMaterial
          color="#39FF14"
          emissive="#39FF14"
          emissiveIntensity={2}
        />
      </mesh>
    </Float>
  );
}

export default function MainframeVRPage() {
  return (
    <main
      style={{
        width: "100%",
        height: "100vh",
        background: "#050510",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* OVERLAY UI */}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
          padding: "25px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          fontFamily: "Courier New",
        }}
      >
        <h1
          style={{
            color: "#39FF14",
            textShadow: "0 0 20px #39FF14",
            letterSpacing: "4px",
          }}
        >
          MAINFRAME VR
        </h1>

        <Link
          href="/timeline"
          style={{
            color: "#39FF14",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          ← Timeline
        </Link>
      </div>

      {/* TERMINAL */}

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "40px",
          zIndex: 10,
          background: "rgba(0,0,0,0.75)",
          border: "1px solid #39FF14",
          padding: "25px",
          borderRadius: "16px",
          color: "#39FF14",
          fontFamily: "Courier New",
          width: "420px",
          boxShadow: "0 0 30px rgba(57,255,20,0.4)",
        }}
      >
        <p>{"> SYSTEM READY"}</p>
        <p>{"> CONNECTING IBM 360..."}</p>
        <p>{"> LOADING ARCHIVE..."}</p>
        <p>{"> RUN PROGRAM.WEB"}</p>
      </div>

      {/* 3D SCENE */}

      <Canvas camera={{ position: [0, 2, 12], fov: 55 }}>
  {/* LIGHTS */}

  <ambientLight intensity={0.2} />

  <directionalLight
    position={[10, 10, 5]}
    intensity={2}
    color="#39FF14"
  />

  <pointLight
    position={[0, 3, 0]}
    intensity={3}
    color="#39FF14"
  />

  <fog attach="fog" args={["#02030A", 8, 35]} />

  {/* STARS */}

  <Stars
    radius={100}
    depth={60}
    count={7000}
    factor={6}
    saturation={0}
    fade
    speed={1}
  />

  {/* FLOOR GRID */}

  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
    <planeGeometry args={[200, 200]} />

    <meshStandardMaterial
      color="#050505"
      metalness={0.7}
      roughness={0.2}
    />
  </mesh>

  {/* MAINFRAME WALLS */}

  {[-12, -8, -4, 4, 8, 12].map((x, i) => (
    <Float
      key={i}
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <mesh position={[x, 0, -8]}>
        <boxGeometry args={[2.5, 7, 2]} />

        <meshStandardMaterial
          color="#cfc7b0"
          emissive="#1a1a1a"
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
    </Float>
  ))}

  {/* SIDE MAINFRAMES */}

  {[-10, -5, 5, 10].map((z, i) => (
    <Float
      key={i}
      speed={1.2}
      rotationIntensity={0.15}
      floatIntensity={0.4}
    >
      <mesh position={[-8, 0, z]}>
        <boxGeometry args={[2, 6, 2]} />

        <meshStandardMaterial
          color="#d8cfb5"
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>

      <mesh position={[8, 0, z]}>
        <boxGeometry args={[2, 6, 2]} />

        <meshStandardMaterial
          color="#d8cfb5"
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>
    </Float>
  ))}

  {/* CENTRAL CRT */}

  <Float speed={1.5} floatIntensity={0.5}>
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[5, 3, 0.3]} />

      <meshStandardMaterial
        color="#39FF14"
        emissive="#39FF14"
        emissiveIntensity={3}
      />
    </mesh>
  </Float>

  {/* FLOATING PARTICLES */}

  {Array.from({ length: 40 }).map((_, i) => (
    <mesh
      key={i}
      position={[
        (Math.random() - 0.5) * 30,
        Math.random() * 10,
        (Math.random() - 0.5) * 30,
      ]}
    >
      <sphereGeometry args={[0.05, 8, 8]} />

      <meshStandardMaterial
        color="#39FF14"
        emissive="#39FF14"
        emissiveIntensity={3}
      />
    </mesh>
  ))}

  {/* PORTAL */}

  <Float speed={2} floatIntensity={1}>
    <mesh position={[0, 4, -12]}>
      <torusGeometry args={[2, 0.15, 16, 100]} />

      <meshStandardMaterial
        color="#3B82F6"
        emissive="#3B82F6"
        emissiveIntensity={4}
      />
    </mesh>
  </Float>

  {/* CAMERA */}

  <OrbitControls
    enablePan={false}
    maxPolarAngle={Math.PI / 2.05}
    minDistance={6}
    maxDistance={18}
    autoRotate
    autoRotateSpeed={0.4}
  />
</Canvas>
    </main>
  );
}
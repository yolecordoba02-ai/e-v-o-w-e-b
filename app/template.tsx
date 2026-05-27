"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()

  return (

    <AnimatePresence mode="wait">

      <motion.div

        key={pathname}

        initial={{
          opacity: 0,
          y: 40,
          scale: 0.98,
          filter: "blur(12px)",
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}

        exit={{
          opacity: 0,
          y: -40,
          scale: 1.02,
          filter: "blur(12px)",
        }}

        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}

        style={{
          minHeight: "100vh",
        }}
      >

        {children}

      </motion.div>

    </AnimatePresence>
  )
}
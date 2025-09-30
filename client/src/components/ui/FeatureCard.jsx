import React from 'react'
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./card"

function FeatureCard({ title, description, isInView, index }) {
  return (
    <motion.Card
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.3 }}
      className="
        bg-white/5 backdrop-blur-md rounded-2xl 
        p-3 sm:p-4 md:p-6 flex flex-col gap-2 sm:gap-3 border border-[#FF6B35] 
        hover:scale-105 hover:border-indigo-500 transition-transform duration-300 cursor-pointer shadow-lg
        w-full
        h-[calc((100vh-4rem)/4)] sm:h-[calc((100vh-5rem)/4)] md:min-h-[220px]
      "
    >
      <CardHeader>
        <CardTitle className="text-base sm:text-lg md:text-2xl font-semibold text-white flex items-center gap-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs sm:text-sm md:text-lg text-stone-400">
          {description}.
        </p>
      </CardContent>
    </motion.Card>
  )
}

export default FeatureCard
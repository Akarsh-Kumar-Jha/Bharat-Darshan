import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { motion, useInView } from "framer-motion";

function FeatureCard({title,description,isInView,index}) {
  return (
    <motion.Card
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, delay: index * 0.3 }}
    className='bg-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-3 border border-[#FF6B35] hover:scale-105 hover:border-indigo-500 transition-transform duration-300 cursor-pointer shadow-lg'>
  <CardHeader>
    <CardTitle className='text-xl md:text-2xl font-semibold text-white flex items-center gap-2'>{title}</CardTitle>
  </CardHeader>
  <CardContent>
    <p className='text-stone-400 text-base md:text-lg'>{description}.</p>
  </CardContent>
</motion.Card>
  )
}

export default FeatureCard
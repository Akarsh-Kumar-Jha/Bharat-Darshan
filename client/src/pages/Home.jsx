import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, useInView } from "framer-motion";
import FeatureCard from "../components/ui/FeatureCard";
import { FocusCards } from "@/components/ui/focus-cards";

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};
const Features_list = [
  {
    id: 1,
    title: "🗺️ Interactive Map",
    description: "Explore state-wise travel spots, covering both spiritual and general tourism locations."
  },
  {
    id: 2,
    title: "🤖 AI-Powered Trip Planner",
    description: "Get personalized itineraries based on travel styles like Relaxation, Adventure, Family, Romantic, and Cultural."
  },
  {
    id: 3,
    title: "🎭 Cultural Insights & Local Experiences",
    description: "Connect with local guides, artisans, and homestays to experience authentic culture, festivals, food, and crafts."
  },
  {
    id: 4,
    title: "📊 Analytics Dashboard",
    description: "For businesses and tourism boards: gain visitor insights, forecast demand, and track cultural trends."
  }
];

const festivalCards = [
  {
    title: "Diwali",
    src: "https://i.pinimg.com/736x/e9/68/4b/e9684b3499cc8b1745e391fe96299717.jpg",
  },
  {
    title: "Holi",
    src: "https://i.pinimg.com/736x/9b/2c/50/9b2c507d0c2a1ef77da265b5d59c8575.jpg",
  },
  {
    title: "Durga Puja",
    src: "https://i.pinimg.com/736x/e9/91/9f/e9919f543ef4fe6f9589a4db0b113c1d.jpg",
  },
  {
    title: "Chhath Puja",
    src: "https://i.pinimg.com/736x/dc/44/3e/dc443e5d974cee1d41a4f7ea691265b9.jpg",
  },
  {
    title: "Eid",
    src: "https://i.pinimg.com/736x/b2/79/b7/b279b7e1ba3c7525fdb7f2b6e3036a3c.jpg",
  },
  {
    title: "Navratri",
    src: "https://i.pinimg.com/1200x/a0/c6/94/a0c694ad09050f6df1e946972ebe3115.jpg",
  },
];



function Home() {
  const navItems = [{name:"Home",to:"/"}, {name:"Interactive Map", to:"/map"}, {name:"Ai Trip Planner",to:'/map'},{name:"About Us",to:"/about"}];
  const ref = useRef(null);
   const isInView = useInView(ref, { once: true });
   console.log("isInView", isInView);
   const destRef = useRef(null);
   const destInView = useInView(destRef, { once: true });

  return (
    <motion.div
      className="min-h-screen w-full bg-black"
      style={{
        backgroundImage: `
        linear-gradient(to right, #262626 1px, transparent 1px),
        linear-gradient(to bottom, #262626 1px, transparent 1px)
      `,
        backgroundSize: "20px 20px",
      }}
    >
      <section
        id="Hero"
        className="h-screen w-full flex flex-col md:flex-row items-center justify-between overflow-hidden"
      >
        {/* Left Side */}
        <div className="w-full md:w-[50%] h-full flex flex-col">
          {/* Navbar */}
          <div className="flex justify-between items-center h-[10vh] px-5 mt-5">
            <div className="size-50">
              <img
                className="h-full w-full object-contain"
                src="https://res.cloudinary.com/dlnzbkyit/image/upload/v1758636663/Gemini_Generated_Image_9odpi09odpi09odp__1_-removebg-preview_eu3myl.png"
                alt="Logo"
              />
            </div>

            <nav className="flex flex-row gap-x-6">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({isActive}) => isActive ? "text-green-400" : "text-sm font-medium text-white hover:text-indigo-400"}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div>
              <img
                className="w-10 h-10 rounded-full"
                src="https://api.dicebear.com/9.x/initials/svg?seed=Felix"
                alt="User Avatar"
              />
            </div>
          </div>

          {/* Hero Text */}
          <div className="flex-1 w-[95%] mx-auto flex flex-col justify-center items-start gap-7 text-center px-4">
            <motion.h1 
            initial={{ opacity: 0,x:-100 }}
            animate={{ opacity: 1,x:0 }}
            transition={{ duration: 1.2, ease: "easeInOut"}}
            className="text-5xl md:text-6xl text-shadow-lg lg:text-7xl selection:text-green-400 font-bold text-left text-white tracking-tighter">
              India Awaits <br />
              <span className="text-[#FF6B35]">Your Discovery</span>
            </motion.h1>
            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut"}}
            className="text-lg font-semibold bg-clip-text text-gray-400 selection:text-white">
              Embark on an unforgettable journey across India’s vibrant
              landscapes, from bustling cities to serene villages, majestic
              mountains to tranquil backwaters, and timeless heritage to modern
              marvels — experience the true spirit of Bharat with every step.
            </motion.p>
          </div>
        </div>

        {/* Right Side (Slider) */}
        <div className="w-full md:w-[50%] h-[60vh] md:h-full flex justify-center items-center">
          <Slider
            className="w-[90%] h-[90%] rounded-2xl overflow-hidden bg-gray-700"
            {...settings}
          >
            <div className="h-full w-full">
              <img
                className="h-full w-full object-cover object-center"
                src="https://i.pinimg.com/1200x/8b/62/94/8b629436253c83f7bb804acc9e3f7e6c.jpg"
                alt="Scenic India 1"
              />
            </div>
            <div className="h-full w-full">
              <img
                className="h-full w-full object-cover object-center"
                src="https://images.unsplash.com/photo-1677700435970-1c76d7198eac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEtlcmVsYXxlbnwwfDJ8MHx8fDA%3D"
                alt="Scenic India 2"
              />
            </div>
            <div className="h-full w-full">
              <img
                className="h-full w-full object-cover object-center"
                src="https://images.unsplash.com/photo-1730038984644-efa04e4db45d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fGhpbWFsYXlhc3xlbnwwfDJ8MHx8fDA%3D"
                alt="Scenic India 3"
              />
            </div>
            <div className="h-full w-full">
              <img
                className="h-full w-full object-cover object-center"
                src="https://images.unsplash.com/photo-1540248925259-92984576b034?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGluZGlhJTIwdG91cmlzbXxlbnwwfDJ8MHx8fDA%3D"
                alt="Scenic India 3"
              />
            </div>
          </Slider>
        </div>
      </section>

   <section 
  ref={ref} 
  className="h-screen mt-12 w-full flex flex-col items-center justify-between overflow-hidden"
>
  <div className="w-full md:w-[50%] flex flex-col justify-center items-center gap-y-5 py-5">
    <motion.h2
      initial={{ opacity: 0, x: -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.2 }}
      className="text-3xl md:text-5xl font-bold text-center text-white tracking-tighter"
    >
      Why Choose <span className="text-[#FF6B35]">Bharat Darshan?</span>
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      className="text-xl md:text-2xl text-center text-stone-400 max-w-3xl"
    >
      “Discover travel experiences that are curated to bring you closer to the culture, history, and beauty of India.”
    </motion.p>
  </div>

  <div className="mt-16 w-full md:w-[80%] grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14 mb-auto">
    {Features_list?.map((feature, index) => (
      <FeatureCard isInView={isInView} key={index} index={index} title={feature.title} description={feature.description} />
      // <motion.div
      //   key={index}
      //   initial={{ opacity: 0, y: 50 }}
      //   animate={isInView ? { opacity: 1, y: 0 } : {}}
      //   transition={{ duration: 0.8, delay: index * 0.2 }}
      //   className="bg-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-3 border border-white/10 hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
      // >
      //   <h3 className="text-xl md:text-2xl font-semibold text-white flex items-center gap-2">
      //     {feature.title}
      //   </h3>
      //   <p className="text-stone-400 text-base md:text-lg">{feature.description}</p>
      // </motion.div>
    ))}
  </div>
</section>


<section ref={destRef} className="min-h-screen relative mt-12 w-full flex flex-col items-center justify-center overflow-hidden">
  <div className="w-full md:w-[50%] flex flex-col justify-center items-center gap-y-5 py-2 mb-7">
      <motion.h2
      initial={{ opacity: 0, x: -100 }}
      animate={destInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.2 }} 
      className="text-3xl md:text-5xl font-bold text-center text-white tracking-tighter">“Celebrate the Colors of <span className="text-[#FF6B35]">India</span>”</motion.h2>
      <motion.p
      initial={{ opacity: 0 }}
      animate={destInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      className="text-xl md:text-2xl text-center text-stone-400 max-w-3xl">With Bharat Darshan, experience India’s rich traditions, vibrant festivals, and timeless celebrations.</motion.p>
  </div>
    <FocusCards cards={festivalCards} />
<footer className="w-full h-[8vh] flex justify-center items-center mt-5 mb-5">
 <div className="text-center text-white my-auto text-xl bg-black/60 border-2 border-[#FF6B35] w-fit px-3 py-2 rounded-2xl">Made with ❤️ by Team Code Sanskriti</div>
</footer>
</section>
    </motion.div>
  );
}

export default Home;

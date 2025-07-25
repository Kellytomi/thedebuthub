"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import IntroBody from "./IntroBody";
import IntroTitle from "./IntroTitle";

export default function MusicPulseSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1, // Trigger when 10% of element is visible
    triggerOnce: false, // Allow multiple triggers
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const badgeVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.4,
      },
    },
  };

  // Handle inView changes
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden mx-auto w-full h-[796px] md:h-[1180px] xl:h-[875px] bg-[#030303]"
      initial="hidden"
      animate={controls}
    >
      {/* Blue glow blur effect */}
      <div className="absolute w-8 h-[1024px] top-[14px] left-[1298px] bg-[#006DFF] backdrop-blur-[300px] blur-[150px]" />

      {/* Main content container */}
      <div className="relative z-10 h-full flex flex-col items-center">
        <IntroTitle line1="Top songs" line2="From Nigeria" />

        <IntroBody
          title="Music Pulse"
          description="Daily updates on new releases, industry moves, and what your favorite artists are up to. No fluff, just real music stories"
        />

        <motion.div variants={containerVariants}>
          <div className="relative xl:hidden w-full mt-16 flex justify-center">
            <motion.div
              className="relative w-[340px] md:w-[373px] h-auto"
              variants={cardVariants}
              custom={0}
            >
              <motion.div
                variants={badgeVariants}
                className="absolute -top-12 -right-3 md:-right-12 z-10"
              >
                <Image
                  src="/images/best-todo.svg"
                  alt="Badge"
                  width={100}
                  height={100}
                />
              </motion.div>
              <Image
                src="/images/mpulse-card-main.png"
                alt="Rema Tweet Card"
                width={373}
                height={372}
                className="relative rounded-lg shadow-2xl w-[340px] h-[360px] md:w-[373px] md:h-[372px]"
              />
            </motion.div>
          </div>

          {/* Cards container */}
          <motion.div
            className="mt-6 xl:mt-16 flex justify-center items-center gap-6 relative"
            variants={containerVariants}
          >
            {/* Card 1 */}
            <motion.div
              variants={cardVariants}
              custom={0}
            >
              <Image
                src="/images/mpulse-card-1.png"
                alt="Asake Tweet Card"
                width={373}
                height={302}
                className="hidden md:block rounded-lg shadow-xl w-[273px] h-[202px] lg:w-[373px] lg:h-[302px]"
              />
            </motion.div>

            {/* Card 2 with badge */}
            <motion.div
              className="relative hidden xl:block"
              variants={cardVariants}
              custom={1}
            >
              <motion.div
                variants={badgeVariants}
                className="absolute -top-12 -right-12 z-10"
              >
                <Image
                  src="/images/best-todo.svg"
                  alt="Badge"
                  width={100}
                  height={100}
                />
              </motion.div>
              <Image
                src="/images/mpulse-card-main.png"
                alt="Rema Tweet Card"
                width={373}
                height={372}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={cardVariants}
              custom={2}
            >
              <Image
                src="/images/mpulse-card-2.png"
                alt="Crayon Tweet Card"
                width={373}
                height={302}
                className="hidden md:block rounded-lg shadow-xl w-[273px] h-[202px] lg:w-[373px] lg:h-[302px]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import IntroBody from "./IntroBody";
import ActionButton from "./ActionButton";
import Image from "next/image";
import { useEffect } from "react";

export default function WhoWeAreSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Handle inView changes
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

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

  const childVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };
  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden mx-auto w-full h-[955px] sm:h-[875px] xl:h-[665px] bg-[#030303] pt-20"
      initial="hidden"
      animate={controls}
    >
      <Image
        src="/images/star-section-decor.svg"
        alt="grid pattern background"
        width={36}
        height={39}
        priority
        className="absolute w-full h-auto object-contain top-0 left-0 z-0"
      />
      <div className="relative w-full h-full bg-black/50">
          <IntroBody
            title="Empowering Sound. Elevating Stories"
            description="DebutHub is a global music community built by artists, for artists. We believe in authenticity, creativity, and giving power back to creators"
          />

        <div className="max-w-[1350px] mx-auto flex flex-col xl:flex-row h-auto pt-16 gap-20">
          <motion.div
            className="flex flex-col px-2 md:px-10 xl:px-0 items-center xl:items-start justify-center gap-6 order-1 xl:order-1"
            variants={containerVariants}
          >
            <motion.h2
              className="text-[32px] text-white font-medium text-center xl:text-left"
              variants={childVariants}
            >
              Who We Are
            </motion.h2>
            <motion.p
              className="text-white/70 w-[330px] md:w-[526px] font-dm-sans text-[20px] text-center xl:text-left"
              variants={childVariants}
            >
              We&apos;re on a mission to amplify voices in music — whether you&apos;re
              just starting or hitting milestones. Join us in reshaping the
              music landscape
            </motion.p>
            <motion.div variants={buttonVariants} whileHover="hover">
              <ActionButton onClick={() => alert("Action triggered!")}>
                Know More
              </ActionButton>
            </motion.div>
          </motion.div>

          <motion.div variants={imageVariants} className="flex-1 order-2 xl:order-2">
            <div className="flex justify-center xl:justify-end">
              <Image
                src="/images/tdh-section-pt.svg"
                alt="Asake Tweet Card"
                width={740}
                height={367}
                className="rounded-lg shadow-xl w-[500px] px-2 sm:pr-10 xl:w-[740px] xl:h-[367px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

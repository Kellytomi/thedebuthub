"use client";

import { motion, useAnimation, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IntroBody, Button } from "@/components/ui";
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
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const childVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const buttonVariants: Variants = {
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
      className="relative overflow-hidden mx-auto w-full bg-[#030303] py-20"
      initial="hidden"
      animate={controls}
    >
      <Image
        src="/images/star-section-decor.svg"
        alt="decorative background pattern"
        fill
        className="absolute inset-0 object-cover z-0"
        loading="eager"
        sizes="100vw"
        style={{
          opacity: 0.5,
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
      <div className="relative w-full bg-black/50">
          <IntroBody
            title="Empowering Sound. Elevating Stories"
            description="DebutHub is a global music community built by artists, for artists. We believe in authenticity, creativity, and giving power back to creators"
          />

        <div className="max-w-[1350px] mx-auto flex flex-col xl:flex-row items-center justify-between pt-12 gap-10 xl:gap-16 px-4 md:px-10">
          <motion.div
            className="flex flex-col items-center xl:items-start justify-center gap-6 order-1 xl:order-1 flex-1 min-w-0"
            variants={containerVariants}
          >
            <motion.h2
              className="text-[32px] text-white font-medium text-center xl:text-left"
              variants={childVariants}
            >
              Who We Are
            </motion.h2>
            <motion.p
              className="text-white/70 w-full max-w-[526px] font-dm-sans text-[20px] text-center xl:text-left"
              variants={childVariants}
            >
              We&apos;re on a mission to amplify voices in music — whether you&apos;re
              just starting or hitting milestones. Join us in reshaping the
              music landscape
            </motion.p>
            <motion.div variants={buttonVariants} whileHover="hover">
              <Button onClick={() => window.open("https://x.com/thedebuthub", "_blank")} ariaLabel="Learn more about us">
                Know More
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={imageVariants} className="flex-1 order-2 xl:order-2 min-w-0 w-full">
            <div className="flex justify-center xl:justify-end">
              <Image
                src="/images/tdh-section-pt.svg"
                alt="Asake Tweet Card"
                width={740}
                height={367}
                className="rounded-lg shadow-xl w-full max-w-[740px] h-auto"
                sizes="(max-width: 1280px) calc(100vw - 32px), 740px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

import Banner from "@/Components/Banner";

import ProductCards from "@/Components/ProductCards";
import WelcomeLayout from "@/Layouts/WelcomeLayout";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { useEffect } from "react";
import Review from "@/Components/pagewelcome/Review";

export default function Welcome({ products }) {
    const sectionVariant = {
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        hidden: { opacity: 0, scale: 0.95 },
    };

    const AnimatedSection = ({ children, delay = 0 }) => {
        const controls = useAnimation();
        const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.5, // Adjust this value based on when you want the animation to start
        });

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
                variants={sectionVariant}
                initial="hidden"
                animate={controls}
                transition={{ delay: delay, type: "linear" }}
            >
                {children}
            </motion.section>
        );
    };

    return (
        <WelcomeLayout>
            <AnimatedSection>
                <Banner />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="relative mx-auto max-w-screen-xl mt-8  sm:px-6 lg:flex  lg:items-center ">
                    <h1 className="font-bold text-3xl">Product</h1>
                </div>
                <div className="relative mx-auto max-w-screen-xl  py-12 sm:px-6 lg:flex  lg:items-center lg:px-8">
                    <div className="grid grid-cols-1 gap-1 lg:grid-cols-5 lg:gap-4">
                        <ProductCards products={products} />
                    </div>
                </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="relative mx-auto max-w-screen-xl  py-12 sm:px-6 lg:flex  lg:items-center lg:px-8">
                    <Review />
                </div>
            </AnimatedSection>
        </WelcomeLayout>
    );
}

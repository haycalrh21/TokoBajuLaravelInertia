import { Component } from "@/Components/component/component";
import { Footer } from "@/Components/component/footer";
// import Footer from "@/Components/Footer";
import Header from "@/Components/Header";

import { motion, useScroll } from "framer-motion";
export default function WelcomeLayout({ children, isFooterFixed = false }) {
    const { scrollYProgress } = useScroll();

    return (
        <>
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="fixed top-0 left-0 z-50 w-full bg-blue-500 h-1 origin-left"
            >
                <h1 className="sr-only">
                    <code>useScroll</code> demo
                </h1>
            </motion.div>
            <div>
                <Component />
            </div>

            <div>{children}</div>
            <div>
                <Footer isFixed={isFooterFixed} />
            </div>
        </>
    );
}

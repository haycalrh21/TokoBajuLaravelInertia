import Footer from "@/Components/Footer";
import Header from "@/Components/Header";

export default function WelcomeLayout({ children }) {
    return (
        <div>
            <div>
                <Header />
            </div>

            <div>{children}</div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

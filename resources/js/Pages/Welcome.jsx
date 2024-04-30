import Banner from "@/Components/Banner";
import Review from "@/Components/pagewelcome/Review";
import ProductCards from "@/Components/ProductCards";
import WelcomeLayout from "@/Layouts/WelcomeLayout";
export default function Welcome({ products }) {
    return (
        <>
            <WelcomeLayout>
                <section>
                    <div>
                        <Banner />
                    </div>
                </section>
                <section>
                    <div className="relative mx-auto max-w-screen-xl mt-8  sm:px-6 lg:flex  lg:items-center ">
                        <h1 className="font-bold text-3xl">Product</h1>
                    </div>
                    <div className="relative mx-auto max-w-screen-xl  py-12 sm:px-6 lg:flex  lg:items-center lg:px-8">
                        <div className="grid grid-cols-1 gap-1 lg:grid-cols-5 lg:gap-4">
                            <ProductCards products={products} />
                        </div>
                    </div>
                </section>

                <section>
                    <Review />
                </section>
            </WelcomeLayout>
        </>
    );
}

import ProductCollection from "@/Components/ProductCollection";
import WelcomeLayout from "@/Layouts/WelcomeLayout";
import React from "react";

export default function Products({ products }) {
    console.log(products);
    return (
        <WelcomeLayout>
            <ProductCollection products={products} />
        </WelcomeLayout>
    );
}

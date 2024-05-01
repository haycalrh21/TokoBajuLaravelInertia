import { DetailPage } from "@/Components/component/detail-page";
import WelcomeLayout from "@/Layouts/WelcomeLayout";
import React from "react";

export default function Test({ products }) {
    return (
        <>
            <WelcomeLayout>
                <DetailPage products={products} />
            </WelcomeLayout>
        </>
    );
}

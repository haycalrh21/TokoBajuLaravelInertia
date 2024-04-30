import AdminLayout from "@/Layouts/admin/AdminLayout";
import React from "react";
import ProductForm from "./form/Form";
import DetailPage from "@/Components/pagewelcome/DetailPage";

export default function AdminProduct() {
    return (
        <AdminLayout>
            <div className="font-bold text-3xl">Admin Product</div>
            <div>
                <ProductForm />
            </div>
        </AdminLayout>
    );
}

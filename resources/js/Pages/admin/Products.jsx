import AdminLayout from "@/Layouts/admin/AdminLayout";
import React from "react";
import ProductForm from "./form/Form";
import DetailPage from "@/Components/pagewelcome/DetailPage";
import AdminCobaDeh from "@/Components/component/admin-page-layout";

export default function AdminProduct() {
    return (
        <AdminCobaDeh>
            <div className="font-bold text-3xl">Admin Product</div>
            <div>
                <ProductForm />
            </div>
        </AdminCobaDeh>
    );
}

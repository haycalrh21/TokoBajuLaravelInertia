import Stats from "@/Components/admin/Stats";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import React from "react";

export default function Dashboard({ usersCount, productCount, orderCount }) {
    console.log(productCount);
    return (
        <AdminLayout>
            <div>
                <h1 className="font-bold text-3xl">Halaman Dashboard Admin</h1>
            </div>
            <div>
                <Stats
                    usersCount={usersCount}
                    productsCount={productCount}
                    ordersCount={orderCount}
                />
            </div>
        </AdminLayout>
    );
}

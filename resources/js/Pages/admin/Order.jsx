import AdminLayout from "@/Layouts/admin/AdminLayout";
import React from "react";
import { formatRupiah } from "@/helper/formatRupiah";
import AdminCobaDeh from "@/Components/component/admin-page-layout";

export default function Order({ payments }) {
    return (
        <AdminCobaDeh>
            <div>
                <div>
                    <h1 className="font-bold text-3xl">Halaman Order</h1>
                </div>
                <section>
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        ID
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Nama Pembeli
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Email
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Telepon
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Alamat
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Harga Total
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Detail Produk
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Status
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Tanggal Di Pesan
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Tanggal Di Update
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {payments.map((payment, index) => (
                                    <tr key={payment.id}>
                                        <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                            {payment.payment_details[0].name}
                                        </td>
                                        <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                            {payment.payment_details[0].email}
                                        </td>
                                        <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                            {payment.payment_details[0].phone}
                                        </td>
                                        <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                            {payment.payment_details[0].alamat}
                                        </td>
                                        <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                            {formatRupiah(payment.total_harga)}
                                        </td>
                                        <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                            {payment.payment_details
                                                .map(
                                                    (detail) =>
                                                        `${detail.product.name} (Size: ${detail.size}, Qty: ${detail.quantity})`
                                                )
                                                .join(", ")}
                                        </td>
                                        <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                            {payment.status}
                                        </td>
                                        <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                            {new Date(
                                                payment.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                            {new Date(
                                                payment.updated_at
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AdminCobaDeh>
    );
}

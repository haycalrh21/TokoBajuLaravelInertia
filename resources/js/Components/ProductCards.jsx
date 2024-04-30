import React, { useState } from "react";
import { formatRupiah } from "@/helper/formatRupiah";

export default function ProductCards({ products }) {
    return (
        <>
            {products.map((product) => {
                // State untuk menyimpan ukuran yang dipilih dan stoknya
                const [selectedSize, setSelectedSize] = useState(null);

                // Handler untuk perubahan pada radio button ukuran
                const handleSizeChange = (size) => {
                    setSelectedSize(size);
                };

                return (
                    <a
                        href={`/products/${product.id}`}
                        key={product.id}
                        className="group block overflow-hidden"
                    >
                        <div className="relative border border-gray-100 bg-white p-20">
                            {/* Gambar pertama dan kedua produk */}
                            <img
                                src={
                                    product.images && product.images.length > 0
                                        ? `/storage/${product.images[0].image_path.replace(
                                              "public/",
                                              ""
                                          )}`
                                        : "default.jpg"
                                }
                                alt={`Gambar produk ${product.name}`}
                                className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-75"
                            />
                        </div>

                        <div className="relative border border-gray-100 bg-white p-6">
                            <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                {product.name} - {formatRupiah(product.harga)}
                            </h3>
                        </div>
                    </a>
                );
            })}
        </>
    );
}

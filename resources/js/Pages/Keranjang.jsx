import React, { useState, useEffect } from "react";
import { formatRupiah } from "@/helper/formatRupiah";
import Header from "@/Components/Header";
import { Inertia } from "@inertiajs/inertia";
import WelcomeLayout from "@/Layouts/WelcomeLayout";

export default function Keranjang({ keranjangs }) {
    console.log(keranjangs);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const flattenedItems = keranjangs
            .map((keranjang) =>
                keranjang.details.map((detail) => ({
                    id: detail.product.id,
                    name: detail.product.name,
                    harga: detail.product.harga,
                    image_url: detail.product.images,
                    size: detail.size,
                    quantity: detail.quantity,
                }))
            )
            .flat();
        setItems(flattenedItems);
    }, [keranjangs]);
    console.log(items);
    const handleUpdateQuantity = (id, newQuantity) => {
        setLoading(true);

        Inertia.post(
            "/cart/update",
            {
                cart_detail_id: id,
                quantity: newQuantity,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onStart: () => {
                    setLoading(false);
                },
                onFinish: () => {
                    setLoading(true);
                },
            }
        );
    };

    const handleCheckout = () => {
        const orderData = {
            items: items.map((item) => ({
                product_id: item.id,
                size: item.size,
                quantity: item.quantity,
                harga: item.harga,
            })),
            totalHarga: calculateTotal(),
        };

        console.log("Order Data being sent:", orderData); // Pastikan ini mencetak data yang benar

        Inertia.post("/checkout", orderData, {
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
            onError: (error) => {
                console.error("Checkout failed:", error);
            },
        });
    };

    // Fungsi untuk menghitung total harga
    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + item.harga * item.quantity, 0);
    };

    const total = calculateTotal();
    if (!keranjangs || keranjangs.length === 0) {
        return (
            <div>
                <Header />
                <div className="fixed inset-0 bgbg-opacity-50 flex justify-center items-center pointer-events-none">
                    <span className="pointer-events-auto text-black text-xl">
                        Tidak ada Order
                    </span>
                </div>
            </div>
        );
    } else {
        return (
            <WelcomeLayout>
                {loading ? (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div
                            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
                            role="status"
                        >
                            <span className="absolute -m-1 h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-[rect(0,0,0,0)]">
                                Loading...
                            </span>
                        </div>
                    </div>
                ) : (
                    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                        <div className="mx-auto max-w-3xl">
                            <div className="mt-8">
                                {items.map((item) => (
                                    <ul className="space-y-4" key={item.id}>
                                        <li className="flex items-center gap-4">
                                            <img
                                                src={
                                                    item.image_url &&
                                                    item.image_url.length > 0
                                                        ? `/storage/${item.image_url[0].image_path.replace(
                                                              "public/",
                                                              ""
                                                          )}`
                                                        : "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaGooto1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                                                }
                                                alt=""
                                                className="size-16 rounded object-cover"
                                            />
                                            <div>
                                                <h3 className="text-sm text-gray-900">
                                                    {item.name}
                                                </h3>
                                                <h3 className="text-sm text-gray-900">
                                                    {formatRupiah(item.harga)}
                                                </h3>
                                                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                    <div>
                                                        <dt className="inline">
                                                            Size:{" "}
                                                        </dt>
                                                        <dd className="inline">
                                                            {item.size}
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                            <div className="flex flex-1 items-center justify-end gap-2">
                                                <form className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        className="text-sm leading-10 text-gray-600 transition hover:opacity-75"
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                item.id,
                                                                item.quantity -
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        readOnly
                                                        className="h-10 w-16 rounded border-gray-200 text-center"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="text-sm leading-10 text-gray-600 transition hover:opacity-75"
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </form>
                                                <button className="text-gray-600 transition hover:text-red-600">
                                                    <span className="sr-only">
                                                        Remove item
                                                    </span>
                                                    {/* Icon for remove item (SVG code can go here) */}
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                                <div className="w-screen max-w-lg space-y-4">
                                    <dl className="space-y-0.5 text-sm text-gray-700">
                                        <div className="flex justify-between">
                                            <dt>Subtotal</dt>
                                            <dd>{formatRupiah(total)}</dd>
                                        </div>
                                        <div className="flex justify-between !text-base font-medium">
                                            <dt>Total</dt>
                                            <dd>{formatRupiah(total)}</dd>
                                        </div>
                                    </dl>
                                    <div className="flex justify-end">
                                        <a
                                            onClick={handleCheckout}
                                            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                                        >
                                            Checkout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </WelcomeLayout>
        );
    }
}

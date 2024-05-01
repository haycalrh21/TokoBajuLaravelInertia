import { Component } from "@/Components/component/component";
import { Footer } from "@/Components/component/footer";
import Header from "@/Components/Header";
import { formatRupiah } from "@/helper/formatRupiah";
import WelcomeLayout from "@/Layouts/WelcomeLayout";
import { Inertia } from "@inertiajs/inertia";
import React, { useEffect, useState } from "react";

export default function Checkout({ orders }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [alamat, setAlamat] = useState("");
    const [message, setMessage] = useState("");
    const totalHarga = orders.reduce(
        (sum, order) => sum + parseFloat(order.total_harga),
        0
    );

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true); // Menandai bahwa proses submit dimulai
        Inertia.post(
            "/payment",
            {
                name,
                email,
                phone,
                alamat,
                message,
                totalHarga,
                orders,
            },
            {
                onFinish: () => setIsSubmitting(false), // Menandai bahwa proses submit selesai
            }
        );
    };

    console.log(orders);
    if (!orders || orders.length === 0) {
        return (
            <div>
                <WelcomeLayout isFooterFixed={true}>
                    <div className="mt-4 flex justify-center items-center pointer-events-none">
                        <span className="pointer-events-auto text-black text-xl">
                            Tidak ada Order
                        </span>
                    </div>
                </WelcomeLayout>
            </div>
        );
    } else {
        return (
            <WelcomeLayout>
                <div>
                    <section className="">
                        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                                <div className="lg:col-span-2 lg:py-12">
                                    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                                        <div className="mx-auto max-w-3xl">
                                            <header className="text-center">
                                                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                                                    Your Cart
                                                </h1>
                                            </header>

                                            <div className="mt-8">
                                                {orders.map((order) => (
                                                    <ul
                                                        className="space-y-4"
                                                        key={order.id}
                                                    >
                                                        {order.order_details.map(
                                                            (detail) => (
                                                                <li
                                                                    className="flex items-center gap-4"
                                                                    key={
                                                                        detail.id
                                                                    }
                                                                >
                                                                    <img
                                                                        src={
                                                                            detail.product &&
                                                                            detail
                                                                                .product
                                                                                .images
                                                                                .length >
                                                                                0
                                                                                ? `/storage/${detail.product.images[0].image_path.replace(
                                                                                      "public/",
                                                                                      ""
                                                                                  )}`
                                                                                : "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
                                                                        }
                                                                        alt=""
                                                                        className="size-16 rounded object-cover"
                                                                    />
                                                                    <div>
                                                                        <h3 className="text-sm text-gray-900">
                                                                            {
                                                                                detail
                                                                                    .product
                                                                                    .name
                                                                            }
                                                                        </h3>
                                                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                                            <div>
                                                                                <dt className="inline">
                                                                                    Size:
                                                                                </dt>
                                                                                <dd className="inline">
                                                                                    {
                                                                                        detail.size
                                                                                    }
                                                                                </dd>
                                                                            </div>
                                                                            <div>
                                                                                <dt className="inline">
                                                                                    Quantity:
                                                                                </dt>
                                                                                <dd className="inline">
                                                                                    {
                                                                                        detail.quantity
                                                                                    }
                                                                                </dd>
                                                                            </div>
                                                                        </dl>
                                                                    </div>
                                                                    <div className="flex flex-1 items-center justify-end gap-2">
                                                                        <form>
                                                                            <input
                                                                                type="number"
                                                                                min="1"
                                                                                value={
                                                                                    detail.quantity
                                                                                }
                                                                                className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 focus:outline-none"
                                                                                readOnly
                                                                            />
                                                                        </form>
                                                                        <button className="text-gray-600 transition hover:text-red-600">
                                                                            <span className="sr-only">
                                                                                Remove
                                                                                item
                                                                            </span>
                                                                        </button>
                                                                    </div>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                ))}

                                                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                                                    <div className="w-screen max-w-lg space-y-4">
                                                        <dl className="space-y-0.5 text-sm text-gray-700">
                                                            <div className="flex justify-between !text-base font-medium">
                                                                <dt>Total</dt>
                                                                <dd>
                                                                    {formatRupiah(
                                                                        totalHarga
                                                                    )}
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                                    <div>isi data diri</div>
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label
                                                className="sr-only"
                                                htmlFor="name"
                                            >
                                                Name
                                            </label>
                                            <input
                                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                                placeholder="Name"
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label
                                                    className="sr-only"
                                                    htmlFor="email"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                                    placeholder="Email address"
                                                    type="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    className="sr-only"
                                                    htmlFor="phone"
                                                >
                                                    Phone
                                                </label>
                                                <input
                                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                                    placeholder="Phone Number"
                                                    type="tel"
                                                    id="phone"
                                                    value={phone}
                                                    onChange={(e) =>
                                                        setPhone(e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                className="sr-only"
                                                htmlFor="alamat"
                                            >
                                                Alamat
                                            </label>
                                            <input
                                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                                placeholder="Alamat"
                                                type="text"
                                                id="alamat"
                                                value={alamat}
                                                onChange={(e) =>
                                                    setAlamat(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="sr-only"
                                                htmlFor="message"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                                placeholder="Message"
                                                rows="8"
                                                id="message"
                                                value={message}
                                                onChange={(e) =>
                                                    setMessage(e.target.value)
                                                }
                                            ></textarea>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                id="pay-button"
                                                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting
                                                    ? "Memproses..."
                                                    : "Bayar"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </WelcomeLayout>
        );
    }
}

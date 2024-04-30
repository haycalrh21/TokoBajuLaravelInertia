import React, { useEffect, useRef, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Header from "@/Components/Header";
import { formatRupiah } from "@/helper/formatRupiah";
import WelcomeLayout from "@/Layouts/WelcomeLayout";
import Invoice from "./Invoice";

export default function Payment({ payments }) {
    const [isSnapLoaded, setIsSnapLoaded] = useState(false);
    const buttonRefs = useRef([]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "YOUR_CLIENT_KEY"); // Ganti dengan kunci klien yang sebenarnya
        script.onload = () => setIsSnapLoaded(true);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (isSnapLoaded) {
            buttonRefs.current.forEach((btn, index) => {
                if (btn) {
                    btn.onclick = () => {
                        const payment = payments[index];
                        if (payment.snap_token) {
                            window.snap.pay(payment.snap_token, {
                                onSuccess: function (result) {
                                    alert("Payment successful!");
                                    updatePaymentStatus(payment.id, "success");
                                },
                                onPending: function (result) {
                                    alert(
                                        "Payment is pending. You will be notified once the payment is processed."
                                    );
                                    updatePaymentStatus(payment.id, "pending");
                                },
                                onError: function (result) {
                                    alert("Payment failed. Please try again.");
                                    updatePaymentStatus(payment.id, "failed");
                                },
                            });
                        }
                    };
                }
            });
        }
    }, [isSnapLoaded, payments]);

    const updatePaymentStatus = (paymentId, status) => {
        Inertia.post("/update-payment-status", {
            payment_id: paymentId,
            status: status,
        });
    };

    return (
        <WelcomeLayout>
            <section>
                <div>
                    <h1 className="font-bold text-3xl text-center">
                        Belum bayar
                    </h1>
                </div>
                <div>
                    {payments
                        .filter((payment) => payment.status === "pending")
                        .map((payment, index) => (
                            <div className="space-y-4 mb-4" key={payment.id}>
                                <details className="group" open>
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                                        <h2 className="font-medium">
                                            <p>Payment : {payment.id}</p>
                                            {formatRupiah(payment.total_harga)}
                                        </h2>
                                        <svg
                                            className="h-5 w-5 shrink-0 transition-transform duration-300 rotate-0 group-open:rotate-180"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </summary>
                                    <div className="mt-4 px-4 py-2 bg-gray-100 rounded-lg leading-relaxed text-gray-700">
                                        {payment.payment_details.map(
                                            (detail) => (
                                                <div
                                                    key={detail.id}
                                                    className="mb-3 p-2 border-b border-gray-300 last:border-b-0"
                                                >
                                                    <p>
                                                        Product ID:{" "}
                                                        <span className="font-semibold">
                                                            {detail.product_id}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Name:{" "}
                                                        <span className="font-semibold">
                                                            {detail.name}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Email:{" "}
                                                        <span className="font-semibold">
                                                            {detail.email}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Phone:{" "}
                                                        <span className="font-semibold">
                                                            {detail.phone}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Alamat:{" "}
                                                        <span className="font-semibold">
                                                            {detail.alamat}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Size:{" "}
                                                        <span className="font-semibold">
                                                            {detail.size}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Quantity:{" "}
                                                        <span className="font-semibold">
                                                            {detail.quantity}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Harga:{" "}
                                                        <span className="font-semibold">
                                                            {formatRupiah(
                                                                detail.harga
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>
                                            )
                                        )}
                                        <button
                                            ref={(el) =>
                                                (buttonRefs.current[index] = el)
                                            }
                                            className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </details>
                            </div>
                        ))}
                </div>
            </section>
            <br />
            <hr />
            <section>
                <div>
                    <h1 className="font-bold text-3xl text-center">
                        Sudah bayar
                    </h1>
                </div>
                {payments
                    .filter((payment) => payment.status === "success")
                    .map((payment, index) => (
                        <div className="space-y-4" key={payment.id}>
                            <details
                                className="group [&_summary::-webkit-details-marker]:hidden"
                                close
                            >
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                                    <h2 className="font-medium">
                                        <p>Payment : {payment.id}</p>
                                        {formatRupiah(payment.total_harga)}
                                    </h2>
                                    <svg
                                        className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </summary>
                                <p className="mt-4 px-4 leading-relaxed text-gray-700">
                                    <Invoice
                                        payment={payment.payment_details}
                                        status={payments}
                                    />
                                </p>
                            </details>
                        </div>
                    ))}
            </section>
        </WelcomeLayout>
    );
}

// Styling untuk tombol
const buttonStyle = {
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    marginTop: "20px",
};

import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia-react";
export default function Header() {
    const { auth } = usePage().props;

    const [isClick, setisClick] = useState(false);

    const toggleNavbar = () => {
        setisClick(!isClick);
    };

    const handleLogout = () => {
        Inertia.post(route("logout").url()).then(() => {
            Inertia.reload();
        });
    };

    return (
        <header className="bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-white">
                                <img
                                    src="/dend.jpg"
                                    alt="Logo"
                                    width={50}
                                    height={50}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-4">
                            <button>
                                <Link
                                    href="/"
                                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                                >
                                    Home
                                </Link>
                            </button>

                            <button>
                                <Link
                                    href="/products"
                                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                                >
                                    Products
                                </Link>
                            </button>
                            <button>
                                <Link
                                    href="/cart"
                                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                                >
                                    Keranjang
                                </Link>
                            </button>
                            <button>
                                <Link
                                    href="/co"
                                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                                >
                                    Order
                                </Link>
                            </button>
                            <button>
                                <Link
                                    href="/pembayaran"
                                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                                >
                                    Pembayaran
                                </Link>
                            </button>

                            {!auth.user && (
                                <Link
                                    href={route("login")}
                                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                                >
                                    Login
                                </Link>
                            )}
                            {auth.user && (
                                <p className="text-white">{auth.user.name}</p>
                            )}
                            {auth.user && (
                                <Link
                                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                                    href={route("logout")}
                                    method="post"
                                >
                                    Logout
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            className="inline-flex items-center justify-center p-2 rounded-md text-white md:text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={toggleNavbar}
                        >
                            {isClick ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                {isClick && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link
                                href="/"
                                className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                            >
                                home
                            </Link>
                            <Link
                                href="/products"
                                className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                            >
                                Products
                            </Link>
                            <Link
                                href="/cart"
                                className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                            >
                                Keranjang
                            </Link>
                            <Link
                                href="/co"
                                className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                            >
                                Order
                            </Link>
                            <Link
                                href="/pembayaran"
                                className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                            >
                                Pembayaran
                            </Link>
                            <Link>
                                {!auth.user && (
                                    <Link
                                        href={route("login")}
                                        className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                                    >
                                        Login
                                    </Link>
                                )}
                            </Link>

                            <Link>
                                {auth.user && (
                                    <Link
                                        className="text-white block hover:bg-white hover:text-black rounded-lg p-2"
                                        href={route("logout")}
                                        method="post"
                                    >
                                        Logout
                                    </Link>
                                )}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

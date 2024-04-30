import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Modal({ closeModal }) {
    const [name, setName] = useState("");
    const [harga, setHarga] = useState("");
    const [description, setDescription] = useState("");
    const [sizes, setSizes] = useState([{ size: "", stock: "" }]);
    const [images, setImages] = useState([]);

    const addSize = () => {
        setSizes((sizes) => [...sizes, { size: "", stock: "" }]);
    };

    const handleSizeChange = (index, field, value) => {
        const newSizes = sizes.map((size, idx) =>
            idx === index ? { ...size, [field]: value } : size
        );
        setSizes(newSizes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("harga", harga);
        formData.append("description", description);
        sizes.forEach((size) =>
            formData.append("sizes[]", JSON.stringify(size))
        );
        images.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        Inertia.post("/add-product", formData, {
            onBefore: () => console.log("Uploading..."),
            onSuccess: () => console.log("Upload successful"),
            onError: (errors) => console.log("Error uploading", errors),
            onFinish: () => console.log("Finished process"),
        });
    };

    return (
        <div>
            {/* Background blur dan modal container */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background semi-transparent
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backdropFilter: "blur(5px)", // Blur effect
                }}
            >
                <div
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        zIndex: 1001,
                        maxWidth: "600px",
                        width: "90%",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                >
                    <button onClick={closeModal}>Close</button>
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="name"
                                className="mb-2 font-semibold"
                            >
                                Product Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="harga"
                                className="mb-2 font-semibold"
                            >
                                Harga :
                            </label>
                            <input
                                type="number"
                                id="harga"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                                required
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="description"
                                className="mb-2 font-semibold"
                            >
                                Description:
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <div className="flex flex-col">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => setImages([...e.target.files])}
                                className="mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                        <div>
                            <label htmlFor="sizes" className="font-semibold">
                                Sizes & Stock:
                            </label>
                            {sizes.map((size, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-3 mt-2"
                                >
                                    <input
                                        type="text"
                                        value={size.size}
                                        onChange={(e) =>
                                            handleSizeChange(
                                                index,
                                                "size",
                                                e.target.value
                                            )
                                        }
                                        required
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="number"
                                        value={size.stock}
                                        onChange={(e) =>
                                            handleSizeChange(
                                                index,
                                                "stock",
                                                e.target.value
                                            )
                                        }
                                        required
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSize}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Add More Size
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

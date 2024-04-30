import { useState } from "react";
import Modal from "./modal/Modal";

export default function ProductForm() {
    const [modal, showModal] = useState(false);

    const openModal = () => {
        showModal(true);
    };

    const closeModal = () => {
        showModal(false);
    };
    return (
        <div>
            <button
                onClick={openModal}
                className="bg-blue-500 text-white rounded-lg p-2"
            >
                Tambah Product
            </button>
            {modal && <Modal closeModal={closeModal} />}
        </div>
    );
}

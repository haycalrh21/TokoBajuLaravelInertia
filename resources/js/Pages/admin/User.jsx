import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/admin/AdminLayout";
import React from "react";

export default function User({ users }) {
    return (
        <AdminLayout>
            <div>
                <div>
                    <h1 className="font-bold text-3xl mb-4">Halaman User</h1>
                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    ID
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Name
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Email
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Role
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.data.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                                        {user.name}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                                        {user.email}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                                        {user.role}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <Pagination links={users.links} />
                </div>
            </div>
        </AdminLayout>
    );
}

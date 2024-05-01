import AdminCobaDeh from "@/Components/component/admin-page-layout";

import React from "react";

import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/Components/ui/card";

import {
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
} from "@/Components/ui/table";

import { Badge } from "@/Components/ui/badge";
import { formatRupiah } from "@/helper/formatRupiah";
export default function Dashboard({
    usersCount,
    productCount,
    orderCount,
    totalPenjualan,
    topSelling,
}) {
    return (
        <AdminCobaDeh>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Orders</CardTitle>
                        <CardDescription>
                            The total number of orders placed on the platform.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="text-4xl font-bold">{orderCount}</div>
                        <ShoppingCartIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                        <CardDescription>
                            The total revenue generated from all orders.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="text-4xl font-bold">
                            {formatRupiah(totalPenjualan)}
                        </div>
                        <DollarSignIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>New Customers</CardTitle>
                        <CardDescription>
                            The number of new customers that have signed up.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="text-4xl font-bold">{usersCount}</div>
                        <UsersIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 ">
                <Card>
                    <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                        <CardDescription>
                            The best selling products on the platform.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Harga Satuan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.entries(topSelling)
                                    .sort(
                                        (a, b) =>
                                            b[1].total_quantity -
                                            a[1].total_quantity
                                    )
                                    .map(([productName, details]) => (
                                        <TableRow key={productName}>
                                            <TableCell>
                                                {details.product_name}
                                            </TableCell>
                                            <TableCell>
                                                {details.total_quantity}
                                            </TableCell>
                                            <TableCell>
                                                {details.harga_baju}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>
                            The most recent orders placed on the platform.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>#12345</TableCell>
                                    <TableCell>John Doe</TableCell>
                                    <TableCell>2023-04-01</TableCell>
                                    <TableCell>
                                        <Badge variant="success">
                                            Delivered
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>#12346</TableCell>
                                    <TableCell>Jane Smith</TableCell>
                                    <TableCell>2023-03-31</TableCell>
                                    <TableCell>
                                        <Badge variant="warning">Pending</Badge>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>#12347</TableCell>
                                    <TableCell>Bob Johnson</TableCell>
                                    <TableCell>2023-03-30</TableCell>
                                    <TableCell>
                                        <Badge variant="danger">
                                            Cancelled
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Product</CardTitle>
                        <CardDescription>
                            The total number of orders placed on the platform.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="text-4xl font-bold">{productCount}</div>
                        <ShoppingCartIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    </CardContent>
                </Card>
            </div>
        </AdminCobaDeh>
    );
}

function BellIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    );
}

function DollarSignIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    );
}

function HomeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function MenuIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}

function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}

function Package2Icon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
        </svg>
    );
}

function PackageIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    );
}

function ShoppingCartIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    );
}

function UsersIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

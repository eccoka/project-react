import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Stock } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PencilIcon } from 'lucide-react';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Item index',
        href: '/item/index',
    },
];
  
export default function StockIndex({stocks, success}: {stocks: {data: Stock[]; meta: {links: {label: string; url: string | null; active: boolean}[]}}; success: string}) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stocks" />
            {success && <div className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</div>}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Stock name</TableHead>
                            <TableHead>Stock code</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Edit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stocks.data.map((stock: Stock) => (
                            <TableRow key={stock.id}>
                                <TableCell>{stock.stock_name}</TableCell>
                                <TableCell>{stock.stock_code}</TableCell>
                                <TableCell>{stock.address}</TableCell>
                                <TableCell>{stock.phone}</TableCell>
                                <TableCell>{stock.status}</TableCell>
                                {stock.image ? (
                                    <TableCell>
                                        yes
                                    </TableCell>
                                ) :
                                    <TableCell>
                                        no
                                    </TableCell>
                                }
                                <TableCell>
                                    <Link href={route('stock.edit', stock.id)}>
                                        <PencilIcon className="size-4" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination className="mt-4">
                    <PaginationContent>
                        {stocks.meta.links.map((link, index) =>
                            link.label === '&laquo; Previous' ? (
                                <PaginationItem key={index}>
                                    <PaginationPrevious isActive={link.active} href={link.url ?? undefined} />
                                </PaginationItem>
                            ) : link.label === 'Next &raquo;' ? (
                                <PaginationItem key={index}>
                                    <PaginationNext isActive={link.active} href={link.url ?? undefined} />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={index}>
                                    <PaginationLink isActive={link.active} href={link.url ?? undefined}>
                                        {index}
                                    </PaginationLink>
                                </PaginationItem>
                            ),
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </AppLayout>
    )
}
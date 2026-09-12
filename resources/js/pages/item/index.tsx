import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Item } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PencilIcon } from 'lucide-react';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Item index',
        href: '/item/index',
    },
];

export default function ItemIndex({
    items, success
}: {
    items: { data: Item[]; meta: { links: { label: string; url: string | null; active: boolean }[] } }; success: string
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            {success && <div className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</div>}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item group</TableHead>
                            <TableHead>Item brand</TableHead>
                            <TableHead>Item name</TableHead>
                            <TableHead>Item description</TableHead>
                            <TableHead>Item status</TableHead>
                            <TableHead>Item price</TableHead>
                            <TableHead>Item discount</TableHead>
                            <TableHead>Edit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.data.map((item: Item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.group}</TableCell>
                                <TableCell>{item.brand}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.discount}</TableCell>
                                <TableCell>
                                    <Link href={route('item.show', item.id)}>
                                        <PencilIcon className="size-4" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <Pagination className="mt-4">
                    <PaginationContent className="flex items-center justify-between">
                        {items.meta.links.map((link, index) =>
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
    );
}
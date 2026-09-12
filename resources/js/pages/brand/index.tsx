import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type Brand, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PencilIcon } from 'lucide-react';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User index',
        href: '/user/index',
    },
];

export default function BrandIndex({
    brands,
}: {
    brands: { data: Brand[]; meta: { links: { label: string; url: string | null; active: boolean }[] } };
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Brand name</TableHead>
                            <TableHead>Brand motto/title</TableHead>
                            <TableHead>Brand website</TableHead>
                            <TableHead>Brand logo</TableHead>
                            <TableHead>Brand status</TableHead>
                            <TableHead>Edit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {brands.data.map((brand: Brand) => (
                            <TableRow key={brand.id}>
                                <TableCell>{brand.name}</TableCell>
                                <TableCell>{brand.motto}</TableCell>
                                <TableCell>{brand.website}</TableCell>
                                <TableCell>{brand.logo !== null ? 'yes' : 'no'}</TableCell>
                                <TableCell>{brand.status}</TableCell>
                                <TableCell>
                                    <Link href={route('brand.edit', brand.id)}>
                                        <PencilIcon className="size-4" />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination className="mt-4">
                    <PaginationContent>
                        {brands.meta.links.map((link, index) =>
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

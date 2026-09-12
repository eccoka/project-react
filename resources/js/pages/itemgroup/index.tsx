import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Itemgroup } from '@/types';
import { PencilIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { FormEventHandler } from 'react';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Itemgroup index',
        href: '/itemgroup/index',
    },
];

export default function ItemgroupIndex({ itemgroups, success, error }: { itemgroups: { data: Itemgroup[] } | Itemgroup[]; success: string; error: string }) {
        const user = (usePage() as { props: { auth: { user: { id: number } } } }).props.auth.user;
        const { get,  } = useForm({

            user_id: user.id,
     //       _method: "PUT",
        });
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedMain, setSelectedMain] = useState<string | null>(null);
    const [selectedSub1, setSelectedSub1] = useState<string | null>(null);
    const [selectedSub2, setSelectedSub2] = useState<string | null>(null);

    const itemsPerPage = 12;

    // Ensure we always work with an array
    const items = Array.isArray(itemgroups) ? itemgroups : itemgroups.data;

    // Extract unique main categories
    const uniqueMainCategories = Object.values(
        items.reduce((acc, item) => {
            if (!acc[item.main] || acc[item.main].id > item.id) {
                acc[item.main] = item;
            }
            return acc;
        }, {} as Record<string, Itemgroup>)
    );
    
    const uniqueSub1Categories = selectedMain
        ? Object.values(
              items.reduce((acc, item) => {
                  if (item.main === selectedMain && item.sub1) {
                      if (!acc[item.sub1] || acc[item.sub1].id > item.id) {
                          acc[item.sub1] = item;
                      }
                  }
                  return acc;
              }, {} as Record<string, Itemgroup>)
          )
        : [];
    
    const uniqueSub2Categories = selectedSub1
        ? Object.values(
              items.reduce((acc, item) => {
                  if (item.sub1 === selectedSub1 && item.sub2) {
                      if (!acc[item.sub2] || acc[item.sub2].id > item.id) {
                          acc[item.sub2] = item;
                      }
                  }
                  return acc;
              }, {} as Record<string, Itemgroup>)
          )
        : [];
    

        const deleteItemGroup = (itemgroup: Itemgroup) => {
            if (!window.confirm("Are you sure you want to delete the survey?")) {
                return;
            }
            router.delete(route("itemgroup.destroy", itemgroup.id));
        };
    
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    
        const selectedId = selectedSub2
            ? uniqueSub2Categories.find((sub2) => sub2.sub2 === selectedSub2)?.id
            : selectedSub1
            ? uniqueSub1Categories.find((sub1) => sub1.sub1 === selectedSub1)?.id
            : uniqueMainCategories.find((main) => main.main === selectedMain)?.id;
    
        if (selectedId) {
            get(route("itemgroup.edit", { id: selectedId }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Itemgroups" />
            {success && <div className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</div>}
            {error && <div className="mb-4 rounded bg-red-600 px-4 py-2 text-white">{error}</div>}
            <form className="flex flex-row gap-4 py-4 pl-4" onSubmit={submit}>
                <div>
                    <Select onValueChange={(value) => {
                        setSelectedMain(value);
                        setSelectedSub1(null);
                        setSelectedSub2(null);
                    }}>
                        <SelectTrigger id="main">
                            <SelectValue placeholder="Main Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {uniqueMainCategories.map((main) => (
                                <SelectItem key={main.id} value={String(main.main)}>
                                    {main.main}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                {uniqueSub1Categories.length > 0 && (
                    <Select onValueChange={(value) => {
                        setSelectedSub1(value);
                        setSelectedSub2(null);
                    }}>
                        <SelectTrigger id="sub1">
                            <SelectValue placeholder="Sub1 Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {uniqueSub1Categories.map((sub1) => (
                                <SelectItem key={sub1.id} value={String(sub1.sub1)}>
                                    {sub1.sub1}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
                </div>
                <div>
                {uniqueSub2Categories.length > 0 && (
                    <Select onValueChange={(value) => setSelectedSub2(value)}>
                        <SelectTrigger id="sub2">
                            <SelectValue placeholder="Sub2 Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {uniqueSub2Categories.map((sub2) => (
                                <SelectItem key={sub2.id} value={String(sub2.sub2)}>
                                    {sub2.sub2}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
                </div>
                <div>
                    <Button type='submit'>
                        <SearchIcon /> Search
                    </Button>
                </div>
            </form>

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table className="rounded-xl border-1">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pos. Main</TableHead>
                            <TableHead>Pos. Sub1</TableHead>
                            <TableHead>Pos. Sub2</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Edit</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.map((itemgroup) => (
                            <TableRow key={itemgroup.id}>
                                <TableCell>
                                    {itemgroup.mainpos}. {itemgroup.main}
                                </TableCell>
                                {itemgroup.sub1pos ? (
                                    <TableCell>
                                        {itemgroup.sub1pos}. {itemgroup.sub1}
                                    </TableCell>
                                ) : (
                                    <TableCell></TableCell>
                                )}
                                {itemgroup.sub2pos ? (
                                    <TableCell>
                                        {itemgroup.sub2pos}. {itemgroup.sub2}
                                    </TableCell>
                                ) : (
                                    <TableCell></TableCell>
                                )}
                                <TableCell>{itemgroup.status}</TableCell>
                                <TableCell>
                                    <Link href={route('itemgroup.edit', [itemgroup.id])}>
                                        <PencilIcon className="size-4" />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => deleteItemGroup(itemgroup)}>
                                        <Trash2Icon className="size-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <Pagination>
                    <PaginationContent className="flex items-center justify-center gap-2">
                        {currentPage > 1 ? (
                            <PaginationItem>
                                <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)}>Previous</PaginationPrevious>
                            </PaginationItem>
                        ) : (
                            <PaginationItem>
                                <PaginationPrevious className="pointer-events-none opacity-50">Previous</PaginationPrevious>
                            </PaginationItem>
                        )}

                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i + 1}>
                                <Button variant={currentPage === i + 1 ? 'default' : 'outline'} onClick={() => setCurrentPage(i + 1)}>
                                    {i + 1}
                                </Button>
                            </PaginationItem>
                        ))}

                        {currentPage < totalPages ? (
                            <PaginationItem>
                                <PaginationNext onClick={() => setCurrentPage(currentPage + 1)}>Next</PaginationNext>
                            </PaginationItem>
                        ) : (
                            <PaginationItem>
                                <PaginationNext className="pointer-events-none opacity-50">Next</PaginationNext>
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </AppLayout>
    );
}

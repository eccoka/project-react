import AppLayout from '@/layouts/app-layout';
import {type BreadcrumbItem} from '@/types';
import {type User} from "@/types";
import {Head, Link} from '@inertiajs/react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import {PencilIcon} from "lucide-react";

import {  Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,} from "@/components/ui/pagination";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User index',
        href: '/user/index',
    },
];

export default function SurveyIndex({users} : { users: { data: User[], meta: { links: { label: string, url: string | null, active: boolean }[] } } }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>First name</TableHead>
                            <TableHead>Last name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Edit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.map((user: User) => (
                        <TableRow key={user.id} >
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>
                                <Link href={route('user.edit', user.id)}> 
                                    <PencilIcon className="size-4" />
                                </Link>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                    <Pagination>
                        <PaginationContent>
                            {users.meta.links.map((link, index) => (
                                link.label === "&laquo; Previous" ? (
                                        <PaginationItem key={index}>
                                            <PaginationPrevious isActive={link.active} href={link.url ?? undefined} />
                                        </PaginationItem>
                                ) :  link.label === "Next &raquo;" ? (
                                        <PaginationItem key={index}>
                                            <PaginationNext isActive={link.active} href={link.url ?? undefined} />
                                        </PaginationItem>
                                ) :
                                    (
                                    <PaginationItem key={index}>
                                        <PaginationLink isActive={link.active} href={link.url ?? undefined}>{index}</PaginationLink>
                                    </PaginationItem>
                                )
                            ))}
                        </PaginationContent>
                    </Pagination>
                {/*<pre>*/}
                {/*{JSON.stringify(users.meta.links)}*/}
                {/*    </pre>*/}
            </div>
        </AppLayout>
    );
}

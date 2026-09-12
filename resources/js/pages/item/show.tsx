import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Item, Itemparam, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Eye, PencilIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function ItemShow({ item, itemparams }: { item: Item; itemparams: Itemparam[] }) {
    const user = (usePage() as { props: { auth: { user: { id: number; money: number } } } }).props.auth.user;
    const { setData, post, processing } = useForm<{ description: File | null; _method: string }>({
        description: null,
        _method: 'PUT',
    });
    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(route('item.update', item.id), { forceFormData: true });
    };
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Item show',
            href: `/item/show/${item.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Item page" />
            <Card className="m-4 w-[450px] p-2">
                <CardHeader>
                    <CardTitle>
                        {item.id}. {item.brand} {item.name}
                    </CardTitle>
                    <CardDescription>
                        <div>Category: {item.group}</div>
                        <div className="pb-2">Barcode: {item.barcode}</div>
                        <Separator />
                        <div className="flex flex-row gap-4 py-2">
                            <div className="text-xs">Created by: {item.created_by}</div>
                            <div className="grow text-right text-xs">Created at: {item.created_at.split('T')[0]}</div>
                        </div>
                        {item.updated_by !== item.created_by && (
                            <div className="flex flex-row gap-4 py-2 text-xs">
                                <div>Updated by: {item.updated_by}</div>
                                <div className="grow text-right">Updated at: {item.updated_at.split('T')[0]}</div>
                            </div>
                        )}
                    </CardDescription>
                    <Separator />
                </CardHeader>
                <CardContent>
                    {Array.isArray(itemparams) && itemparams.length > 0 ? (
                        <div className="flex flex-row gap-4 py-4">
                            <div className="grow">
                                {itemparams.map((param: Itemparam) =>
                                    param ? (
                                        <div key={param.id} className="flex flex-row gap-4 py-4">
                                            <div>{param.param_name}:</div>
                                            <div className="grow font-bold">{param.value}</div>
                                        </div>
                                    ) : null,
                                )}
                            </div>
                            <div className="flex flex-row text-right text-xs">
                                <div className="text-right">
                                    <Link href={route('item.edit', [item.id])}>Add parameter</Link>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <Separator />
                    <div className="flex flex-row gap-4 py-4">
                        <div>Product website:</div>
                        <div className="grow font-bold">{item.website}</div>
                        <div className="text-right">
                            <PencilIcon className="size-4" />
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-row gap-4 py-4">
                        <div>Status:</div>
                        <div className="grow font-bold">{item.status}</div>
                        <div className="text-right">
                            <PencilIcon className="size-4" />
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-row gap-4 py-4">
                        <div>Price:</div>
                        <div className="grow font-bold">
                            {item.price} {user.money} / {item.unit}
                        </div>
                        <div className="text-right">
                            <PencilIcon className="size-4" />
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-row gap-4 py-4">
                        <div>Discount:</div>
                        <div className="grow font-bold">{item.discount} %</div>
                        <div className="text-right">
                            <PencilIcon className="size-4" />
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-row gap-4 py-4">
                        <div>Description:</div>
                        <form className="flex grow items-center gap-2" onSubmit={submit}>
                            <Input
                                type="file"
                                name="description"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={(event) => setData('description', event.target.files?.[0] ?? null)}
                            />
                            <Button type="submit" disabled={processing}>
                                Save
                            </Button>
                        </form>
                        <div className="text-right">
                            <Eye className="size-4" />
                        </div>
                        <div className="text-right">
                            <PencilIcon className="size-4" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

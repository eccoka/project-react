import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Item, Itemparam, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';

export default function ItemShow({ item, itemparams, success }: { item: Item; itemparams: Itemparam[]; success?: string }) {
    const user = (usePage() as { props: { auth: { user: { id: number; money: number } } } }).props.auth.user;
    const descriptionInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing } = useForm<{
        website: string | null;
        status: string;
        price: number;
        discount: number;
        description: File | null;
        _method: string;
    }>({
        website: item.website,
        status: item.status,
        price: item.price,
        discount: item.discount,
        description: null,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();
        post(route('item.update', item.id), { forceFormData: true });
    };

    const clearDescription = () => {
        setData('description', null);

        if (descriptionInputRef.current) {
            descriptionInputRef.current.value = '';
        }
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
                        {success && <div className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</div>}
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
                    <form onSubmit={submit}>
                        <div className="flex flex-row gap-4 py-4">
                            <div>Product website:</div>
                            <Input
                                type="url"
                                name="website"
                                value={data.website ?? item.website}
                                onChange={(e) => setData('website', e.target.value)}
                            />
                        </div>
                        <Separator />
                        <div className="flex flex-row gap-4 py-4">
                            <div>Status:</div>
                            <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Choose a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        <div className="flex flex-row gap-4 py-4">
                            <div>Price:</div>
                            <Input
                                type="number"
                                name="price"
                                value={data.price ?? item.price}
                                onChange={(e) => setData('price', Number(e.target.value))}
                            />
                        </div>
                        <Separator />
                        <div className="flex flex-row gap-4 py-4">
                            <div>Discount:</div>
                            <Input
                                type="number"
                                name="discount"
                                value={data.discount ?? item.discount}
                                onChange={(e) => setData('discount', Number(e.target.value))}
                            />

                        </div>
                        <Separator />
                        <div className="flex flex-row gap-4 py-4">
                            <div>Description:</div>
                            <Input
                                ref={descriptionInputRef}
                                type="file"
                                name="description"
                                accept=".doc,.docx,.txt"
                                onChange={(event) => setData('description', event.target.files?.[0] ?? null)}
                            />
                            {data.description && (
                                <Button type="button" variant="outline" onClick={clearDescription}>
                                    Undo
                                </Button>
                            )}
                            <div className="text-right">
                                <Eye className="size-4" />
                            </div>
                        </div>
                        <Separator />
                        <div className="flex flex-row items-center justify-center py-4">
                            <div className="items-center">
                                <Button type="submit" disabled={processing}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Stock } from '@/types'; // Ensure Brand is defined in this path
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import InputError from '@/components/input-error';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stock edit',
        href: '/stock/edit',
    },
];

export default function UserCreate({ stock, success }: { stock: { data: Stock }; success: string }) {
    const { data, setData, errors, post, processing } = useForm({
        stock_name: stock.data.stock_name,
        stock_code: stock.data.stock_code,
        address: stock.data.address,
        phone: stock.data.phone,
        email: stock.data.email,
        image: stock.data.image,
        imageFile: null as File | null, //logo image
        status: stock.data.status,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('stock.update', stock.data.id), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stock edit" />
            <Card className="m-4 w-[450px] p-2">
                <form onSubmit={submit} className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4" encType="multipart/form-data">
                    <CardHeader className="space-y-1">
                        {success && <CardDescription className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</CardDescription>}
                        <Label htmlFor="stock_name">Stock Name</Label>
                        <Input
                            id="stock_name"
                            value={data.stock_name}
                            onChange={(e) => setData('stock_name', e.target.value)}
                            placeholder="Enter stock name"
                            type="text"
                            required
                        />
                        <InputError message={errors.stock_name} className="mt-2" />
                    </CardHeader>
                    <Separator />
                    <CardContent className="space-y-1">
                        {stock.data.image !== '0' && (
                            <div className="flex flex-col space-y-1.5">
                                <img src={stock.data.image} width="120" className="rounded" />
                            </div>
                        )}
                        <Label htmlFor="imageFile">Change logo</Label>
                        <Input id="imageFile" type="file" accept="image/*" onChange={(e) => setData('imageFile', e.target.files?.[0] || null)} />
                        <InputError message={errors.imageFile} className="mt-2" />

                        <Label htmlFor="stock_code">Stock Code</Label>
                        <Input
                            id="stock_code"
                            value={data.stock_code}
                            onChange={(e) => setData('stock_code', e.target.value)}
                            placeholder="Enter stock code"
                            type="text"
                            required
                        />
                        <InputError message={errors.stock_code} className="mt-2" />

                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Enter address"
                            required
                        />
                        <InputError message={errors.address} className="mt-2" />

                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="Enter phone number"
                            type="text"
                            required
                        />
                        <InputError message={errors.phone} className="mt-2" />

                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter email address"
                            type="email"
                        />
                        <InputError message={errors.email} className="mt-2" />

                        <Label htmlFor="status">Status</Label>
                        <Select name="status" value={data.status} onValueChange={(value) => setData('status', value)}>
                            <SelectTrigger id="status">
                                <SelectValue placeholder={data.status} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} className="mt-2" />
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2 pt-4">
                        <Button variant="secondary" type="button" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Update
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

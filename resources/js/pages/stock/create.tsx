import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stock create',
        href: '/stock/create',
    },
];

export default function UserCreate({ success }: { success: string }) {
    const { data, setData, errors, post, processing } = useForm({
        stock_name: '',
        stock_code: '',
        address: '',
        phone: '',
        email: '',
        imageFile: null as File | null, //logo image
        status: 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('stock.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Stock place" />
            <Card className="m-4 w-[450px] p-2">
                <form onSubmit={submit} className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <CardHeader className="space-y-1">
                        {success && <CardDescription className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</CardDescription>}
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Label htmlFor="stock_name">Stock name</Label>
                        <Input
                            id="stock_name"
                            value={data.stock_name}
                            onChange={(e) => setData('stock_name', e.target.value)}
                            placeholder="Stock name"
                            type="text"
                            required
                        />
                        <InputError message={errors.stock_name} className="mt-2" />

                        <Label htmlFor="stock_code">Stock code</Label>
                        <Input
                            id="stock_code"
                            value={data.stock_code}
                            onChange={(e) => setData('stock_code', e.target.value)}
                            placeholder="Stock code"
                            type="text"
                            required
                        />
                        <InputError message={errors.stock_code} className="mt-2" />

                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Zip code, street, city, state, country"
                            type="text"
                            required
                        />
                        <InputError message={errors.address} className="mt-2" />

                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="Phone number"
                            type="text"
                            required
                        />
                        <InputError message={errors.phone} className="mt-2" />

                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Email address"
                            type="email"
                        />
                        <InputError message={errors.email} className="mt-2" />

                        <Label htmlFor="imageFile">Stock place photo</Label>
                        <Input 
                            id="imageFile" 
                            type="file" accept="image/*" 
                            onChange={(e) => setData('imageFile', e.target.files?.[0] || null)} 
                        />
                        <InputError message={errors.imageFile} className="mt-2" />

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {processing ? (
                            <Button disabled variant="secondary" type="submit" className="w-full">
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full">
                                Create
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

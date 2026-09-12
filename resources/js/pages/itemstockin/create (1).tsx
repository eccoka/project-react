import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Itemgroup, Itemparam, Item, Brand, Unit } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Itemstock in with invoice',
        href: '/itemstockin/create',
    },
];

export default function ItemstockinCreate({ item, brands, units, error }: { item: Item | null, brands: Brand[] | null, units: Unit[] | null, error: string | null }) {
    const { data, setData, errors, post, processing } = useForm({
        item_id: item ? item.id : '',
        stock_code: '',
        invoice_in: '',
        stock_in: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('itemstockin.store');
    };

return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Itemstockin create" />
            <Card className="m-4 w-[450px] p-2">
                <CardHeader>
                    <CardTitle>Create Itemstockin</CardTitle>
                    <CardDescription>
                        Create a new item stock in entry with invoice details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="invoice_in">Invoice Number</Label>
                        <Input id='invoice_in' type="text" value={data.invoice_in} onChange={(e) => setData('invoice_in', e.target.value)} />
                        <InputError message={errors.invoice_in} className="mt-2" />
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
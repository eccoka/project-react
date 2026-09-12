import InputError from '@/components/input-error';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import AppLayout from '@/layouts/app-layout';
import { Brand, BreadcrumbItem, Item, Itemparam, Stock, Unit } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Itemstock in with invoice',
        href: '/itemstockin/create',
    },
];

export default function ItemstockinCreate({
    items,
    stocks,
    brands,
    itemparams,
    units,
    error,
}: {
    items: { data: Item[] } | null;
    stocks: Stock[] | null;
    brands: Brand[] | null;
    itemparams: Itemparam[] | null;
    units: Unit[] | null;
    error: string | null;
}) {
    const { data, setData, errors, post, processing } = useForm({
        brand_id: '',
        stock_code: '',
        invoice_in: '',
        stock_in: '',
        item_id: '',
    });

    const selectedItemName = data.item_id && items?.data
        ? items.data.find(item => item.id.toString() === data.item_id)?.name
        : null;

    const matchingItems = (() => {
        if (!data.brand_id || !selectedItemName || !items?.data) {
            return [];
        }

        const filtered = items.data.filter(item => 
            item.brandId.toString() === data.brand_id && 
            item.name === selectedItemName
        );
        console.log("DEBUG: Matching items by brand and name:", filtered);
        return filtered;
    })();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('itemstockin.store');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Itemstockin create" />
            <Card className="m-4 w-full p-2">
                <CardHeader>
                    <CardTitle>Create Itemstockin</CardTitle>
                    <CardDescription>Create a new item stock in entry with invoice details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="flex w-md flex-col space-y-1.5">
                            <Label htmlFor="invoice_in">Invoice Number</Label>
                            <Input id="invoice_in" type="text" value={data.invoice_in} onChange={(e) => setData('invoice_in', e.target.value)} />
                            <InputError message={errors.invoice_in} className="mt-2" />
                        </div>
                        <div className="flex w-md flex-col space-y-1.5">
                            <Label htmlFor="stock_code">Stock Code</Label>
                            <Select onValueChange={(value) => setData('stock_code', value)} value={data.stock_code}>
                                <SelectTrigger id="stock_code">
                                    <SelectValue placeholder="Select stock code" />
                                </SelectTrigger>
                                <SelectContent>
                                    {stocks &&
                                        stocks.map((stock) => (
                                            <SelectItem key={stock.id} value={stock.stock_code}>
                                                {stock.stock_name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <div className="w-md space-y-1.5">
                                <Label htmlFor="brand_id">Brand</Label>
                                <Select onValueChange={(value) => setData('brand_id', value)} value={data.brand_id}>
                                    <SelectTrigger id="brand_id">
                                        <SelectValue placeholder="Select brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {brands &&
                                            brands.map((brand) => (
                                                <SelectItem key={brand.id} value={String(brand.id)}>
                                                    {brand.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-md space-y-1.5">
                                <Label htmlFor="item_id">Items</Label>
                                <Select 
                                    onValueChange={(value) => setData('item_id', value)} 
                                    value={String(data.item_id)}
                                    disabled={!data.brand_id}
                                >
                                    <SelectTrigger id="item_id">
                                        <SelectValue placeholder={data.brand_id ? "Select item" : "Select a brand first"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {items &&
                                            items.data
                                                .filter((item: Item) => data.brand_id ? item.brandId === parseInt(data.brand_id) : false)
                                                .map((item: Item) => (
                                                    <SelectItem key={item.id} value={item.id.toString()}>
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                    </SelectContent>
                                </Select>
                                {!data.brand_id && <p className="text-xs text-muted-foreground mt-1">Please select a brand first</p>}
                            </div>
                        {matchingItems.length === 1 && (
                            <div className="w-md space-y-1.5">
                                <Label htmlFor="stock_in">Stock In</Label>
                                <Input 
                                    id="stock_in" 
                                    type="number" 
                                    value={data.stock_in} 
                                    onChange={(e) => setData('stock_in', e.target.value)} 
                                    placeholder="Enter stock in quantity"
                                />
                                <InputError message={errors.stock_in} className="mt-2" />   
                            </div>
                        )}
                        </div>
                    </div>
                    </form>
                </CardContent>
            </Card>

            {matchingItems.length > 0 && (
                <Card className="m-4 w-full p-2">
                    <CardHeader>
                        <CardTitle>Item Details and Parameters</CardTitle>
                        <CardDescription>Parameters for items matching the selected brand and name.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>A list of items and their corresponding parameters.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Parameter Name</TableHead>
                                    <TableHead>Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {matchingItems.map((item) => {
                                    const getParamsForItem = () => {
                                        if (!itemparams || !(item as any).parameter_ids) {
                                            return [];
                                        }
                                        const parameterIds = String((item as any).parameter_ids)
                                            .split(',')
                                            .map(id => parseInt(id.trim(), 10))
                                            .filter(id => !isNaN(id));
                                
                                        return itemparams.filter(param => parameterIds.includes(param.id));
                                    };
                                    const params = getParamsForItem();

                                    return (
                                        <>
                                            <TableRow key={`item-header-${item.id}`} className="bg-muted/50">
                                                <TableCell colSpan={2} className="font-bold">
                                                    {item.name}
                                                </TableCell>
                                            </TableRow>
                                            {params.length > 0 ? (
                                                params.map(param => (
                                                    <TableRow key={`${item.id}-${param.id}`}>
                                                        <TableCell>{param.param_name}</TableCell>
                                                        <TableCell>{param.value}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                                                        No parameters found for this item.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </AppLayout>
    );
}

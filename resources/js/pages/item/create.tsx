import AppLayout from '@/layouts/app-layout';

import { Brand, type BreadcrumbItem, type Unit } from '@/types';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type Itemgroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create item',
        href: '/items/create',
    },
];



export default function CreateItem({ itemgroups, brands, units, success }: { itemgroups: Itemgroup[]; brands: Brand[]; units: Unit[]; success: string }) {


    const { data, setData, errors, post, processing } = useForm({
        itemgroup: '',
        itemgroup_main: '',
        itemgroup_sub: '',
        itemgroup_sub2: '',
        brand: '',
        name: '',
        barcode: '',
        website: '',
        price: '',
        discount: '',
        unit: '',
        descriptionFile: null as File | null,
        status: 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('item.store', { edit_part: 1 }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create item" />

            <Card className="m-4 w-[450px] p-2">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <CardHeader>
                        {success && <CardDescription className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</CardDescription>}
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="brand">Brand</Label>
                            <Select
                                name="brand"
                                onValueChange={(value) => setData('brand', value)} // Frissítjük a `brand` értékét
                            >
                                <SelectTrigger id="brand">
                                    <SelectValue placeholder="Select brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {brands.map((brand) => (
                                        <SelectItem key={brand.id} value={String(brand.id)}>
                                            {brand.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.brand} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="itemgroup_main">Select the main category</Label>
                            <Select
                                name="itemgroup_main"
                                onValueChange={(value) => {
                                    setData('itemgroup_main', value);
                                    setData('itemgroup_sub', ''); // Reset subcategory
                                    setData('itemgroup_sub2', ''); // Reset sub-subcategory
                                }}
                            >
                                <SelectTrigger id="itemgroup_main">
                                    <SelectValue placeholder="Select the main category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {itemgroups
                                        .filter((itemgroup) => itemgroup.level === 1)
                                        .map((itemgroup) => (
                                            <SelectItem key={itemgroup.id} value={String(itemgroup.id)}>
                                                {itemgroup.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {data.itemgroup_main &&
                            itemgroups.some((itemgroup) => itemgroup.level === 2 && String(itemgroup.parent_id) === data.itemgroup_main) && (
                                <>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="itemgroup_sub">Select subcategory</Label>
                                        <Select
                                            name="itemgroup_sub"
                                            onValueChange={(value) => {
                                                setData('itemgroup_sub', value);
                                                setData('itemgroup_sub2', ''); // Reset sub-subcategory when subcategory changes
                                            }}
                                        >
                                            <SelectTrigger id="itemgroup_sub">
                                                <SelectValue placeholder="Select subcategory" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {itemgroups
                                                    .filter(
                                                        (itemgroup) => itemgroup.level === 2 && String(itemgroup.parent_id) === data.itemgroup_main,
                                                    )
                                                    .map((itemgroup) => (
                                                        <SelectItem key={itemgroup.id} value={String(itemgroup.id)}>
                                                            {itemgroup.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}

                        {data.itemgroup_sub &&
                            itemgroups.some((itemgroup) => itemgroup.level === 3 && String(itemgroup.parent_id) === data.itemgroup_sub) && (
                                <>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="itemgroup_sub2">Select sub-subcategory</Label>
                                        <Select name="itemgroup_sub2" onValueChange={(value) => setData('itemgroup_sub2', value)}>
                                            <SelectTrigger id="itemgroup_sub2">
                                                <SelectValue placeholder="Select sub-subcategory" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {itemgroups
                                                    .filter(
                                                        (itemgroup) => itemgroup.level === 3 && String(itemgroup.parent_id) === data.itemgroup_sub,
                                                    )
                                                    .map((itemgroup) => (
                                                        <SelectItem key={itemgroup.id} value={String(itemgroup.id)}>
                                                            {itemgroup.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Item name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.currentTarget.value)}
                                required
                                placeholder="Enter item name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="barcode">Barcode</Label>
                            <Input
                                id="barcode"
                                value={data.barcode}
                                onChange={(e) => setData('barcode', e.currentTarget.value)}
                                placeholder="Enter barcode"
                            />
                            <InputError message={errors.barcode} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                value={data.website}
                                onChange={(e) => setData('website', e.currentTarget.value)}
                                placeholder="Enter website"
                            />
                            <InputError message={errors.website} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', e.currentTarget.value)}
                                required
                                placeholder="Enter price"
                            />
                            <InputError message={errors.price} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="discount">Discount</Label>
                            <Input
                                id="discount"
                                type="number"
                                value={data.discount}
                                onChange={(e) => setData('discount', e.currentTarget.value)}
                                placeholder="Enter discount"
                            />
                            <InputError message={errors.discount} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="unit">Unit</Label>
                            <Select
                                name="unit"
                                onValueChange={(value) => setData('unit', value)} // Frissítjük a `unit` értékét
                            >
                                <SelectTrigger id="unit">
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                     {units.map((unit) => (
                                        <SelectItem key={unit.value} value={String(unit.value)}>
                                            {unit.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.unit} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="descriptionFile">Description File</Label>
                            <Input
                                id="descriptionFile"
                                name="descriptionFile"
                                accept=".txt, .docx"
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setData('descriptionFile', e.target.files[0]);
                                    }
                                }}
                            />
                            <InputError message={errors.descriptionFile} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-1.5 pb-3">
                        {processing ? (
                            <Button disabled variant="secondary" type="submit" className="w-full">
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full">
                                Add parameters
                            </Button>
                        )}
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Itemgroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Itemgroup Edit',
        href: route('itemgroup.edit', 1),
    },
];

export default function ItemgroupEdit({
    itemgroup,
    groups,
    error,
    success,
}: {
    itemgroup: { data: Itemgroup };
    groups: { data: Itemgroup[] };
    error: string;
    success: string;
}) {
    const { setData, errors, post, processing } = useForm({
        id: itemgroup.data.id,
        name: itemgroup.data.name,
        position: itemgroup.data.position,
        level: itemgroup.data.level,
        parent: itemgroup.data.level === 2 ? itemgroup.data.sub1 : itemgroup.data.level === 3 ? itemgroup.data.sub1 : '',
        imageFile: null as File | null,
        status: itemgroup.data.status,
        created_at: itemgroup.data.created_at,
        created_by: itemgroup.data.created_by,
        updated_by: itemgroup.data.updated_by,
        updated_at: itemgroup.data.updated_at,
         _method: "PUT",
    });

    console.log(itemgroup.data);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('itemgroup.update', itemgroup.data.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Itemgroup" />
            <Card className="m-4 w-[450px] p-2">
                <CardHeader>
                {error && <CardDescription className="mb-4 rounded bg-red-600 px-4 py-2 text-white">{error}</CardDescription>}
                {success && <CardDescription className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</CardDescription>}
                    <CardTitle className='py-3'>{itemgroup.data.name}</CardTitle>
                    <Separator className="my-4" />
                    <CardDescription>
                        <div className="flex">
                            <div className="flex-1">
                                created: <span className="px-1 font-bold text-white">{itemgroup.data.created_by}</span>
                            </div>
                            <div className="flex-1 text-right">
                                at: <span className="px-1 font-bold text-white">{itemgroup.data.created_at} </span>
                            </div>
                        </div>
                        {itemgroup.data.updated_at !== itemgroup.data.created_at && (
                        <div className="flex">
                            <div className="flex-1">
                                updated: <span className="px-1 font-bold text-white">{itemgroup.data.updated_by}</span>
                            </div>
                            <div className="flex-1 text-right">
                                at: <span className="px-1 font-bold text-white">{itemgroup.data.updated_at} </span>
                            </div>
                        </div>
                        )}
                    </CardDescription>
                    <Separator className="my-4" />
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        {itemgroup.data.image_path !== '0' && (
                            <div className="flex flex-col space-y-1.5">
                                <img src={itemgroup.data.image_path} width="120" className="rounded" />
                            </div>
                        )}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="imageFile">Change image</Label>
                            <Input
                                id="imageFile"
                                name="imageFile"
                                accept="image/*"
                                placeholder="Select image"
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setData('imageFile', e.target.files[0]);
                                    }
                                }}
                            />

                            <InputError message={errors.imageFile} />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="status">Status</Label>
                            <Select name="status" value={String(itemgroup.data.status)} onValueChange={(value) => setData('status', value)}>
                                <SelectTrigger id="status">
                                    <SelectValue placeholder={String(itemgroup.data.status)} />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="active">active</SelectItem>
                                    <SelectItem value="inactive">inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type='text'
                                name="name"
                                value={itemgroup.data.name}
                                placeholder={itemgroup.data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <p className="border-b-2 pb-2">
                                {itemgroup.data.level === 1
                                    ? 'Main level category'
                                    : itemgroup.data.level === 2
                                      ? '2nd level category'
                                      : '3rd level category'}
                            </p>
                        </div>
                        {itemgroup.data.level === 2 && (
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="parent">Parent(s)</Label>
                                <Select name="parent" onValueChange={(value) => setData('parent', value)}>
                                    <SelectTrigger id="parent">
                                        <SelectValue placeholder={String(itemgroup.data.sub1)} />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {[...new Map(groups.data.map((item) => [item.main, item])).values()].map((uniqueItem) => (
                                            <SelectItem key={uniqueItem.id} value={uniqueItem.main}>
                                                {uniqueItem.main}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        {itemgroup.data.level === 3 && (
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="parent">Parent(s)</Label>
                                <Select name="parent" onValueChange={(value) => setData('parent', value)}>
                                    <SelectTrigger id="parent">
                                        <SelectValue placeholder={itemgroup.data.sub1} />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {[
                                            ...new Map(
                                                groups.data
                                                    .filter((item: Itemgroup) => item.sub1 !== '' && item.sub1) // Szűrés
                                                    .map((item: Itemgroup) => [`${item.main} - ${item.sub1}`, item]), // Kulcs-párok létrehozása
                                            ).values(),
                                        ] // Csak az egyedi értékek megtartása
                                            .map((item: Itemgroup) => (
                                                <SelectItem key={item.id} value={String(item.sub1)}>
                                                    {item.main} - {item.sub1}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.parent} />
                            </div>
                        )}
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="position">Position</Label>
                            <Input
                                id="position"
                                type="number"
                                name="position"
                                placeholder={String(itemgroup.data.position)}
                                onChange={(e) => setData('position', Number(e.target.value))}
                            />
                            <InputError message={errors.position} />
                        </div>
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

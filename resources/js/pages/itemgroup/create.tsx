import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Itemgroup } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Itemgroup create',
        href: '/itemgroup/create',
    },
];

export default function ItemgroupCreate({ itemgroups, error }: { itemgroups: { data: Itemgroup[] }; error: string}) {
    const user = (usePage() as { props: { auth: { user: { id: number } } } }).props.auth.user;
    const { data, setData, errors, post, processing } = useForm({
        name: '',
        position: '',
        level: '',
        parent: '',
        imageFile: null as File | null,
        status: 'active',
        user_id: user.id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('itemgroup.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Itemgroup create" />
            <Card className="m-4 w-[450px] p-2">
                <CardHeader>
                    <CardTitle>Create itemgroup</CardTitle>
                    {error && <CardDescription className="mb-4 rounded bg-red-600 px-4 py-2 text-white">{error}</CardDescription>}
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Category name</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.currentTarget.value)} required />
                            <InputError message={errors.name} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="level">Category level</Label>
                            <Select
                                name="level"
                                onValueChange={(value) => setData('level', value)} // Frissítjük a `level` értékét
                            >
                                <SelectTrigger id="level">
                                    <SelectValue placeholder="Select itemgroup level" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="1">Main category</SelectItem>
                                    <SelectItem value="2">Sub category</SelectItem>
                                    <SelectItem value="3">Third level category</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {data.level && data.level === '2' && (
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="parent">Parent category</Label>
                                <Select onValueChange={(value) => setData('parent', value)}>
                                    <SelectTrigger id="parent">
                                        <SelectValue placeholder="Select parent category" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {[...new Set(itemgroups.data.map((itemgroup) => itemgroup.main))] // Egyedi értékek kinyerése
                                            .map((main, index) => (
                                                <SelectItem key={index} value={main}>
                                                    {main}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {data.level && data.level === '3' && (
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="parent">Parent category</Label>
                                <Select onValueChange={(value) => setData('parent', value)}>
                                    <SelectTrigger id="parent">
                                        <SelectValue placeholder="Choose parent category" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {[
                                            ...new Map(
                                                itemgroups.data
                                                    .filter((itemgroup) => itemgroup.sub1 !== '' && itemgroup.sub1) // Szűrés
                                                    .map((itemgroup) => [`${itemgroup.main} - ${itemgroup.sub1}`, itemgroup]), // Kulcs-párok létrehozása
                                            ).values(),
                                        ] // Csak az egyedi értékek megtartása
                                            .map((itemgroup) => (
                                                <SelectItem key={itemgroup.id} value={String(itemgroup.sub1)}>
                                                    {itemgroup.main} - {itemgroup.sub1}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="imageFile">Image</Label>
                            <Input 
                                id="imageFile"
                                name='imageFile'
                                accept="image/*"
                                type='file' 
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setData('imageFile', e.target.files[0]);
                                    }
                                }} />

                            <InputError message={errors.imageFile} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="position">Position in webview</Label>
                            <Input 
                                id="position"
                                type='number'
                                name='position' 
                                value={data.position} 
                                onChange={(e) => setData('position', e.currentTarget.value)} 
                                required />
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



import AppLayout from '@/layouts/app-layout';
import { type Brand, type BreadcrumbItem } from '@/types'; // Ensure Brand is defined in this path
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import InputError from '@/components/input-error';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Brand edit',
        href: '/brand/edit',
    },
];

type EditBrandrForm = {
    name: string;
    motto: string;
    website: string;
    description: string;
    imageFile: File | null;
    status: string;
    logo: string | null;
    _method?: string; // Added _method as an optional property
};

export default function UserCreate({ brand, success }: { brand: { data: Brand }; success: string }) {
    const { data, setData, errors, post, processing } = useForm<EditBrandrForm>({
        name: brand.data.name,
        motto: brand.data.motto,
        website: brand.data.website,
        description: brand.data.description,
        imageFile: null as File | null, //logo image
        status: brand.data.status,
        logo: brand.data.logo || null, // Assuming logo is a string or null
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
    
        post(route('brand.update', brand.data.id), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brand edit" />
            <Card className="m-4 w-[450px] p-2">
                <form onSubmit={submit} className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4" encType="multipart/form-data">
                    <CardHeader className="space-y-1">
                        {success && <CardDescription className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</CardDescription>}

                        <CardDescription>
                            <div className="flex">
                                <div className="flex-1">
                                    created: <span className="px-1 font-bold text-white">{brand.data.created_by}</span>
                                </div>
                                <div className="flex-1 text-right">
                                    at: <span className="px-1 font-bold text-white">{brand.data.created_at} </span>
                                </div>
                            </div>
                            {brand.data.updated_at !== brand.data.created_at && (
                                <div className="flex">
                                    <div className="flex-1">
                                        updated: <span className="px-1 font-bold text-white">{brand.data.updated_by}</span>
                                    </div>
                                    <div className="flex-1 text-right">
                                        at: <span className="px-1 font-bold text-white">{brand.data.updated_at} </span>
                                    </div>
                                </div>
                            )}
                        </CardDescription>
                        <Separator className="my-4" />
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {brand.data.logo !== '0' && (
                            <div className="flex flex-col space-y-1.5">
                                <img src={brand.data.logo} width="120" className="rounded" />
                            </div>
                        )}
                        <Label htmlFor="imageFile">Change logo</Label>
                        <Input id="imageFile" type="file" accept="image/*" onChange={(e) => setData('imageFile', e.target.files?.[0] || null)} />
                        <InputError message={errors.imageFile} className="mt-2" />
                        <Label htmlFor="name">Brand name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Brand name"
                            type="text"
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                        <Label htmlFor="status">Brand status</Label>
                        <Select
                            name="status"
                            value={data.status}
                            onValueChange={(value) => setData('status', value)} >
                            <SelectTrigger id="status">
                                <SelectValue placeholder={data.status} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} className="mt-2" />

                        <Label htmlFor="motto">Brand motto/title</Label>
                        <Input
                            id="motto"
                            value={data.motto}
                            onChange={(e) => setData('motto', e.target.value)}
                            placeholder="Brand motto/title"
                            type="text"
                        />
                        <InputError message={errors.motto} className="mt-2" />
                        <Label htmlFor="website">Brand website</Label>
                        <Input
                            id="website"
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                            placeholder="Brand website"
                            type="text"
                            required
                        />
                        <InputError message={errors.website} className="mt-2" />
                        <Label htmlFor="description">Brand description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Brand description"
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit"  disabled={processing}>
                            {processing ? 'Updating...' : 'Update'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </AppLayout>
    );
}

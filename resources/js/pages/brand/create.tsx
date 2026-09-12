import { FormEventHandler } from 'react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm} from '@inertiajs/react';

import { LoaderCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea"

import InputError from '@/components/input-error';
import { Card, CardContent, CardDescription, CardHeader, CardFooter} from '@/components/ui/card';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Brand create',
        href: '/brand/create',
    },
];

export default function UserCreate({success}: { success: string }) {
    const { data, setData, errors, post, processing, } = useForm({
        name: '',
        motto: '',
        website: '',
        description: '',
        imageFile: null as File | null,  //logo image
        status: 'active',
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('brand.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brand User" />
            <Card className="m-4 w-[450px] p-2">
            <form onSubmit={submit}  className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CardHeader className="space-y-1">
                {success && <CardDescription className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</CardDescription>}
                </CardHeader>
                <CardContent className="grid gap-4">
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
                        type="url"
                        pattern="https?://.+"
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

                    <Label htmlFor="imageFile">Brand logo</Label>
                    <Input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('imageFile', e.target.files?.[0] || null)}
                    />
                    <InputError message={errors.imageFile} className="mt-2" />
                </CardContent>
                <CardFooter className="flex justify-end space-x-4">
                    <Button type="submit" disabled={processing} className="flex items-center gap-2">
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create
                    </Button>
                </CardFooter>
            </form>
            </Card>
        </AppLayout>
    );
}
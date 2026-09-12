import { FormEventHandler } from 'react';

import { LoaderCircle } from 'lucide-react';

import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User create',
        href: '/user/create',
    },
];

type StoreForm= {
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    status: string;
    role: string;
    user_id: number;
    password: string;
    password_confirmation: string;
};


export default function UserCreate({ roles, success }: { roles: [], success: string }) {
    const user = (usePage() as { props: { auth: { user: { id: number } } } }).props.auth.user;
    const { data, setData, errors, post, processing, reset } = useForm<StoreForm>({
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: '',
        status: 'active',
        user_id: user.id,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log("Submitting form data:", data);
        post(route('user.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User create" /> 
            <Card className="m-4 w-[450px] p-2">
                <CardHeader>
                    {success && <CardDescription className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</CardDescription>}
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Username</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                disabled={processing}
                                placeholder="Username"
                                onChange={(e) => setData('name', e.currentTarget.value)}
                                autoFocus
                                tabIndex={1}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="first_name">First name</Label>
                            <Input 
                                id="first_name"
                                type='text' 
                                value={data.first_name} 
                                disabled={processing}
                                onChange={(e) => setData('first_name', e.currentTarget.value)} 
                                placeholder="First name"
                                tabIndex={2}
                                required />
                            <InputError message={errors.first_name} />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="last_name">Last name</Label>
                            <Input 
                                id="last_name" 
                                type='text'
                                value={data.last_name} 
                                disabled={processing}
                                placeholder="Last name"
                                tabIndex={3}
                                onChange={(e) => setData('last_name', e.currentTarget.value)} 
                                required />
                            <InputError message={errors.last_name} />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email"
                                value={data.email}
                                disabled={processing}
                                tabIndex={4} 
                                onChange={(e) => setData('email', e.currentTarget.value)} 
                                placeholder="email@example.com"
                                required />
                            <InputError message={errors.email} />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                                id="phone" 
                                value={data.phone}
                                disabled={processing}
                                placeholder="+36 30 123 4567"
                                tabIndex={5}
                                onChange={(e) => setData('phone', e.currentTarget.value)} 
                                required />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                name="role"
                                
                                onValueChange={(value) => setData('role', value)} // Frissítjük a `role` értékét
                            >
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select user role" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {roles.map((role, index) => (
                                        <SelectItem key={index} value={role} tabIndex={6} disabled={processing}>
                                            {role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.role} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                tabIndex={7}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Password"
                                required
                            />
                            <InputError message={errors.password} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                tabIndex={8}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm password"
                                required
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button type="submit" disabled={processing} tabIndex={9}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Create User
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

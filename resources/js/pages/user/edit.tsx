import { FormEventHandler } from 'react';

import { LoaderCircle, Trash2Icon} from 'lucide-react';

import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';

type EditUserForm = {
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    status: string;
    role: string;
    password: string;
    password_confirmation: string;
    id: number;
    _method: string;
    avatar: string;
};

export default function UserEdit({ user, roles, error, success }: { user: { data: User }; roles: []; error: string; success: string }) {
    const { data, setData, errors, patch, processing, reset } = useForm<EditUserForm>({
        name: user.data.name,
        first_name: user.data.first_name,
        last_name: user.data.last_name,
        email: user.data.email,
        phone: user.data.phone,
        role: user.data.role,
        status: user.data.status,
        id: user.data.id,
        _method: 'PATCH',
        password: '',
        password_confirmation: '',
        avatar: user.data.avatar || '',
    });

    const deleteUserAvatar = (user: User) => {
        if (!window.confirm('Are you sure you want to delete the users avatar?')) {
            return;
        }
        router.delete(route('user.destroy', user.id));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('user.update', user.data.id), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout>
            <Head title="User edit" />
            <Card className="m-4 w-[450px] p-2">
                <CardHeader>
                    <CardTitle>Edit User</CardTitle>
                    {error && <CardDescription className="mb-4 rounded bg-red-600 px-4 py-2 text-white">{error}</CardDescription>}
                    {success && <CardDescription className="mb-4 rounded bg-green-600 px-4 py-2 text-white">{success}</CardDescription>}
                    {user.data.avatar !== '0' && user.data.avatar !== null && (
                        <CardDescription>
                            <div className="flex items-center justify-between">
                                <Avatar>
                                    <AvatarImage src={user.data.avatar} alt="User Avatar" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground text-sm">{user.data.avatar}</span>
                                <Button onClick={() => deleteUserAvatar(user.data)}>
                                <Trash2Icon className="h-4 w-4 cursor-pointer text-red-500" />
                                </Button>
                            </div>
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">User name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                disabled={processing}
                                placeholder="User name"
                                autoComplete="username"
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
                                type="text"
                                value={data.first_name}
                                disabled={processing}
                                onChange={(e) => setData('first_name', e.currentTarget.value)}
                                placeholder="First name"
                                tabIndex={2}
                                required
                            />
                            <InputError message={errors.first_name} />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="last_name">Last name</Label>
                            <Input
                                id="last_name"
                                type="text"
                                value={data.last_name}
                                disabled={processing}
                                placeholder="Last name"
                                tabIndex={3}
                                onChange={(e) => setData('last_name', e.currentTarget.value)}
                                required
                            />
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
                                autoComplete="email"
                                required
                            />
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
                                autoComplete="tel"
                                required
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="role">Role</Label>
                            <Select name="role" onValueChange={(value) => setData('role', value)}>
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
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button type="submit" disabled={processing} tabIndex={9}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Update User
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Itemgroup } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { Head, useForm } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Itemparam index',
        href: '/itemparam/index',
    },
];
export default function ItemparamIndex({
    itemgroups,
    itemparams,
    selectedGroups,
    error: initialError,
    success: initialSuccess,
}: {
    itemgroups: { data: Itemgroup[] };
    itemparams: any[];
    selectedGroups?: { maingroupId: string; subgroupId: string; sub2groupId: string };
    error?: string;
    success?: string;
}) {
    const [showSubgroup, setShowSubgroup] = useState(false);
    const [subgroups, setSubgroups] = useState<Itemgroup[]>([]);
    const [showSub2group, setShowSub2group] = useState(false);
    const [sub2groups, setSub2groups] = useState<Itemgroup[]>([]);
    const [filteredItemparams, setFilteredItemparams] = useState<any[]>([]);
    const [showNewValueForm, setShowNewValueForm] = useState<{ [key: string]: boolean }>({});
    const [newValue, setNewValue] = useState<{ [key: string]: string }>({});

    const { data, setData, errors, post, processing } = useForm({
        maingroupId: selectedGroups?.maingroupId ?? '',
        subgroupId: selectedGroups?.subgroupId ?? '',
        sub2groupId: selectedGroups?.sub2groupId ?? '',
        param_name: '',
        value: '',
        from: 'index',
        error: initialError || '',
        success: '',
    });

    const [error, setError] = useState<string | null>(initialError || null);
    const [success, setSuccess] = useState<string | null>(initialSuccess || null);

    useEffect(() => {
        if (data.maingroupId) {
            const filteredSubgroups = itemgroups.data.filter(
                (itemgroup) => itemgroup.level === 2 && itemgroup.parent_id === parseInt(data.maingroupId),
            );
            if (filteredSubgroups.length > 0) {
                setShowSubgroup(true);
                setSubgroups(filteredSubgroups);
            } else {
                setShowSubgroup(false);
                setSubgroups([]);
            }
        } else {
            setShowSubgroup(false);
            setSubgroups([]);
        }
    }, [data.maingroupId, itemgroups.data]);

    useEffect(() => {
        if (data.subgroupId) {
            const filteredSub2groups = itemgroups.data.filter(
                (itemgroup) => itemgroup.level === 3 && itemgroup.parent_id === parseInt(data.subgroupId),
            );
            if (filteredSub2groups.length > 0) {
                setShowSub2group(true);
                setSub2groups(filteredSub2groups);
            } else {
                setShowSub2group(false);
                setSub2groups([]);
            }
        } else {
            setShowSub2group(false);
            setSub2groups([]);
        }
    }, [data.subgroupId, itemgroups.data]);

    useEffect(() => {
        let filteredParams = itemparams;

        if (data.maingroupId) {
            filteredParams = itemparams.filter((itemparam) => itemparam.groupid === parseInt(data.maingroupId));
        }

        if (data.subgroupId) {
            filteredParams = itemparams.filter((itemparam) => itemparam.groupid === parseInt(data.subgroupId));
        }

        if (data.sub2groupId) {
            filteredParams = itemparams.filter((itemparam) => itemparam.groupid === parseInt(data.sub2groupId));
        }

        // Group parameters by name
        const groupedParams = filteredParams.reduce((acc: any, itemparam: any) => {
            const { param_name } = itemparam;
            if (!acc[param_name]) {
                acc[param_name] = [];
            }
            acc[param_name].push(itemparam.value);
            return acc;
        }, {});

        // Convert grouped parameters to array format for display
        const formattedParams = Object.entries(groupedParams).map(([param_name, values]) => ({
            param_name,
            values,
        }));

        if (data.maingroupId || data.subgroupId || data.sub2groupId) {
            setFilteredItemparams(formattedParams);
        } else {
            setFilteredItemparams([]);
        }
    }, [data.maingroupId, data.subgroupId, data.sub2groupId, itemparams]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('itemparam.index'));
    };

    const submit1: FormEventHandler = (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const paramName = form.getAttribute('data-param-name') || '';
        const value = newValue[paramName] || '';
        if (paramName && value) {
            Inertia.post(route('itemparam.store'), {
                param_name: paramName,
                value: value,
                maingroupId: data.maingroupId,
                subgroupId: data.subgroupId,
                sub2groupId: data.sub2groupId,
                status: 'active',
                from: 'index',
                error: initialError || '',
                success: '',
            });
            setNewValue((prev) => ({ ...prev, [paramName]: '' }));
            setShowNewValueForm((prev) => ({ ...prev, [paramName]: false }));
        }
    };

    // Ne töröld vagy módosítsd az error vagy success state-et semmilyen useEffect-ben vagy useForm callbackben!
    // Csak explicit felhasználói művelet (pl. bezárás gomb) törölheti.

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Item parameters" />
            {/* ERROR üzenet mindig az oldal tetején, ha van értéke */}
            {error && error !== '' && (
                <div className="mx-4 mb-4 rounded bg-red-600 p-4 text-center font-semibold text-white">
                    {error}
                    <button className="float-right font-bold text-white" onClick={() => setError(null)} aria-label="Close" type="button">
                        &times;
                    </button>
                </div>
            )}
            {/* SUCCESS üzenet mindig az oldal tetején, ha van értéke */}
            {success && success !== '' && (
                <div className="mx-4 mb-4 rounded bg-green-600 p-4 text-center font-semibold text-white">
                    {success}
                    <button className="float-right font-bold text-white" onClick={() => setSuccess(null)} aria-label="Close" type="button">
                        &times;
                    </button>
                </div>
            )}
            <div className="px-4 py-2 text-xl font-semibold">Search parameter by item group</div>
            <Separator />
            <form onSubmit={submit} className="flex flex-row gap-4 py-4 pl-4 text-xs">
                <input type="hidden" name="from" value="index" />
                <div className="mb-4">
                    <Select
                        name="maingroupId"
                        onValueChange={(value) => {
                            setData('maingroupId', value);
                            setData('subgroupId', ''); // Reset subgroup selection when main group changes
                            setData('sub2groupId', ''); // Reset sub2group selection when main group changes
                            setShowSub2group(false);
                            setSub2groups([]);
                        }}
                    >
                        <SelectTrigger id="maingroupId">
                            <SelectValue placeholder="Select itemgroup" />
                        </SelectTrigger>
                        <SelectContent>
                            {itemgroups.data
                                .filter((itemgroup) => itemgroup.level === 1)
                                .map((itemgroup) => (
                                    <SelectItem key={itemgroup.id} value={String(itemgroup.id)}>
                                        {itemgroup.name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.maingroupId} />
                </div>

                {showSubgroup && (
                    <div className="mb-4">
                        <Select
                            name="subgroupId"
                            onValueChange={(value) => {
                                setData('subgroupId', value);
                                setData('sub2groupId', ''); // Reset sub2group selection when sub group changes
                                setShowSub2group(false);
                                setSub2groups([]);
                            }}
                        >
                            <SelectTrigger id="subgroupId">
                                <SelectValue placeholder="Select subgroup" />
                            </SelectTrigger>
                            <SelectContent>
                                {subgroups.map((itemgroup) => (
                                    <SelectItem key={itemgroup.id} value={String(itemgroup.id)}>
                                        {itemgroup.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.subgroupId} />
                    </div>
                )}

                {showSub2group && (
                    <div className="mb-4">
                        <Select name="sub2groupId" onValueChange={(value) => setData('sub2groupId', value)}>
                            <SelectTrigger id="sub2groupId">
                                <SelectValue placeholder="Select subgroup 2" />
                            </SelectTrigger>
                            <SelectContent>
                                {sub2groups.map((itemgroup) => (
                                    <SelectItem key={itemgroup.id} value={String(itemgroup.id)}>
                                        {itemgroup.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.sub2groupId} />
                    </div>
                )}
            </form>

            {filteredItemparams.length > 0 && (
                <div className="p-4">
                    <Table className="w-full text-xs">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/3 px-4 py-2">Parameter Name</TableHead>
                                <TableHead className="w-1/3 px-4 py-2">Values</TableHead>
                                <TableHead className="w-1/3 px-4 py-2">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredItemparams.map((itemparam: any) => (
                                <>
                                    <TableRow key={itemparam.param_name}>
                                        <TableCell
                                            className="border px-4 py-2"
                                            rowSpan={itemparam.values.length + (showNewValueForm[itemparam.param_name] ? 1 : 0)}
                                        >
                                            {itemparam.param_name}
                                        </TableCell>
                                        <TableCell className="border px-4 py-2">{itemparam.values[0]}</TableCell>
                                        <TableCell
                                            className="border px-4 py-2"
                                            rowSpan={itemparam.values.length + (showNewValueForm[itemparam.param_name] ? 1 : 0)}
                                        >
                                            <button
                                                type="button"
                                                className="flex items-center"
                                                onClick={() =>
                                                    setShowNewValueForm((prevState) => ({
                                                        ...prevState,
                                                        [itemparam.param_name]: !prevState[itemparam.param_name],
                                                    }))
                                                }
                                            >
                                                <PlusIcon className="size-3" />
                                                New Value
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                    {itemparam.values.slice(1).map((value: any, index: number) => (
                                        <TableRow key={`${itemparam.param_name}-${index}`}>
                                            <TableCell className="border px-4 py-2">{value}</TableCell>
                                        </TableRow>
                                    ))}
                                    {showNewValueForm[itemparam.param_name] && (
                                        <TableRow>
                                            <TableCell className="border px-4 py-2">
                                                <div className="flex items-center">
                                                    <form
                                                        onSubmit={submit1}
                                                        name="submit-form2"
                                                        className="flex items-center"
                                                        data-param-name={itemparam.param_name}
                                                    >
                                                        <Input type="hidden" name="param_name" value={itemparam.param_name} />
                                                        <Input type="hidden" name="status" value="active" />
                                                        <Input
                                                            type="text"
                                                            name="value"
                                                            className="w-52 rounded border text-xs"
                                                            value={newValue[itemparam.param_name] || ''}
                                                            onChange={(e) =>
                                                                setNewValue((prev) => ({
                                                                    ...prev,
                                                                    [itemparam.param_name]: e.target.value,
                                                                }))
                                                            }
                                                        />
                                                        <Button type="submit" className="ml-2 h-8 rounded bg-green-500 text-white">
                                                            Save
                                                        </Button>
                                                    </form>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type BreadcrumbItem, type Item, type Itemparam } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create item parameters',
        href: '/items/paramsetup',
    },
];

export default function ParameterSetup({ item, parameters, success }: { item: Item[]; parameters: Itemparam[]; success: string }) {
    const [checkedRows, setCheckedRows] = useState<{ [key: string]: boolean }>({});
    const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});
    console.log('parameters', parameters);
    console.log('item', item);
    const { data, setData, errors, post, processing } = useForm({
        paramids: [],
    });

    const groupedParams = useMemo(() => {
        const groups: { [key: string]: Itemparam[] } = {};
        parameters?.forEach((param) => {
            if (!groups[param.param_name]) {
                groups[param.param_name] = [];
            }
            groups[param.param_name].push(param);
        });
        return groups;
    }, [parameters]);

    const handleCheckboxChange = (paramName: string) => {
        setCheckedRows((prev) => ({
            ...prev,
            [paramName]: !prev[paramName],
        }));
    };

    const handleRadioChange = (paramName: string, value: string) => {
        setSelectedValues((prev) => ({
            ...prev,
            [paramName]: value,
        }));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const selectedParamIds: number[] = [];
        Object.entries(groupedParams).forEach(([paramName, paramList]) => {
            if (checkedRows[paramName] && selectedValues[paramName]) {
                const param = paramList.find((p) => p.value === selectedValues[paramName]);
                if (param) {
                    selectedParamIds.push(param.id);
                }
            }
        });
        setData('paramids', selectedParamIds);
        post(route('item.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Setup item parameters" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"></div>
            <form onSubmit={submit}>
                <input type="hidden" name="edit_part" value="2" />
                <input type="hidden" name="brand" value={item.brandId} />
                <input type="hidden" name="name" value={item.name} />
                <input type="hidden" name="status" value={item.status} />
                <input type="hidden" name="price" value={item.price} />
                <input type="hidden" name="unit" value={item.unit} />

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Select</TableHead>
                            <TableHead>Parameter name</TableHead>
                            <TableHead>Parameter values</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {parameters && Object.keys(groupedParams).length > 0 ? (
                            Object.entries(groupedParams).map(([paramName, paramList]) => (
                                <TableRow key={paramName}>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={!!checkedRows[paramName]}
                                            onChange={() => handleCheckboxChange(paramName)}
                                        />
                                    </TableCell>
                                    <TableCell>{paramName}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-4">
                                            {paramList.map((param) => (
                                                <label key={param.id} className="flex items-center gap-1">
                                                    <input
                                                        type="radio"
                                                        name={`paramids[${paramName}]`}
                                                        value={param.value}
                                                        checked={selectedValues[paramName] === param.value}
                                                        onChange={() => handleRadioChange(paramName, param.value)}
                                                        disabled={!checkedRows[paramName]}
                                                    />
                                                    {param.value}
                                                </label>
                                            ))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">
                                    No parameters found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Button type="submit" disabled={processing} className="mt-4">
                    {processing ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : 'Save'}
                </Button>
            </form>
        </AppLayout>
    );
}

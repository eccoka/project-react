import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Itemparam, type BreadcrumbItem, ItemEditResponse } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ItemEdit({
    item,
    itemparams,
    parameters,
}: ItemEditResponse) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Item edit',
            href: route('item.edit', [item.id]),
        },
    ];
    const { data, setData, put, processing } = useForm({
        param_name: '',
        value: '',
    });

    const filteredValues = parameters.filter(
        (parameter) => parameter.param_name === data.param_name
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('item.update', item.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Item edit" />
            <Card className="m-4 w-[450px] p-2">
                <CardHeader>
                    <CardTitle>
                        {item.id}. {item.brand} {item.name}
                    </CardTitle>
                    <CardDescription>
                        <div>Category: {item.group}</div>
                        <div className="pb-2">Barcode: {item.barcode}</div>
                        <Separator />
                        <div className="flex flex-row gap-4 py-2">
                            <div className="text-xs">Created by: {item.created_by}</div>
                            <div className="grow text-right text-xs">Created at: {item.created_at.split('T')[0]}</div>
                        </div>
                        {item.updated_by !== item.created_by && (
                            <div className="flex flex-row gap-4 py-2 text-xs">
                                <div>Updated by: {item.updated_by}</div>
                                <div className="grow text-right">Updated at: {item.updated_at.split('T')[0]}</div>
                            </div>
                        )}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {Array.isArray(itemparams) && itemparams.length > 0 ? (
                        <div className="flex flex-row gap-4 py-4">
                            <div className="grow">
                                {itemparams.map((param: Itemparam) => (
                                    param ? (
                                        <div key={param.id} className="flex flex-row gap-4 py-4">
                                            <div>{param.param_name}:</div>
                                            <div className="grow font-bold">{param.value}</div>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </div>
                    ) : null}
                    <Separator />
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <Label htmlFor="parameter">Select Parameter</Label>
                            <Select onValueChange={(value) => setData('param_name', value)}>
                                <SelectTrigger id="parameter">
                                    <SelectValue placeholder="Choose a parameter" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[...new Map(parameters.map((parameter: Itemparam) => [parameter.param_name, parameter])).values()].map(
                                        (uniqueParameter: Itemparam) => (
                                            <SelectItem key={`parameter-${uniqueParameter.id}`} value={uniqueParameter.param_name}>
                                                {uniqueParameter.param_name}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        {data.param_name && (
                            <div className="mb-4">
                                <Label htmlFor="value">Select Value</Label>
                                <Select onValueChange={(value) => setData('value', value)}>
                                    <SelectTrigger id="value">
                                        <SelectValue placeholder="Choose a value" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredValues.map((parameter: Itemparam) => (
                                            <SelectItem key={`value-${parameter.id}`} value={parameter.id.toString()}>
                                                {parameter.value}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}

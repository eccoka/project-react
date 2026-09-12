import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Survey index',
        href: '/survey/index',
    },
];

export default function SurveyIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Survey" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    
            </div>
        </AppLayout>
    );
}
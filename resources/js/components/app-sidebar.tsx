import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, BoxesIcon, ClipboardList, Folder, LayoutGrid, TagIcon, UsersIcon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/admin_dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        url: route('user.index'),
        icon: UsersIcon,
        items: [
            {
                title: 'Create user',
                url: route('user.create'),
            },
        ],
    },
    {
        title: 'Itemgroups',
        url: route('itemgroup.index'),
        icon: BoxesIcon,
        items: [
            {
                title: 'Create itemgroup',
                url: route('itemgroup.create'),
            },
        ],
    },
    {
        title: 'Itemparams',
        url: route('itemparam.index'),
        icon: BoxesIcon,
        items: [
            {
                title: 'Create itemparam',
                url: route('itemparam.create'),
            },
        ],
    },
    {
        title: 'Brands',
        url: route('brand.index'),
        icon: TagIcon,
        items: [
            {
                title: 'Create brand',
                url: route('brand.create'),
            },
        ],
    },
    {
        title: 'Items',
        url: route('item.index'),
        icon: UsersIcon,
        items: [
            {
                title: 'Create item',
                url: route('item.create'),
            },
        ],
    },
    {
        title: 'Stocks',
        url: route('stock.index'),
        icon: UsersIcon,
        items: [
            {
                title: 'Create stock',
                url: route('stock.create'),
            },
        ],
    },

    {
        title: 'Surveys',
        url: route('survey.index'),
        icon: ClipboardList,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin_dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    status: string;
    phone: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserResponse {
    data: User[];
    meta: {
        links: {
            url: string;
            label: string;
            active: boolean;
        }[];
    };
}

export interface Itemgroup {
    id: number;
    position: number;
    name: string;
    main: string;
    mainpos: number;
    sub1: string;
    sub1pos: number;    
    sub2: string;
    sub2pos: number;
    level: number;
    parent_id: number;
    status: string;
    image_path: string;
    created_by: number;
    updated_by: number;
    created_at: string;
    updated_at: string;
}

export interface ItemgroupResponse {
    data: Itemgroup[];
    meta: {
        links: {
            url: string;
            label: string;
            active: boolean;
        }[];
    };
}   

export interface Brand {
    id: number;
    name: string;
    motto: string;
    website: string;
    description: string;
    status: string;
    logo: string;
    created_by: number;
    updated_by: number;
    created_at: string;
    updated_at: string;
}

export interface Item {
    id: number;
    group: string;
    itemgroup_main: string;
    itemgroup_sub: string;
    itemgroup_sub2: string;
    brand: string;
    barcode: string;
    name: string;
    website: string;
    description: string;
    status: string;
    price: number;
    discount: number;
    unit: string;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
}

export interface Stock {
    id: number;
    stock_name: string;
    stock_code: string;
    address: string;
    phone: string;
    email: string;
    status: string;
    image: string;
    created_by: string;
    updated_by: string;
    created_at: string;
    updated_at: string;
}

export interface Itemparam {
    id: number;
    parent_gruopid: number;
    param_name: string;
    value: string;
    status: string;
}

export interface ItemparamResponse {
    data: Itemparam[];
    meta: {
        links: {
            url: string;
            label: string;
            active: boolean;
        }[];
    };
}

export interface Unit{
    name: string;
    value: number;
}

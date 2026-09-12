import { ChevronRight } from "lucide-react";
import { type NavItem } from '@/types';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items = [] }: { items: NavItem[] }) {

    const handleMainItemClick = (url: string | undefined) => {
        if (url) {
            window.location.href = url; // Navigálás a főmenü elem URL-jére
        }
    };

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    item.items?.length ? (
                        <Collapsible key={item.title} defaultOpen={item.isActive} className="group/collapsible">
                            <SidebarMenuItem>
                                <div className="flex items-center justify-between">
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        onClick={() => handleMainItemClick(item.url)} // Navigálás a főmenü elem URL-jére
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                    <CollapsibleTrigger asChild>
                                        <button className="ml-auto">
                                            <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </button>
                                    </CollapsibleTrigger>
                                </div>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items.map((subItem: NavItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <a href={subItem.url}>
                                                        <span>{subItem.title}</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} asChild>
                                <a href={item.url}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

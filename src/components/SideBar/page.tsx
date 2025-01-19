"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import {
    LayoutDashboard,
    Users,
    UserPlus,
    DollarSign,
    Calendar,
    Settings,
    HelpCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export type SidebarProps = React.InputHTMLAttributes<HTMLInputElement>;

const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Employee", icon: Users, href: "/employee" },
    { label: "Recruitment", icon: UserPlus, href: "/recruitment" },
    { label: "Payroll", icon: DollarSign, href: "/payroll" },
    { label: "Schedule", icon: Calendar, href: "/schedule" },
];

const departments = [
    { label: "Business and Marketing", color: "bg-blue-500" },
    { label: "Design", color: "bg-green-500" },
    { label: "Project Manager", color: "bg-orange-500" },
    { label: "Human Resource", color: "bg-purple-500" },
    { label: "Development", color: "bg-blue-500" },
];

const otherItems = [
    { label: "Settings", icon: Settings, href: "/settings" },
    { label: "Help Center", icon: HelpCircle, href: "/help-center" },
];

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname(); // Lấy đường dẫn hiện tại

    return (
        <div className={cn("flex flex-col h-screen border-r bg-white", className)}>
            <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                        B
                    </div>
                    <div>
                        <h2 className="font-semibold">BordUp™</h2>
                    </div>
                </div>
                <div className="mt-3">
                    <h3 className="font-medium">Rocks Company</h3>
                    <p className="text-sm text-muted-foreground">Team · 20 Members</p>
                </div>
            </div>
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-6">
                    {/* Main Menu */}
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            MAIN MENU
                        </h4>
                        <div className="space-y-1">
                            {menuItems.map(({ label, icon: Icon, href }) => (
                                <Link key={label} href={href} passHref>
                                    <Button
                                        variant={pathname === href ? "secondary" : "ghost"} // Kiểm tra đường dẫn hiện tại
                                        className={cn(
                                            "w-full justify-start gap-2",
                                            pathname === href &&
                                            "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                        )}
                                    >
                                        <Icon size={20} />
                                        {label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Departments */}
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            DEPARTMENT
                        </h4>
                        <div className="space-y-1">
                            {departments.map(({ label, color }) => (
                                <Button key={label} variant="ghost" className="w-full justify-start gap-2">
                                    <span className={`w-2 h-2 rounded-full ${color}`} />
                                    {label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Other */}
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                            OTHER
                        </h4>
                        <div className="space-y-1">
                            {otherItems.map(({ label, icon: Icon, href }) => (
                                <Link key={label} href={href} passHref>
                                    <Button
                                        variant={pathname === href ? "secondary" : "ghost"} // Kiểm tra đường dẫn hiện tại
                                        className="w-full justify-start gap-2"
                                    >
                                        <Icon size={20} />
                                        {label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}

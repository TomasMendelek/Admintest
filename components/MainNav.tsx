"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";

type Route = {
    href: string;
    label: string;
    active: boolean;
};

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();
    const [storeType, setStoreType] = useState<string>("");

    useEffect(() => {
        const fetchStoreType = async () => {
            try {
                const response = await axios.get(`/api/stores/${params.storeId}`);
                setStoreType(response.data.type);
            } catch (error) {
                console.error("Failed to fetch store type:", error);
            }
        };

        fetchStoreType();
    }, [params.storeId]);


    const storeSpecificRoutes: Route[] = storeType === "ropa" 
        ? [
            { href: `/${params.storeId}`, label: 'Inicio', active: pathname === `/${params.storeId}` },
            { href: `/${params.storeId}/billboards`, label: 'Publicidades', active: pathname === `/${params.storeId}/billboards` },
            { href: `/${params.storeId}/categories`, label: 'Categorías', active: pathname === `/${params.storeId}/categories` },
            { href: `/${params.storeId}/products`, label: 'Productos', active: pathname === `/${params.storeId}/products` },
            { href: `/${params.storeId}/orders`, label: 'Órdenes', active: pathname === `/${params.storeId}/orders` },
            { href: `/${params.storeId}/colors`, label: 'Colores', active: pathname === `/${params.storeId}/colors` },
            { href: `/${params.storeId}/sizes`, label: 'Talles', active: pathname === `/${params.storeId}/sizes` },
            { href: `/${params.storeId}/settings`, label: 'Configuración', active: pathname === `/${params.storeId}/settings` },
        ]
        : (storeType === "electronica" || storeType === "informatica")
        ? [
            { href: `/${params.storeId}`, label: 'Inicio', active: pathname === `/${params.storeId}` },
            { href: `/${params.storeId}/billboards`, label: 'Publicidades', active: pathname === `/${params.storeId}/billboards` },
            { href: `/${params.storeId}/categories`, label: 'Categorías', active: pathname === `/${params.storeId}/categories` },
            { href: `/${params.storeId}/products`, label: 'Productos', active: pathname === `/${params.storeId}/products` },
            { href: `/${params.storeId}/orders`, label: 'Órdenes', active: pathname === `/${params.storeId}/orders` },
            { href: `/${params.storeId}/colors`, label: 'Colores', active: pathname === `/${params.storeId}/colors` },
            { href: `/${params.storeId}/brands`, label: 'Marcas', active: pathname === `/${params.storeId}/brands` },
            { href: `/${params.storeId}/types`, label: 'Tipos', active: pathname === `/${params.storeId}/types` },
            { href: `/${params.storeId}/settings`, label: 'Configuración', active: pathname === `/${params.storeId}/settings` },
        ]
        : [];

    const routes = [...storeSpecificRoutes];

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    );
}

import { PageProps as InertiaPageProps } from '@inertiajs/inertia';

export interface FlashProps {
    success?: string;
    error?: string;
}

export interface PageProps extends InertiaPageProps {
    flash: FlashProps;
}

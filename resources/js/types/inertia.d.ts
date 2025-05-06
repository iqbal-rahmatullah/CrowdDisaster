import { PageProps as InertiaPageProps } from '@inertiajs/inertia';
import { User } from '.';

export interface FlashProps {
    success?: string;
    error?: string;
}

export interface PageProps extends InertiaPageProps {
    flash: FlashProps;
    auth: {
        user: User;
    };
}

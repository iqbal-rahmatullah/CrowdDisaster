import { RepportStatus } from '@/types/repport';

export const getRadiusColor = (status: RepportStatus) => {
    switch (status) {
        case RepportStatus.NEED_SUPPORT:
            return 'yellow';
        case RepportStatus.NEED_RESPONSIBLE:
            return 'red';
        case RepportStatus.IN_PROGRESS:
            return 'blue';
        default:
            return 'green';
    }
};

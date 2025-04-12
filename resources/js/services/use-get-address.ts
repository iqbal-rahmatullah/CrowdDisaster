import { Location } from '@/types/location';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetAddress = ({ location }: { location: Location }) => {
    const query = useQuery({
        queryKey: ['address-marker'],
        enabled: false,
        queryFn: async () => {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse.php?lat=${location.latitude}&lon=${location.longitude}&format=jsonv2`,
            );

            return response.data.display_name.replace(/[^\u0020-\u007E\u00A1-\u024F\u1E00-\u1EFF ,.-]/g, '');
        },
    });

    return query;
};

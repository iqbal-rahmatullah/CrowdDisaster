import { Repport } from '@/types/repport';
import L from 'leaflet';

export const getIconMarker = (repport: Repport) => {
    const path = `${repport.type}_${repport.status}.png`;

    console.log(path);

    return L.icon({
        iconUrl: '/img/logo_marker/' + path,
        iconSize: [40, 40],
        popupAnchor: [0, -20],
    });
};

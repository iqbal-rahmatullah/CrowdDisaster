export enum RepportType {
    FLOOD = 'flood',
    EARTHQUAKE = 'earthquake',
    FIRE = 'fire',
    LANDSLIDE = 'landslide',
    TORNADO = 'tornado',
    TSUNAMI = 'tsunami',
    VOLCANO = 'volcano',
    DROUGHT = 'drought',
}

export enum RepportStatus {
    NEED_SUPPORT = 'need_support',
    NEED_RESPONSIBLE = 'need_responsible',
    IN_PROGRESS = 'in_progress',
    DONE = 'done',
}

export interface Repport {
    id: number;
    latitude: string;
    longitude: string;
    address: string;
    title: string;
    description: string;
    type: RepportType;
    status: RepportStatus;
    radius: number;
    additional_information: string;
    created_at: string;
    updated_at: string;
}

export const GetRepportTypeLabel: Record<RepportType, string> = {
    [RepportType.FLOOD]: 'Banjir',
    [RepportType.EARTHQUAKE]: 'Gempa Bumi',
    [RepportType.FIRE]: 'Kebakaran',
    [RepportType.LANDSLIDE]: 'Tanah Longsor',
    [RepportType.TORNADO]: 'Angin Puting Beliung',
    [RepportType.TSUNAMI]: 'Tsunami',
    [RepportType.VOLCANO]: 'Letusan Gunung Berapi',
    [RepportType.DROUGHT]: 'Kekeringan',
};

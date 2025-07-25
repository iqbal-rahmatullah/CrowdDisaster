import { User } from '.';

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

export enum ReportFileType {
    IMAGE = 'image',
    VIDEO = 'video',
}

export interface RepportProof {
    id: number;
    repport_id: number;
    file_path: string;
    file_type: ReportFileType;
}

export interface RepportSupport {
    id: number;
    repport_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: User;
}

export interface RepportImpact {
    id: number;
    repport_id: number;
    victim_died?: number;
    victim_injured?: number;
    damaged_house?: number;
    damaged_building?: number;
    damaged_village?: number;
}

export interface RepportCommentProof {
    id: number;
    repport_comment_id: number;
    file_path: string;
    file_type: ReportFileType;
}

export interface RepportComment {
    id: number;
    repport_id: number;
    user_id: number;
    user: User;
    proofs: RepportCommentProof[];
    comment: string;
    created_at: string;
    updated_at: string;
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
    additional_information?: string;
    created_at: string;
    updated_at: string;
    repport_proofs: RepportProof[];
    repport_supports: RepportSupport[];
    repport_comments: RepportComment[];
    repport_impacts?: RepportImpact;
    problem_repport: ProblemRepport[];
}

export type ProblemRepport = {
    id: number;
    reason: string;
    user: User;
    created_at: string;
};

export const GetRepportImpact: Record<
    string,
    {
        title: string;
    }
> = {
    victim_died: {
        title: 'Korban Meninggal',
    },
    victim_injured: {
        title: 'Korban Luka',
    },
    damaged_house: {
        title: 'Rumah Rusak',
    },
    damaged_building: {
        title: 'Bangunan Rusak',
    },
    damaged_village: {
        title: 'Desa Terdampak',
    },
};

export const GetRepportStatusLabel: Record<RepportStatus, string> = {
    [RepportStatus.NEED_SUPPORT]: 'Butuh Dukungan',
    [RepportStatus.NEED_RESPONSIBLE]: 'Butuh Penanganan',
    [RepportStatus.IN_PROGRESS]: 'Sedang Diproses',
    [RepportStatus.DONE]: 'Selesai',
};

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

export const GetRepportStatusBackground: Record<RepportStatus, string> = {
    [RepportStatus.NEED_SUPPORT]: 'bg-yellow-500',
    [RepportStatus.NEED_RESPONSIBLE]: 'bg-red-500',
    [RepportStatus.IN_PROGRESS]: 'bg-blue-500',
    [RepportStatus.DONE]: 'bg-green-500',
};

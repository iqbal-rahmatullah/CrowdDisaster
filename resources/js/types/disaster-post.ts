import { User } from '.';

export type DisasterPostProof = {
    id: number;
    disaster_post_id: number;
    file_path: string;
    file_type: string;
    created_at: string;
    updated_at: string;
};

export type DisasterPostRefugee = {
    id: number;
    name: string;
    phone: string;
    nik: string;
    gender: string;
};

export type DisasterPostProgressionProof = {
    id: number;
    file_path: string;
    file_type: string;
    created_at: string;
    updated_at: string;
};

export type DisasterPostProgression = {
    id: number;
    progression: string;
    user: User;
    proof: DisasterPostProgressionProof[];
    created_at: string;
    updated_at: string;
};

export type DisasterPost = {
    id: number;
    title: string;
    quota: number;
    contact: string;
    description: string;
    address: string;
    latitude: string;
    longitude: string;
    created_at: string;
    updated_at: string;
    disaster_posts_proof: DisasterPostProof[];
    disaster_posts_refugees: DisasterPostRefugee[];
    disaster_posts_progression: DisasterPostProgression[];
};

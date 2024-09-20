export interface UserTraffic {
    id: string;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    country: string;
    company: string;
    status: string;
    globalRole: string;
}

export interface ReferrerTrafficRecord {
    id: string;
    user: UserTraffic;
    createdAt: string; 
    updatedAt: string; 
    status: string;
}

export type UpdateReferrer = {
    id: string;
    firstName: string;
    lastName: string; 
    email: string; 
    country: string;
    code: string;
};



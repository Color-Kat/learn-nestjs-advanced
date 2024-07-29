export type JwtPayloadType = {
    email: string;
    userId: number;
    artistId?: number;
};

export type Enable2FAType = {
    secret: string;
};
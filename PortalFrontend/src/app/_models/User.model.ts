import { Photo } from './Photo.model';

export interface User {
    id: number;
    userName: string;
    gender: string;
    age: number;
    created: Date;
    lastAction: Date;
    country: string;
    city: string;
    //
    growth: string;
    eyeColor: string;
    hairColor: string;
    martialStatus: string;
    edukation: string;
    profession: string;
    children: string;
    languages: string;
    //
    description: string;
    personality: string;
    lookingFor: string;
    //
    interests: string;
    freeTime: string;
    //
    iLike: string;
    iDontLike: string;
    //
    photos: Photo[];
    photoUrl: string;
}

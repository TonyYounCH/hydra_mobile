export type Parcel =  {
    id: number;
    images: string[];
    rentLow: number;
    rentHigh: number;
    bedroomLow: number;
    bedroomHigh: number;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    tags: string[];
    lat: number;
    lon: number;
}
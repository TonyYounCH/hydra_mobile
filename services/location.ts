import axios from "axios";

import { endpoints } from "../constants";
import { Location } from "../types/locationIQ";

export const getSuggestedCounties = (text: string) => {
    const counties = ['Alameda', 'Alpine', 'Amador', 'Butte', 'Calaveras', 'Colusa', 'Contra Costa', 'Del Norte', 'El Dorado', 'Fresno', 'Glenn', 'Humboldt', 'Imperial', 'Kern', 'Kings', 'Lake', 'Lassen', 'Los Angeles', 'Madera', 'Marin', 'Mendocino', 'Merced', 'Mono', 'Monterey', 'Napa', 'Nevada', 'Orange', 'Placer', 'Riverside', 'Sacramento', 'San Benito', 'San Bernardino', 'San Diego', 'San Francisco', 'San Joaquin', 'San Luis Obispo', 'San Mateo', 'Santa Barbara', 'Santa Clara', 'Santa Cruz', 'Shasta', 'Sierra', 'Solano', 'Sonoma', 'Stanislaus', 'Sutter', 'Tehama', 'Trinity', 'Tulare', 'Tuolumne', 'Ventura', 'Yolo'];
    try {
        return counties.filter(county => county.toLowerCase().startsWith(text.toLowerCase()));
    } catch (error) {
        return [];
    }
};
export const getSuggestedLocations = async (text: string, limit?: number) => {

    // Create the Location variable
    const location: Location = {
        place_id: "some_place_id",
        osm_id: "some_osm_id",
        osm_type: "some_osm_type",
        lat: "37.15376180921739",
        lon: "-120.46643198553329",
        boundingbox: ["37.15376180921739", "-120.46643198553329", "38.15376180921739", "-121.46643198553329"],
        class: "place",
        type: "city",
        display_name: "Some Display Name",
        display_place: "Some Display Place",
        display_address: "Some Display Address",
        address: {
            name: "Some Name",
            house_number: "123",
            road: "Main Street",
            neighbourhood: "Some Neighbourhood",
            city: "Some City",
            state: "Some State",
            country: "Some Country",
            postcode: "12345",
        },
    };
    try {
        let finalLimit = 8;
        if (limit) finalLimit = limit;

        const url = `${endpoints.autoComplete}?location=${text}&limit=${finalLimit}`;
        const { data } = await axios.get<Location[]>(url);
        if (data) return data;
        else return [];
    } catch (error) {
        console.error(error);
        return [location];
    }
};

export const searchLocations = async (text: string) => {
    try {
        const url = `${endpoints.search}?location=${text}`;
        const { data } = await axios.get<Location[]>(url);
        if (data) return data;
        else return [];
    } catch (error) {
        console.error(error);
        return [];
    }
};


export const queryAPN = async (apn: string, selectedCounty: string) => {

    // Create the Location variable
    const location: Location = {
        place_id: "some_place_id",
        osm_id: "some_osm_id",
        osm_type: "some_osm_type",
        lat: "37.15376180921739",
        lon: "-120.46643198553329",
        boundingbox: ["36.15376180921739", "38.15376180921739", "-121.46643198553329", "-119.46643198553329"],
        class: "place",
        type: "city",
        display_name: "Some Display Name",
        display_place: "Some Display Place",
        display_address: "Some Display Address",
        address: {
            name: "Some Name",
            house_number: "123",
            road: "Main Street",
            neighbourhood: "Some Neighbourhood",
            city: "Some City",
            state: "Some State",
            country: "Some Country",
            postcode: "12345",
        },
    };
    return [location];
};

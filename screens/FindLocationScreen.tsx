import { Platform, StyleSheet, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Input, Button, Text, IndexPath, Select, SelectItem, Layout, Divider } from "@ui-kitten/components";
import { useQueryClient } from "react-query";

import { Screen } from "../components/Screen";
import { ModalHeader } from "../components/ModalHeader";
import { theme } from "../theme";
import { useState } from "react";
import { Row } from "../components/Row";
import { useNavigation } from "@react-navigation/native";
import { getSuggestedCounties, getSuggestedLocations, queryAPN } from "../services/location";
import { Location } from "../types/locationIQ";
import { CurrentLocationButton } from "../components/CurrentLocationButton";
import { getFormattedLocationText } from "../utils/getFormattedLocationText";
import { RecentSearchList } from "../components/RecentSearchList";

export const FindLocationScreen = () => {

    const [apn, setApn] = useState("")
    const [selectedCounty, setSelectedCounty] = useState<string>('');

    const navigation = useNavigation()
    const queryClient = useQueryClient();
    const recentSearches: Location[] | undefined = queryClient.getQueryData("recentSearches")

    const setRecentSearch = (location: Location) => {
        queryClient.setQueryData("recentSearches", () => {
            if (recentSearches) {
                let included = false;
                for (let i of recentSearches) {
                    if (i.display_name === location.display_name && i.lon === location.lon && i.lat === location.lat) {
                        included = true;
                        break;
                    }
                }
                if (!included) return [location, ...recentSearches]
                else return recentSearches
            }
            return [location]
        })
    }
    const handleChange = async (val: string) => {
        setApn(val)
    }

    const handleAPNSearch = async () => {
        const locations = await queryAPN(apn, selectedCounty);
        if (locations.length > 0 ) {
            handleNavigate(locations[0])
        }
           
    }

    const handleNavigate = (location: Location) => {
        setRecentSearch(location)
        navigation.navigate("Root", {
            screen: "Search",
            params: {
                location: getFormattedLocationText(location),
                lat: location.lat,
                lon: location.lon,
                boundingBox: location.boundingbox,
            }
        })
    }

    const getCountyInput = () => {
        const counties = ['Alameda', 'Alpine', 'Amador', 'Butte', 'Calaveras', 'Colusa', 'Contra Costa', 'Del Norte', 'El Dorado', 'Fresno', 'Glenn', 'Humboldt', 'Imperial', 'Kern', 'Kings', 'Lake', 'Lassen', 'Los Angeles', 'Madera', 'Marin', 'Mendocino', 'Merced', 'Mono', 'Monterey', 'Napa', 'Nevada', 'Orange', 'Placer', 'Riverside', 'Sacramento', 'San Benito', 'San Bernardino', 'San Diego', 'San Francisco', 'San Joaquin', 'San Luis Obispo', 'San Mateo', 'Santa Barbara', 'Santa Clara', 'Santa Cruz', 'Shasta', 'Sierra', 'Solano', 'Sonoma', 'Stanislaus', 'Sutter', 'Tehama', 'Trinity', 'Tulare', 'Tuolumne', 'Ventura', 'Yolo'];
        return (
            <Layout
              style={styles.defaultMarginTop}
              level='1'
            >
                <Select
                    value={selectedCounty}
                    onSelect={index => {
                        setSelectedCounty(counties[index.row])
                    }}
                    placeholder={'Select County'}
                >
                    {
                        counties.map((county) => <SelectItem title={county} />)
                    }
                    
                </Select>
            </Layout>
        )
    }

    const getApnInput = () => {
        return (
            <Input 
                keyboardType="default"
                selectionColor={theme["color-primary-500"]}
                placeholder="Enter APN"
                size={"large"}
                value={apn}
                onChangeText={handleChange}
                style={styles.defaultMarginTop}
            />
        )
    }
    return (
        <Screen>
            {Platform.OS === "ios" ? <ModalHeader/> : null}
            <View style={styles.screenContent}>
                {getCountyInput()}
                {getApnInput()}
                <Button appearance="ghost" status="info" onPress={handleAPNSearch}>
                    Search
                </Button>
                <Divider style={styles.divider} />
                <ScrollView bounces={false}>
                    <CurrentLocationButton style={styles.currentLocationButton}/>
                    <RecentSearchList style={styles.recentSearchContainer} recentSearches={recentSearches}/>
                </ScrollView>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screenContent: {
        marginHorizontal: 10,
    },
    defaultMarginTop : {
        marginTop: 10
    },
    suggestionContainer: {
        alignItems:"center",
        padding:15,
        borderBottomWidth: 1,
        borderBottomColor: theme["color-gray"]
    },
    currentLocationButton: {
        marginTop: 30
    },
    divider: {
        marginTop:10,
        backgroundColor: theme['color-gray']
    },
    recentSearchContainer: {
        marginTop: 30,
    }
})
import { Animated, StyleSheet, View } from "react-native"
import { useState, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import LottieView from "lottie-react-native";

import { Screen } from "../components/Screen";
import { Card } from "../components/Card";

import { HEADERHEIGHT, LISTMARGIN } from "../constants";
import { AnimatedListHeader } from "../components/AnimatedListHeader";
import { Map } from "../components/Map";
import { getParcelsInArea } from "../data/parcels";
import { SearchScreenParams } from "../types";
import { Parcel } from "../types/parcel";
import { Text } from "@ui-kitten/components";
import * as Location from 'expo-location';

export const SearchScreen = ({
    route,
} : {
    route: { params: SearchScreenParams }
}) => {
    
    const [mapShown, setMapShown] = useState<boolean>(true)
    const [scrollAnimation] = useState(new Animated.Value(0));
    const mapRef = useRef<MapView | null>(null)

    const [parcels, setParcels] = useState<Parcel[]>([])
    const [location, setLocation] = useState<string | undefined>(undefined);
    
    const centerMapToCurrentLocation = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== "granted") {
            alert("Permission to access location was denied");
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        let lat = location.coords.latitude;
        let lon = location.coords.longitude;
        mapRef?.current?.animateToRegion({
            latitude:lat,
            longitude:lon,
            latitudeDelta: 0.4,
            longitudeDelta:0.4
        })
    }

    useEffect(() => {
        if (route.params) {
            const numBoundingBox = [
                Number(route.params.boundingBox[0]),
                Number(route.params.boundingBox[1]),
                Number(route.params.boundingBox[2]),
                Number(route.params.boundingBox[3]),
            ]
            setLocation(route.params.location)
            setParcels(getParcelsInArea(numBoundingBox))
            mapRef?.current?.animateCamera({
                center: {
                    latitude: Number(route.params.lat),
                    longitude: Number(route.params.lon)
                }
            })
        } else {
            centerMapToCurrentLocation()
        }
    }, [route])
    return (
        <Screen >
            <AnimatedListHeader 
                scrollAnimation={scrollAnimation} 
                setMapShown={setMapShown} 
                mapShown={mapShown}
                location={location ? location : "APN Search"}
            />
            {
                mapShown?
                <Map 
                    parcels={parcels} 
                    mapRef={mapRef}
                    location={location ? location : "APN Search"}
                    setLocation={setLocation}
                    setParcels={setParcels}
                    initialRegion={
                        route.params 
                        ? {
                            latitude: Number(route.params.lat),
                            longitude: Number(route.params.lon),
                            latitudeDelta: 0.4,
                            longitudeDelta: 0.4
                        } :
                        undefined
                    }
                /> : <>
                    {
                        parcels.length > 0 ? 
                        <Animated.FlatList
                            onScroll={Animated.event([
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            y: scrollAnimation,
                                        }
                                    }
                                }
                            ])}
                            contentContainerStyle={{paddingTop: HEADERHEIGHT - 20}}
                            bounces={false}
                            scrollEventThrottle={16}
                            data={parcels}
                            keyExtractor={(item)=> item.id.toString()}
                            renderItem={({item})=> (
                                <Card style={{marginVertical: 5}} parcel={item}/>
                            )}
                            style={{marginHorizontal: LISTMARGIN}}
                        /> :(
                            <>
                                {
                                    route.params ?
                                    <View style={styles.lottieContainer}>
                                        <Text category="h6">No parcels found</Text>
                                    </View> :
                                    <View style={styles.lottieContainer}>
                                        <LottieView
                                            autoPlay
                                            loop
                                            style={styles.lottie}
                                            source={require("../assets/lotties/SearchScreen.json")}
                                        />
                                        <Text category="h6">Begin Your Search</Text>
                                    </View>
                                }
                            </>
                        )
                    }
                </>
            }
        </Screen>
    );
}

const styles = StyleSheet.create({
    lottieContainer: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    lottie: {
        height: 200,
        width: 200,
    }
})
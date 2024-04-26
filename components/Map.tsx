import MapView, { Region } from "react-native-maps"
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native"
import { Parcel } from "../types/parcel"
import { MapMarker } from "./MapMarker"
import { useState, useEffect } from "react"
import { theme } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { Card } from "./Card"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Button } from "@ui-kitten/components"
import { getParcelsInArea } from "../data/parcels"

let mapRegion: Region | undefined = undefined;

export const Map = ({
    parcels, 
    mapRef,
    location,
    setLocation,
    setParcels,
    initialRegion,
} : {
    parcels: Parcel[];
    mapRef:  React.MutableRefObject<MapView | null>;
    location: string;
    setLocation: (location: string) => void;
    setParcels: (parcels: Parcel[]) => void;
    initialRegion?: Region | undefined;
}) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [showSearchAreaButton, setShowSearchAreaButton] = useState(false);
    const [boundingBox, setBoundingBox] = useState<number[]>([])
    const [region, setRegion] = useState<Region|undefined>(
        mapRegion ? mapRegion : undefined
    );
    const navigation = useNavigation()

    useEffect(() => {
        if (location === "Map Area") return;
        if(initialRegion) {
            setShowSearchAreaButton(false);
            setRegion(initialRegion)
        }
    }, [initialRegion])

    const unFocusParcel = () => {
        setActiveIndex(-1)
        navigation.setOptions({tabBarStyle: {display: "flex"}})
    }

    const handleMapPress = () => {
        if (Platform.OS === "android") {
            unFocusParcel()
        }
    }

    const handelMarkerPress = (index:number) => {
        setTimeout(() => {
            mapRef.current?.animateCamera({center: {latitude: parcels[index].lat, longitude: parcels[index].lon}})
        }, 100)
        setTimeout(() => {
            const newRegion: Region = {
                latitude: parcels[index].lat,
                latitudeDelta: region?.latitudeDelta ? region.latitudeDelta : 0.4,
                longitude: parcels[index].lon,
                longitudeDelta: region?.longitudeDelta ? region.longitudeDelta : 0.4,
            }
            setRegion(newRegion)
        }, 600 )

        setActiveIndex(index)
        navigation.setOptions({tabBarStyle: {display: "none"}})
    }

    const handleSearchAreaButtonPress = () => {
        setParcels(getParcelsInArea(boundingBox));
        setLocation("Map Area")
        mapRegion = region;
        setShowSearchAreaButton(false)
        
    }
    return (
        <View style={styles.container}>
            <MapView 
                mapType="satellite"
                provider="google"
                style={styles.map}
                userInterfaceStyle="light"
                ref={mapRef}
                onPress={handleMapPress}
                region={region}
                onRegionChangeComplete={(region, isGesture) => {
                    if (isGesture.isGesture) {
                        if(!showSearchAreaButton) setShowSearchAreaButton(true);
                        const newBoundingBox = [
                            region.latitude - region.latitudeDelta / 2,
                            region.latitude + region.latitudeDelta / 2,
                            region.longitude - region.longitudeDelta / 2,
                            region.longitude + region.longitudeDelta / 2,
                        ]
                        setBoundingBox(newBoundingBox)
                    }
                }}
            >
                {
                    parcels.map((i, index) => (
                    <MapMarker 
                        lat={i.lat} 
                        lon={i.lon} 
                        color={activeIndex === index ? "#FEFECC" :"#FEFD04"} 
                        onPress={() => handelMarkerPress(index)}
                    />))
                }
            </MapView>
            { 
                activeIndex > -1 && 
                (<>
                    {
                        Platform.OS === "ios" && (
                            <TouchableOpacity style={styles.exit} onPress={unFocusParcel}>
                                <MaterialCommunityIcons name="close" color={theme["color-primary-500"]} size={24} />
                            </TouchableOpacity>
                        )
                    }
                    <Card parcel={parcels[activeIndex]} style={styles.card}/>
                </>)
            }
            {
                showSearchAreaButton && activeIndex === -1 && (
                    <Button
                        style={styles.searchAreaButton}
                        appearance="ghost"
                        onPress={handleSearchAreaButtonPress}
                    >
                        Search Area
                    </Button>
                )
            }
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        overflow:"hidden"
    },
    map: {
        height:"100%", 
        width:"100%"
    },
    card: {
        position: "absolute",
        bottom: 10,
        height: 360
    },
    exit: {
        backgroundColor: "#FFF",
        padding: 20,
        position: "absolute",
        top: 170,
        left: 15,
        borderRadius: 30,
    },
    searchAreaButton: {
        position: "absolute",
        bottom: 30,
        zIndex: 100,
        borderRadius: 30,
        alignSelf: "center",
        backgroundColor: "white",
        borderColor: theme["color-gray"],
        borderWidth: 1,
    }
})
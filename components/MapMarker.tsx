import { Marker, Polygon } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const MapMarker = ({lat, lon, onPress, color} : {lat: number, lon: number, onPress: ()=>void, color:string}) => {
    return <Marker coordinate={{latitude: lat, longitude: lon}} onPress={onPress}>
        <MaterialCommunityIcons name='map-marker' size={32} color={color} />
    </Marker>
}
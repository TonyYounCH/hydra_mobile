import { View,  ViewStyle, StyleSheet } from "react-native"

import { Parcel } from "../types/parcel";
import { ImageCarousel } from "./ImageCarousel";
import { CardInformation } from "./CardInformation";
import { LISTMARGIN } from "../constants";

export const Card = ({parcel, style} : {parcel : Parcel, style?: ViewStyle}) => {
    return (<View style={[styles.container, style]}>
                <ImageCarousel images={parcel.images}/>
                <CardInformation parcel={parcel} />
            </View>);
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: LISTMARGIN,
        borderRadius: 5,
        backgroundColor: "white"
    }
})

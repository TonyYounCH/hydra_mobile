import { View, StyleSheet } from "react-native"
import { Text, Button } from "@ui-kitten/components"
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "../theme"; 
import { Parcel } from "../types/parcel";
import { Row } from "./Row";

export const CardInformation = ({parcel}: {parcel: Parcel}) => {
    return (<View 
            style={styles.informationContainer}>
            <Row style={styles.rowJustification}>
                <Text category="s1">${parcel.rentLow.toLocaleString()} - {" "} {parcel.rentHigh.toLocaleString()}</Text>
                <MaterialCommunityIcons name="heart-outline" color={theme["color-primary-500"]} size={24} />
            </Row>
            <Text category="c1">{parcel.bedroomLow} - {parcel.bedroomHigh} Beds</Text>
            <Text category="c1" style={styles.defaultMarginTop}>{parcel.name}</Text>
            <Text category="c1">{parcel.street}</Text>
            <Text category="c1">{parcel.city} {parcel.state} {parcel.zip}</Text>

            <Text category="c1" style={styles.defaultMarginTop}>{parcel.tags.map((tag, index) => index === parcel.tags.length - 1 ? tag : `${tag}, `)}</Text>

            <Row style={[styles.defaultMarginTop, styles.rowJustification]}>
                <Button 
                    appearance="ghost" 
                    style={[styles.button, {borderColor: theme["color-primary-500"]}]}
                    size="small"
                    onPress={() => console.log("email the parcel manager")}>Email </Button>
                <Button 
                    style={styles.button}
                    onPress={() => console.log("call the parcel manager")}>Call </Button>

            </Row>
        </View>)
}

const styles = StyleSheet.create({
    informationContainer: {
        paddingVertical: 10, 
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: theme["color-gray"], 
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    defaultMarginTop: {
        marginTop: 5
    },
    rowJustification: {
        justifyContent: "space-between"
    },
    button: {
        width: "49%"
    },
})
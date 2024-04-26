import { Row } from "./Row"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Text } from "@ui-kitten/components"
import { TouchableOpacity, StyleSheet } from "react-native"
import { theme } from "../theme"
import { LISTMARGIN } from "../constants"
import { useNavigation } from "@react-navigation/native"

const HeaderLogisticsButton = ({label, onPress, iconName, style}:{label: string, onPress: () => void, iconName?: any, style?:any}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Row style={[styles.row, style]}>
                {iconName ? <MaterialCommunityIcons name={iconName} color={theme["color-info-500"]} size={18}/> : null}
                <Text 
                    category="c1" 
                    style={styles.logisticsButtonText}
                    >{label}</Text>
            </Row>
        </TouchableOpacity>        
    )
}

export const HeaderLogistics = ({setMapShown, mapShown} : {setMapShown:(bool: boolean) => void, mapShown:boolean}) => {
    const navigation = useNavigation()

    const handelMapPress = () => {
        navigation.setOptions({tabBarStyle: {display: "flex"}})
        setMapShown(!mapShown)
    }
    return (
        <Row style={styles.container}>
            <Row>
                <MaterialCommunityIcons name="map-marker" size={18} color={theme["color-primary-500"]} />
                <Text category="c1" appearance="hint">12 Parcels Selected</Text>
                <HeaderLogisticsButton label="Save" onPress={() => console.log("save")} style={{marginLeft: 10}} />
            </Row>
            <Row>
                <HeaderLogisticsButton label="Sort" onPress={() => console.log("sort")} iconName={"sort"} />
                {
                    mapShown ? 
                    <HeaderLogisticsButton label="List" onPress={handelMapPress} iconName={"format-list-bulleted"} style={{marginLeft: 20}}/>
                    :
                    <HeaderLogisticsButton label="Map" onPress={handelMapPress} iconName={"map-outline"} style={{marginLeft: 20}}/>
                }
                

            </Row>
        </Row>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center", 
        justifyContent:"space-between",
        marginHorizontal: LISTMARGIN,
        marginVertical: 5,
    },
    row : {
        alignItems: "center"
    },
    logisticsButtonText: {
        color: theme["color-info-500"],
        fontWeight: "bold",
        marginLeft: 5,
    }
})
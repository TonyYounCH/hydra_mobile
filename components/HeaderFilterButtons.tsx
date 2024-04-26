import { FlatList, StyleSheet } from "react-native"
import { Button } from "@ui-kitten/components"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { theme } from "../theme"


export const HeaderFilterButtons = () => {

    const filterButtons = [
        {
            iconName: "filter-variant",
            onPress: () => console.log("filter all")
        },
        // {
        //     label: "Price",
        //     onPress: () => console.log("price")
        // },
        {
            label: "Point Search",
            onPress: () => console.log("Point Search")
        },
        {
            label: "Area Search",
            onPress: () => console.log("Area Search")
        },
    ]
    
    return (
        <FlatList
            data={filterButtons}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginVertical: 10}}
            renderItem={({item, index}) => {
                if(item.iconName) {
                    return <Button
                                appearance="ghost"
                                style={[styles.button, {width: 48}]}
                                onPress={item.onPress}
                                accessoryLeft={
                                    <MaterialCommunityIcons name={item.iconName as any} size={20} color={theme["color-primary-500"]} />
                                }
                            >

                            </Button>
                } else {
                    return <Button
                                appearance="ghost"
                                style={styles.button}
                                onPress={item.onPress}
                            >
                                {item.label}
                            </Button>
                }
            }}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        borderColor: theme["color-gray"],
        marginHorizontal: 3,
    },
})
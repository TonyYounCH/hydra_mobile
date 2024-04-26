import { View, StyleSheet, ViewStyle } from "react-native";
import { Button } from "@ui-kitten/components";

import { theme } from "../theme";

export const SignUpAndSignInButtons = ({ style } : { style?: ViewStyle }) => {
    return (
        <View style={style}>
            <Button onPress={() => console.log("navigate to Sign In")}>
                Sign In
            </Button>
            <Button 
                appearance="ghost"
                style={styles.signUpButton}
                onPress={() => console.log("navigate to Sign In")}
            >
                Create Account
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    signUpButton : {
        marginVertical: 10,
        borderColor: theme["color-primary-500"]
    }
})
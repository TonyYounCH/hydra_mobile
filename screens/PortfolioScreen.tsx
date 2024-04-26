import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native"
import { Button, Text } from "@ui-kitten/components";
import { useState } from "react";
import LottieView from "lottie-react-native";

import { Screen } from "../components/Screen";
import { Row } from "../components/Row";
import { theme } from "../theme";
import { parcels } from "../data/parcels";
import { Card } from "../components/Card";
import { Parcel } from "../types/parcel";
import { SignUpAndSignInButtons } from "../components/SignUpAndSignInButtons";
import Accordion from 'react-native-collapsible/Accordion';

export const PortfolioScreen = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const user = undefined;
    const userRanches = [{
        ranchId : 1,
        ranchName : "Ranch Name",
        parcels: parcels
    }]

    const getButtonAppearance = (buttonIndex: number) => {
        if (activeIndex === buttonIndex) return "filled"
        else return "ghost"
    }

    const handleButtonPress = (index: number) => {
        setActiveIndex(index)
    }

    const getBodyText = (heading: string, subHeading: string) => {
        return (
            <View style={styles.textContainer}>
                <Text category={"h6"} style={styles.text}>
                    {heading}
                </Text>
                <Text appearance={"hint"} style={[styles.text, styles.subHeading]}>
                    {subHeading}
                </Text>
            </View>
        );
    };

    const getRanchesList = (ranches : any[]) => {      
        const renderHeader = (ranch:any) => {
            return (
                <View style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>{ranch.ranchName}</Text>
                </View>
            );
        };
      
        const renderContent = (ranch:any) => {
            return (
                getParcelsFlatList(ranch.parcels)
            );
        };
      
        const updateSections = (activeSections:any) => {
            setActiveSections(activeSections)
        };

        return (            
            <Accordion
                sectionContainerStyle={{overflow:"visible", height: "100%"}}
                containerStyle={{marginTop: 20}}
                sections={ranches}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
            />
        )
    }
    const getParcelsFlatList = (parcels: Parcel[]) => {
        return (
            <FlatList
                showsVerticalScrollIndicator={true}
                data={parcels}
                style={{marginTop: 10}}
                renderItem={({item}) => <Card parcel={item} style={styles.card}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        )
    }

    const getBody = () => {
        if (activeIndex === 0 ) {
            if(userRanches.length>0) {
                return getRanchesList(userRanches);
            }
            return (
                <>
                    <LottieView
                        autoPlay
                        style={styles.lottie}
                        source={require("../assets/lotties/Ranches.json")}
                    />
                    {
                        getBodyText("You do not have any ranches saved",
                                    "Tap save button on parcels to add to your ranch")
                    }
                    {!user && <SignUpAndSignInButtons style={styles.signUpAndSignInButtonContainer}/>}
                </>
            )
        }
        else 
            return (
                <>
                    <LottieView
                        autoPlay
                        style={styles.lottie}
                        source={require("../assets/lotties/Reports.json")}
                    />
                    {
                        getBodyText("You do not have any reports saved",
                                    "Run reports on your ranches")
                    }
                </>
            )
    }

    return (
        <Screen style={styles.screen}>
            <Row style={styles.buttonContainer}>
                <Button 
                    style={[styles.button, styles.ranchesButton]} 
                    size="small"
                    appearance={getButtonAppearance(0)}
                    onPress={() => handleButtonPress(0)}
                >
                    Ranches
                </Button>
                <Button 
                    style={[styles.button, styles.reportsButton]} 
                    size="small"
                    appearance={getButtonAppearance(1)}
                    onPress={() => handleButtonPress(1)}
                >
                    Reports
                </Button>
            </Row>
            <View style={styles.container}>
                {getBody()}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen : {
        marginHorizontal: 10
    },
    buttonContainer: {
        alignItems: "center",
        borderRadius: 5
    },
    button: {
        width: "50%",
        borderRadius: 0,
        borderColor: theme["color-primary-500"]
    },
    container: {
        flex:1,
        justifyContent: "center"
    },
    ranchesButton: { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
    reportsButton: { borderTopRightRadius: 5, borderBottomRightRadius: 5 },
    lottie : {
        height: 180,
        width: 180,
        marginBottom: 20,
        alignSelf: "center"
    },
    text: {
      textAlign: "center",
    },
    subHeading: {
      marginTop: 10,
    },
    textContainer: {
      marginVertical: 15,
    },
    signUpAndSignInButtonContainer: {
      marginTop: 15,
    },
    card: { marginVertical: 10 },
    headerButton: {
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 10,
        borderColor: theme['color-primary-500'],
        borderWidth: 1,
        borderRadius: 10,
    },
    headerButtonText: {
        color: theme['color-primary-500'], 
        fontSize: 16, 
        fontWeight: 'bold',
    },
})
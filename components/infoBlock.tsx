import React from 'react'
import { StyleSheet, View, Text, Button, Linking, Alert, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Layout from "../constants/layout"
import { IMarvelCharacter, IMarvelComic } from '../types';
interface IProps {
    entity: IMarvelCharacter | IMarvelComic,
    resolver: () => any
}

interface IIconsProps {
    config: any
}

const IconsBlock = ({ config }: IIconsProps) => {

    return <View style={styles.iconsContainer}>
        {config.map(item => <View style={styles.iconItemContainer} key={item.name}>

            <Text style={styles.iconItemText}>{item.name}</Text>
            <Ionicons
                name={
                    Platform.OS === 'ios'
                        ? `ios-${item.icon}`
                        : `md-${item.icon}`
                }
                size={26}
                color="#b30000"
            />
            <Text style={styles.iconItemNumber}>{item.value.available}</Text>
        </View>)
        }
    </View>
}


export const InfoBlock = ({ entity, resolver }: IProps) => {

    const handleLink = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open URI: ${url}`)
            }
        });
    };

    return <View style={styles.scrollContainer}>
        <IconsBlock config={resolver()} />
        < View>
            <Text style={styles.label}>DESCRIPTION</Text>
            <Text style={styles.value}>{!!entity.description ? entity.description : "No description found"}</Text>
        </View>
        < View>
            <Text style={styles.label}>LINKS</Text>
            {entity.urls &&
                entity.urls.length > 0 &&
                entity.urls.map((url, i) =>
                    <View key={i} style={{ paddingBottom: 10, paddingTop: 10 }}>
                        <Button
                            title={url.type.toUpperCase()}
                            color="#ea2328"
                            onPress={() => handleLink(url.url)}
                        />
                    </View>
                )
            }
        </View>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    label: {
        fontFamily: 'space-mono',
        fontSize: 18,
        color: "#394251",
        fontWeight: "500",
        marginTop: 20
    },
    value: {
        color: "#394251",
        fontSize: 18,
        fontFamily: 'space-mono',
    },
    scrollContainer: {
        padding: 10
    },
    iconsContainer: {
        width: Layout.window.width - 20,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        height: 70
    },
    iconItemContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    iconItemText: {
        color: "#394251",
        fontSize: 10,
        fontFamily: 'space-mono',
    },
    iconItemNumber: {
        color: "#394251",
        fontSize: 10,
        fontWeight: "900",
        fontFamily: 'space-mono'
    }
});
import React from 'react'
import { StyleSheet, View, ActivityIndicator } from "react-native"


export const Loader = ({ loading }: { loading: boolean }) => (
    <View style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#ea2328" />}
    </View>
)


const styles = StyleSheet.create({
    container: {
        height: 200
    }
})
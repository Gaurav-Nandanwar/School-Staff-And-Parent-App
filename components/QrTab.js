import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const QrTab = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/Qr1.png')} // update path if needed
                style={styles.qrImage}
                resizeMode="stretch"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    qrImage: {
        width: 300,
        height: 300,
    },
});

export default QrTab;

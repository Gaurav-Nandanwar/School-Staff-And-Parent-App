import React, { useState ,useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import TimeCounter from '../routes/TimeCounter';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeTab = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [iconScrollIndex, setIconScrollIndex] = useState(0);
    const [boxProgress, setBoxProgress] = useState(0); // value from 0 to 1

    const iconItemWidth = 88;
    const screenWidth = Dimensions.get('window').width;

    const onScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / screenWidth);
        setCurrentPage(page);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setBoxProgress(prev => {
                const next = prev + 0.009; // Adjust the increment value as needed
                return next > 1 ? 0 : next;
            });
        }, 100); // update every 100ms
    
        return () => clearInterval(interval);
    }, []);

    return (
        <ScrollView style={styles.body} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.text}>Notice Board</Text>

            {/* Notice Image ScrollView */}
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
            >
                <Image style={styles.noticeImage} source={require('../assets/notice.jpg')} />
                <Image style={styles.noticeImage} source={require('../assets/notice.jpg')} />
                <Image style={styles.noticeImage} source={require('../assets/notice.jpg')} />
                <Image style={styles.noticeImage} source={require('../assets/notice.jpg')} />

            </ScrollView>

            {/* Dot Indicators */}
            <View style={styles.dotsContainer}>
                {[0, 1, 2, 3].map((_, index) => (  // Adjust the number of dots based on the number of images
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentPage === index ? styles.activeDot : styles.inactiveDot
                        ]}
                    />
                ))}
            </View>

            <View style={styles.box}>
                <View style={styles.boxContent}>
                    <Text style={styles.boxText}>Learned Today</Text>
                    <Text style={styles.boxText}>In Time       --:--:--</Text>
                    <Text style={styles.boxText}>Out Time     --:--:--</Text>
                    <View style={styles.progressBarContainer1}>
                        <View style={[styles.progressBarFill1, { width: `${boxProgress * 100}%` }]} />
                    </View>
                    <Text style={styles.boxText1}>History</Text>
                </View>
                <TimeCounter />
            </View>

            {/* <View> */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainerContent}
                onScroll={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    const index = Math.round(offsetX / iconItemWidth);
                    setIconScrollIndex(index);
                }}
                scrollEventThrottle={16}
            >
                <View style={styles.scrollItem}>
                    <MaterialIcons name="school" size={30} color="#5F83C7" />
                    <Text style={styles.iconLabel}>School</Text>
                </View>
                <View style={styles.scrollItem}>
                    <MaterialIcons name="event" size={30} color="#5F83C7" />
                    <Text style={styles.iconLabel}>Events</Text>
                </View>
                <View style={styles.scrollItem}>
                    <MaterialIcons name="book" size={30} color="#5F83C7" />
                    <Text style={styles.iconLabel}>Library</Text>
                </View>
                <View style={styles.scrollItem}>
                    <MaterialIcons name="assignment" size={30} color="#5F83C7" />
                    <Text style={styles.iconLabel}>Homework</Text>
                </View>
                <View style={styles.scrollItem}>
                    <MaterialIcons name="notifications" size={30} color="#5F83C7" />
                    <Text style={styles.iconLabel}>Alerts</Text>
                </View>
                <View style={styles.scrollItem}>
                    <MaterialIcons name="event" size={30} color="#5F83C7" />
                    <Text style={styles.iconLabel}>Events</Text>
                </View>
            </ScrollView>

            {/* Dot Indicators Below Icon ScrollView */}
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarFill, { width: `${(iconScrollIndex + 1) / 2 * 100}%` }]} />
            </View>

            {/* </View> */}


            <Text style={styles.academic}>Academics</Text>
            <Image style={styles.image1} source={require('../assets/lolol.jpg')} resizeMode="stretch" />
            <Image style={styles.image1} source={require('../assets/lolol.jpg')} resizeMode="stretch" />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    progressBarContainer: {
        width: '20%',
        height: 6,
        borderRadius: 3,
        backgroundColor: '#e0e0e0',
        marginTop: 5,
        marginBottom: 10,
        alignSelf: 'center',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#5F83C7',
        borderRadius: 3,
    },
    progressBarContainer1: {
        width: '80%',
        height: 3,
        borderRadius: 3,
        backgroundColor: '#e0e0e0',
        marginTop: 8,
        marginBottom: 1,
        alignSelf: 'flex-start',
        overflow: 'hidden',
    },
    progressBarFill1: {
        height: '100%',
        backgroundColor: '#5F83C7',
        borderRadius: 3,
    },

    body: {
        flex: 1,
        paddingTop: 1,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#5F83C7',
        borderRadius: 10,
        width: '95%',
        height: 100,
        padding: 8,
        marginBottom: 10,
        paddingBottom: 10,
    },
    boxContent: {
        flex: 1,
        fontSize: 15,
        marginLeft: 10,
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    boxText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 1,
    },
    boxText1: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#5F83C7',
        marginTop: 5,
    },
    scrollContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    scrollContainerContent: {
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    scrollItem: {
        width: 80,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#f0f0f0',
        borderWidth: 1,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: 'rgba(95, 131, 199, 0.3)'  // lower opacity

    },
    academic: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 14,
        // marginTop: 20,
        marginBottom: 10,
    },
    image1: {
        width: '95%',
        height: 180,
        borderRadius: 10,
        marginBottom: 10,
        // marginTop: 10,
        borderColor: '#5F83C7',
        borderWidth: 1,
    },
    noticeImage: {
        width: Dimensions.get('window').width * 0.95, // full screen width for paging
        height: 180,
        borderRadius: 10,
        resizeMode: 'cover',
        borderColor: '#5F83C7',
        borderWidth: 1,
        marginHorizontal: Dimensions.get('window').width * 0.025,
        marginBottom: 5,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#5F83C7',
        width: 7,
        height: 7,
    },
    inactiveDot: {
        backgroundColor: '#ccc',
    },
    iconLabel: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
});

export default HomeTab;

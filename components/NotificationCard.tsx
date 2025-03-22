
import { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, Modal, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Image } from 'react-native-elements';
import { AssignedChore } from '../types/backend';

import InView from 'react-native-component-inview';


interface INotificationCard {
    picture: string | undefined,
    firstName: string,
    action: string,
    choreName: string | undefined,
    seen: boolean,
    notificationId: string,
    accountId: string,
    date: string
}

const getCurrentDate = (date: string) => {
    if (date) {
        const currentDate = new Date(date);
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;

        return formattedDate;
    }
    return `no date`
};

const NotificationCard = ({ picture, firstName, action, choreName, seen, notificationId, accountId, date }: INotificationCard) => {
    console.log(date)
    const [isInView, setIsInView] = useState(false)
    useEffect(() => {
        if (isInView && !seen) {
            const res = axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/api/notification/${notificationId}/account/${accountId}/seen`)
        }
    }, [isInView])
    const checkVisible = (isVisible: boolean) => {
        if (isVisible) {
            setIsInView(isVisible)
        } else {
            setIsInView(isVisible)
        }
    }


    return (
        <InView onChange={(isVisible) => checkVisible(isVisible)}>
            <View style={styles.container}>
                <><Image style={styles.image} source={picture ? { uri: picture as string } : require("../icons/emptyPic.png")} />
                    <View style={styles.textCol}>
                        <View style={styles.textRow}>
                            <Text style={styles.textName}>{firstName}</Text>
                            <Text style={styles.textAction}> has {action.toLocaleLowerCase()}</Text>
                        </View>
                        <Text style={styles.textChore}>{choreName}</Text>
                        <Text style={styles.textDate}>{getCurrentDate(date)}</Text>
                    </View>
                    {/* {action == 'COMPLETED' &&
                    <TouchableOpacity style={styles.reviewButton} onPress={() => { }}>
                        <Text style={{ color: 'blue' }}>Review</Text>
                    </TouchableOpacity>
                } */}
                </>
            </View>
        </InView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: 325,
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: "relative",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 8,
    },
    textName: {
        fontWeight: '900'
    },
    textAction: {

    },
    textChore: {
        fontWeight: "700"
    },
    textRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    textCol: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 5
    },
    textDate: {
        fontSize: 12
    },
    reviewButton: {
        display: 'flex',
        color: 'blue',
        fontSize: 15,
        position: "absolute",
        top: 5,
        right: 0,
    }
})

export default NotificationCard;


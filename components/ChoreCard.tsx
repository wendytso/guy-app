import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Switch, FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AssignedChore } from '../types/backend';
import { useDispatch, useSelector } from 'react-redux';
import { addChore } from '../slice/ChoresSlice';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#ECF0EB',
    },
    listItem: {
        padding: 16,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 8,
        borderRadius: 20,
        height: 120,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: 'wrap',
        flex: 1,
        position: "relative",
    },
    listItemShadow: {
        shadowColor: '#212121',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 11,
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8
    },
    listItemDescription: {
        fontSize: 14,
        fontWeight: "400",
        flex: 1
    },
    listItemImage: {
        width: 68,
        height: 68,
        borderRadius: 50
    },
    listItemAvatar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 5,
        marginRight: 12
    },
    listSubOptions: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        columnGap: 5,
        width: '100%'
    },
    redCircle: {
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: '#FA9A9A',
    },
    greenCircle: {
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: '#B9EAB3',
    },
    yellowCircle: {
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: '#EDEA9B',
    },
    listItemComplete: {
        backgroundColor: '#F4FFE5'
    },
    listItemInProgress: {
        backgroundColor: '#FFFDEA'
    },
    listItemOverdue: {
        backgroundColor: '#FFF1F1'
    },
    flatListContainer: {
        maxHeight: '100%',
        padding: 15
    },
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    points: {
        fontSize: 20,
        fontWeight: "600",
        position: "absolute",
        bottom: 15,
        right: 20
    }
});

interface IChoreCard {
    item: AssignedChore,
    user: string,
    completeTask: (a: string) => void;
}

const ChoreCard = ({ item, user, completeTask }: IChoreCard) => {
    const [isEnabled, setIsEnabled] = useState<boolean>(item.completed);

    const toggleSwitch = () => {
        setIsEnabled(previousState => {
            return !previousState
        });
        completeTask(item.id);

    };

    return <View style={[styles.listItemShadow, isEnabled ? styles.listItemComplete : new Date(item.dueDate) < new Date() ? styles.listItemOverdue : styles.listItemInProgress, styles.listItem]}>
        <View style={styles.listItemAvatar}>
            <Image style={styles.listItemImage} source={{ uri: item?.pictureUrl as string }} />
            <Text style={styles.listItemDescription}>{item?.firstName}</Text>
        </View>
        <View style={{ flex: 1 }}>
            <Text style={styles.listItemTitle}>{item.name}</Text>
            <Text style={styles.listItemDescription}>{item.description}</Text>
            <View style={styles.listSubOptions}>
                <Text>{`${isEnabled ? "Complete" : new Date(item.dueDate) < new Date() ? "Overdue" : "In Progress"}`}</Text>
                <View style={isEnabled ? styles.greenCircle : new Date(item.dueDate) < new Date() ? styles.redCircle : styles.yellowCircle}></View>
            </View>
        </View>
        <Text style={styles.points}>+{item.points}</Text>
        {item.accountId === user &&
            < View style={{ alignSelf: "flex-start", marginTop: 5 }}>
                <Switch
                    trackColor={{ false: 'rgba(120, 120, 128, 0.16)', true: '#24FF00' }}
                    thumbColor={'#ffffff'}
                    ios_backgroundColor="rgba(120, 120, 128, 0.16)"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        }
    </View >;
}

export default ChoreCard;
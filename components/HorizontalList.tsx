import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { AssignedChore } from '../types/backend';
const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-end",
        display: "flex",
        height: 275,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
        backgroundColor: '#FFFCF4',
        boxShadow: "3px 4px 15px 2px rgba(0,0,0,0.66)",
    },
    listItem: {
        padding: 16,
        paddingTop: 21,
        paddingBottom: 21,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ffffff',
        marginBottom: 8,
        borderRadius: 20,
        height: 186,
        width: 160,
        boxShadow: "1px 4px 15px 2px rgba(0,0,0,0.66)"
    },
    backgroundCompleted: {
        backgroundColor: "#F4FFE5",
    },
    backgroundInProgress: {
        backgroundColor: "#FFFDEA",
    },
    listItemShadow: {
        shadowColor: '#212121',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    listSubOptions: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        columnGap: 2,
    },
    redCircle: {
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: 'red',
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
    flatListContainer: {
        maxHeight: "80%",
        display: "flex",
        columnGap: 100,
        padding: 20
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 26,
        marginTop: 22
    },
    listItemTitle: {
        fontSize: 15,
        fontWeight: "700",
    },
    listItemIcon: {
        fontSize: 80
    }
});

interface IHorizontalList {
    items: AssignedChore[]
}

const HorizontalList = ({ items }: IHorizontalList) => {
    return (
        <View style={[styles.container, styles.listItemShadow]}>
            <Text style={styles.title}>My Chores</Text>
            <FlatList
                style={styles.flatListContainer}
                data={items}
                horizontal={true}
                keyExtractor={({ id }) => id}
                ItemSeparatorComponent={() => <View style={{ width: 25 }} />}
                renderItem={({ item }) => (
                    <View style={[styles.listItem, styles.listItemShadow, item?.completed ? styles.backgroundCompleted : styles.backgroundInProgress]}>
                        <Text style={styles.listItemTitle}>{item.name}</Text>
                        <Text style={styles.listItemIcon}>{item.icon}</Text>
                        <View style={styles.listSubOptions}>
                            <Text>{item.completed ? "Complete" : "In progress"}</Text>
                            {item.completed ? (
                                <View style={styles.greenCircle}>
                                </View>
                            ) : (
                                <View style={styles.yellowCircle}></View>
                            )}
                        </View>
                    </View>
                )
                }
            />
        </View >
    );
};

export default HorizontalList;
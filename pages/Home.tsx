import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, Image } from 'react-native';
import { Account, AssignedChore } from '../types/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HorizontalList from '../components/HorizontalList';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "auto",
        height: '100%',
        backgroundColor: '#FFFCF4'
    },
    listItem: {
        padding: 16,
        backgroundColor: '#FFFCF4',
        marginBottom: 8,
        borderRadius: 8,
        height: "100%",
        width: 180
    },
    listItemImage: {
        width: 65,
        height: 65,
        borderRadius: 50
    },
    listSubOptions: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    listItemCrown: {
        fontSize: 45
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
        backgroundColor: 'green',
    },
    flatListContainer: {
        maxHeight: "30%"
    }
});

interface Placement {
    points: number,
    id: string,
    account: Account
}
interface IHome {
    user: string;
}

const Home = ({ user }: IHome) => {
    const isFocused = useIsFocused();
    const [household, setHousehold] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [max, setMax] = useState<Placement>();
    const [placements, setPlacements] = useState<Placement[]>([]);
    const chores = useSelector((state: RootState) => state.chores.chores);

    const getChores = async () => {
        const fetchChores = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/assigned-chore/list/${household}`);
                let tempChores = res.data;
                tempChores = tempChores.filter((chore: AssignedChore) => {
                    console.log(chore.accountId)
                    console.log(user)
                    return chore.accountId === user
                })
                setData(tempChores.map((chore: any) => {
                    return {
                        ...chore.chore,
                        ...chore.account,
                        dueDate: chore?.dueDate,
                        id: chore.id,
                        accountId: chore.accountId,
                        completed: chore?.completed
                    }
                }).sort((a: AssignedChore, b: AssignedChore) => Date.parse(a.dueDate) - Date.parse(b.dueDate)));
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchChores()
    };

    const getPlacements = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/top-roommates/${household}`);
            let temp = res.data;
            setPlacements(temp)
        } catch (e) {
            console.log(e)
        }
        setLoading(false);
    }

    useEffect(() => {
        const getHousehold = async () => {
            try {
                const householdId = await AsyncStorage.getItem('household');
                if (householdId) {
                    setHousehold(householdId)
                }
            } catch (err) {
                console.log(err);
            }
        }
        getHousehold();
    }, []);

    const colors = [
        ["#D5F5Df", "#C0F1C9"],
        ["#FCE3FC", "#DBD2FB"],
        ["#FFE9A4", "#FED8A3"],
        ["#D3FBFD", "#C2EAFC"]
    ]

    useEffect(() => {
        if (household) {
            getChores();
            getPlacements();
        }
    }, [household, chores, isFocused]);

    useEffect(() => {
        if (placements.length) {
            setMax(placements.reduce((prev, current) => {
                return (prev && prev.points > current.points) ? prev : current
            }))
        }
    }, [placements]);

    const getCurrentMonth = () => {
        const monthNames = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];

        const currentDate = new Date();
        const currentMonthNumber = currentDate.getMonth(); // Zero-based month number

        const currentMonth = monthNames[currentMonthNumber];

        return currentMonth;
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <Text style={{ alignSelf: "center", alignItems: 'center', marginTop: 16, fontSize: 20, fontWeight: "700" }}>{getCurrentMonth()}</Text>
                    <View style={{ bottom: -10, paddingEnd: 0, height: 600, flex: 1, flexDirection: "row", alignItems: "flex-end", columnGap: 20, flexWrap: "wrap", justifyContent: "center" }}>
                        {
                            placements.map((placement, index) =>
                                <View key={index} style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", rowGap: 5, marginBottom: -25, maxWidth: 70 }}>
                                    {placement?.id === max?.id && <Text style={styles.listItemCrown}>👑</Text>}
                                    <Image style={styles.listItemImage} source={{ uri: placement?.account?.pictureUrl as string }} />
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: "600"
                                    }}>{placement.points}</Text>
                                    <LinearGradient 
                                      colors={[colors[index][0], colors[index][1]]}
                                      start={[0, 0]}
                                      end={[1, 1]}
                                      style={{
                                        padding: 25,
                                        borderRadius: 20,
                                    }}
                                    >
                                      <View style={{ width: "100%", height: `${(placement.points / (max?.points || 1)) * 50}%`, borderTopLeftRadius: 20, borderTopEndRadius: 20 }} />
                                    </LinearGradient>
                                </View>
                            )
                        }
                    </View>
                    <HorizontalList items={data} />
                </>
            )}
        </View>
    );
};

export default Home;
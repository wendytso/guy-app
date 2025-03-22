import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Switch, FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AssignedChore } from '../types/backend';
import axios from 'axios';
import ChoreCard from '../components/ChoreCard';
import { useDispatch, useSelector } from 'react-redux';
import { addChore } from '../slice/ChoresSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddinrg: 12,
    backgroundColor: '#FFFCF4',
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
  flatListContainer: {
    maxHeight: '100%',
    padding: 15
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between'
  }
});

interface IChores {
  user?: string;
  refetch: boolean;
  setRefetch: (a: boolean) => void;
}

const Chores = ({ user, refetch, setRefetch }: IChores) => {
  const [isLoading, setLoading] = useState(true);
  const [household, setHousehold] = useState('');
  const [data, setData] = useState<{ [key: string]: AssignedChore[] }>({});

  const dispatch = useDispatch();

  const getChores = async () => {
    const fetchChores = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/assigned-chore/list/${household}`);
        let tempChores = res.data;
        if (user) {
          tempChores = tempChores.filter((chore: AssignedChore) => chore.accountId === user)
        }
        setData(groupChoresByDay(tempChores.map((chore: any) => {
          return {
            ...chore.chore,
            ...chore.account,
            dueDate: chore?.dueDate,
            id: chore.id,
            accountId: chore.accountId,
            completed: chore?.completed
          }
        }).sort((a: AssignedChore, b: AssignedChore) => Date.parse(a.dueDate) - Date.parse(b.dueDate))));
      } catch (e) {
        console.log(e)
      }
      setLoading(false);
    }
    fetchChores();
  };

  const groupChoresByDay = (chores: AssignedChore[]) => {
    const choresByDay: { [key: string]: AssignedChore[] } = {};

    chores.forEach((chore) => {
      const date = new Date(chore.dueDate);
      const day = date.toLocaleString('default', { weekday: 'long' }); // Gives "Monday", "Tuesday", etc.

      if (!choresByDay[day]) {
        choresByDay[day] = [];
      }

      choresByDay[day].push(chore);
    });

    return choresByDay;
  };

  const completeTask = async (id: string) => {
    console.log("HEY", id)
    const res = await axios.patch(`${process.env.EXPO_PUBLIC_API_URL}/api/assigned-chore/${id}/complete`);

    // dispatch(addChore({
    //   id: data[0][0]?.id,
    //   description: data[0][0]?.description ?? '',
    //   householdId: data[0][0]?.householdId ?? '',
    //   name: data[0][0]?.name ?? '',
    //   points: data[0][0]?.points,
    //   icon: data[0][0]?.icon
    // }));
    if (res) {
      setRefetch(true);
    }
  }

  useEffect(() => {
    if (data && data[0] && data[0][0]) {
      dispatch(addChore({
        id: data[0][0]?.id,
        description: data[0][0]?.description ?? '',
        householdId: data[0][0]?.householdId ?? '',
        name: data[0][0]?.name ?? '',
        points: data[0][0]?.points,
        icon: data[0][0]?.icon
      }));
    }
  }, [data])

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

  useEffect(() => {
    if (refetch) {
      getChores();
      setRefetch(false);
    }
  }, [refetch]);

  useEffect(() => {
    if (household) {
      getChores();
    }
  }, [household]);

  const getDate = (dateStr: string) => {
    const timestamp = Date.parse(dateStr);
    const date = new Date(timestamp);

    const day = date.getDate(); // Day of the month (1-31)
    const month = date.getMonth() + 1; // Month (0-11, but adding 1 to get 1-12)
    const year = date.getFullYear(); // Full year
    return `${day}/${month}/${year}`
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.flatListContainer}
          data={Object.keys(data)}
          keyExtractor={(day) => day}
          ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
          renderItem={({ item: day }) => {
            return (<View>
              <View style={styles.headerContainer}>
                <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 12 }}>{day.split(', ')[0]}</Text><Text style={{ fontSize: 15, fontWeight: '400' }}>{day.split(', ')[1]}</Text>
              </View>
              {data[day].map((item, index) => (
                <ChoreCard key={index} item={item} user={user as string} completeTask={completeTask} />))}
            </View>)
          }}
        />
      )}
    </View>
  );
};

export default Chores;



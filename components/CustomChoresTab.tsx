import React, { useState } from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import Chores from '../pages/Chores';
import AddChores from '../pages/AddChores';

const ChoresTab = createMaterialTopTabNavigator();

const CustomTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
  const { state, navigation } = props;
  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center', 
      paddingLeft: 25, 
      paddingRight: 25, 
      height: 50, 
      backgroundColor: '#FFFCF4', 
      borderBottomLeftRadius: 16, 
      borderBottomRightRadius: 16 
    }}>
      {props.state.routes.map((route, index) => <View key={index}>
        <TouchableOpacity
          key={index}
          onPress={() => props.navigation.navigate(route.name)}
          style={{
            flex: 1,
            height: "100%",
            width: 120,
            flexGrow: 1,
            borderBottomWidth: state.index === index ? 1 : 0,
            borderColor: "black", borderRadius: 20,
            paddingLeft: 10,
            paddingRight: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{
            color: "#383838",
            fontSize: 18, textAlign: "center",
            fontWeight: "700",
          }}>{route.name}</Text>
        </TouchableOpacity>

      </View>)}
    </View>
  );
}

interface ICustomerChoresTab {
  user: string;
}

const CustomChoresTab = ({ user }: ICustomerChoresTab) => {
  const [refetch, setRefetch] = useState(true)
  return (
    <ChoresTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <ChoresTab.Screen name="This Week" children={(props) => <Chores {...props} refetch={refetch} setRefetch={setRefetch} />} />
      <ChoresTab.Screen name="My Chores" children={(props) => <Chores {...props} user={user} refetch={refetch} setRefetch={setRefetch} />} />
      <ChoresTab.Screen name="Create" children={(props) => <AddChores {...props} refetch={() => setRefetch(true)} />} />
    </ChoresTab.Navigator>
  );
};

export default CustomChoresTab;
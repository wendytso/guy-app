import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import HomeIcon from '../icons/home.svg'
import HomeDarkIcon from '../icons/homedark.svg'
import BroomIcon from '../icons/broom.svg'
import MoneyIcon from '../icons/money.svg'
import SignOutIcon from '../icons/signout.svg'

const Footer: React.FC<BottomTabBarProps> = (props) => {
    const { state, navigation } = props;
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            maxWidth: "100%",
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: '#FFFCF4',
            height: 90
        }}>
            {/* Render the default tab bar */}
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, width: "100%" }}>
                {props.state.routes.map((route, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => props.navigation.navigate(route.name)}
                        style={{
                            margin: "auto", 
                            flexGrow: 1, 
                            borderBottomWidth: state.index === index ? 2 : 0,
                            borderColor: "black",
                            paddingLeft: 25,
                            paddingRight: 25,
                            paddingBottom: 10,
                            display: "flex", 
                            alignItems: 'center', 
                            alignContent: "center", 
                            justifyContent: 'center',
                        }}
                    >
                        {route.name === "Home" ?
                            <HomeIcon /> :
                            route.name === "Chores" ?
                                <BroomIcon /> :
                                route.name === "Bills" ?
                                    <MoneyIcon /> : <SignOutIcon />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

export default Footer;
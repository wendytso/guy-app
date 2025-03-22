


import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Image } from 'react-native-elements';
import { Account } from '../types/backend';


interface ITransactionCard {
    user: string
    description: string
    owed: number
    createdAt: Date
}

const TransactionCard = (props: ITransactionCard) => {

    const { user, description, owed, createdAt } = props

    const [data, setData] = useState<Account>()
    const [loading, setLoading] = useState(true);

    const getCurrentDate = () => {
        const month = String(createdAt.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
        const day = String(createdAt.getDate()).padStart(2, '0');
        const year = createdAt.getFullYear();

        const formattedDate = `${month}/${day}/${year}`;

        return formattedDate;
    };

    useEffect(() => {
        // Define the API endpoint
        const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/account/${user}`;

        // Make a GET request to the API
        axios.get(apiUrl)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [user]);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={data ? { uri: data.pictureUrl as string } : require("../icons/emptyPic.png")} />
            <View style={styles.textCol}>
                <Text style={styles.textName}>{data?.firstName ?? ''} </Text>
                <Text style={styles.textAction}>{description}</Text>
                <Text style={styles.textDate}>{getCurrentDate()}</Text>
            </View>
            {owed >= 0 ?
                <View style={styles.textColInfo}>
                    <Text style={styles.textOwe}>You owe</Text>
                    <Text style={{ color: "#FA9A9A", marginLeft: 'auto' }}>${owed}</Text>
                    {/* <TouchableOpacity style={styles.reviewButton} onPress={()=>{}}>
                    <Text style={{color: 'blue', marginLeft: 'auto'}}>View</Text>
                </TouchableOpacity> */}
                </View> :
                <View style={styles.textColInfo}>
                    <Text style={styles.textGain}>You get</Text>
                    <Text style={{ color: "#97CA78", marginLeft: 'auto' }}>${-1 * owed}</Text>
                    {/* <TouchableOpacity style={styles.reviewButton} onPress={()=>{}}>
                    <Text style={{color: 'blue'}}>View</Text>
                </TouchableOpacity> */}
                </View>
            }
            {/* {status == 'complete' && 
                <TouchableOpacity style={styles.reviewButton} onPress={()=>{}}>
                    <Text style={{color: 'blue'}}>Review</Text>
                </TouchableOpacity>
                } */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: 325,
        // backgroundColor: 'pink',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: "relative",
        marginTop: 10,
        marginBottom: 10
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
    textColInfo: {
        display: 'flex',
        flexDirection: 'column',
        // width: '100%'
        position: "absolute",
        right: 0
    },
    textCol: {
        display: 'flex',
        flexDirection: 'column',
    },
    textDate: {
        fontSize: 12
    },
    reviewButton: {
        display: 'flex',
        fontSize: 15,
        // position: "absolute",
        // top: 5,
        right: 0,
        marginLeft: 'auto'
    },
    textOwe: {
        color: "#FA9A9A",
        display: 'flex',
        fontSize: 15,
        flexDirection: 'column',
        marginLeft: 'auto'
    },
    textGain: {
        color: "#97CA78",
        display: 'flex',
        fontSize: 15,
        flexDirection: 'column',
        // position: "absolute",
        left: "auto",
        marginLeft: 'auto'
    }
})

export default TransactionCard;


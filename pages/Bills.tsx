import React, { useEffect, useState } from "react";
import { Alert, Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Input, Button } from "react-native-elements";
import ArrowDownIcon from "../icons/arrowdown.svg";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import TransactionCard from "../components/TransactionsCard";
import { Summary } from "../types/backend";
import { Transaction } from "../types/backend";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addTransaction } from "../slice/TransactionsSlice";

interface IBills {
    user?: string;
    household?: string;
}

const Bills = ({ user, household }: IBills) => {
    const [title, setTitle] = useState("");
    const [cost, setCost] = useState("");
    const [summary, setSummary] = useState<Summary>();
    const [showDropdown, setShowDropdown] = useState(false);
    const [transactionHistory, setTransactionHistory] = useState([]);

    const dispatch = useDispatch();

    const transaction = useSelector(
        (state: RootState) => state.transactions.transactions
    );

    const createTransaction = async () => {
        const res = await axios.put(
            `${process.env.EXPO_PUBLIC_API_URL}/api/financial-transaction`,
            {
                amount: Number.parseFloat(cost),
                description: "",
                name: title,
                accountId: user,
                householdId: household,
            }
        );
        if (res.status == 200) {
            dispatch(addTransaction(title));
            setTitle("");
            setCost("");
            Alert.alert("successfully added transaction!");
        }
    };
    const handleAmountChange = (text: string) => {
        let cleanedText = text.replace(/[^0-9]/g, "");

        // Convert cleaned text to a number and back to a string
        let cleanedNumber = parseFloat(cleanedText);

        // Handle invalid inputs
        if (isNaN(cleanedNumber)) {
            setCost("0.00");
            return;
        }

        // Divide by 100 to get currency format
        let formattedText = (cleanedNumber / 100).toFixed(2);

        setCost(formattedText);
    };

    useEffect(() => {
        const getSummary = async () => {
            const res = await axios.get(
                `${process.env.EXPO_PUBLIC_API_URL}/api/spend-information/household/${household}/account/${user}`
            );
            if (res.data) {
                setSummary(res.data);
            }
        };
        getSummary();
    }, [transaction]);

    useEffect(() => {
        const getHistory = async () => {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/financial-transaction/list/${household}/${user}`)
            if (res.data) {
                const transformedData = res.data.map((item : any) => {
                    return {...item, createdAt: new Date(item["createdAt"])}
                }) 
                transformedData.sort((a: any, b: any) => b.createdAt - a.createdAt )
                setTransactionHistory(transformedData)
                // console.log(res.data)
            }
        }
        getHistory();
    }, [transaction])

    const getCurrentMonth = () => {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const currentDate = new Date();
        const currentMonthNumber = currentDate.getMonth(); // Zero-based month number

        const currentMonth = monthNames[currentMonthNumber];

        return currentMonth;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{getCurrentMonth()}</Text>
            {summary && (
                <View style={[styles.sumContainer, styles.sumContainerShadow]}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={["rgba(192, 247, 255, 0.30)", " rgba(192, 255, 195, 0.30)"]}
                        style={styles.gradient}
                    >
                        <Text style={styles.sumContainerTitle}>Running Sum</Text>
                        <Text style={styles.sumContainerTotal}>
                            ${summary?.totalSpent.toFixed(2)}
                        </Text>
                        <Text style={styles.sumContainerText}>
                            {summary?.amountOwed < 0
                                ? "You owe your roomies: "
                                : "Your Roomies owe you: "}
                            <Text style={styles.bold}>
                                ${Math.abs(summary?.amountOwed || 0).toFixed(2)}
                            </Text>
                        </Text>
                        <Text style={styles.sumContainerText}>
                            Performance savings:{" "}
                            <Text style={styles.bold}>
                                ${summary?.roommatePointsAmount.toFixed(2)}
                            </Text>
                        </Text>
                    </LinearGradient>
                </View>
            )}
            <View style={styles.optionsContainer}>
                <Text style={styles.transactionTitle}>Transactions</Text>
                <TouchableOpacity onPress={() => setShowDropdown((prev) => !prev)}>
                    <ArrowDownIcon
                        style={
                            showDropdown ? styles.dropdownIconUp : styles.dropdownIconDown
                        }
                    />
                </TouchableOpacity>
            </View>
            {showDropdown && (
                <View style={styles.dropdownContent}>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            onChangeText={(text) => setTitle(text)}
                            value={title}
                            label="Description"
                            labelStyle={{ color: "black", fontWeight: "500" }}
                            placeholderTextColor="#D9D9D9"
                            placeholder="i.e. Spikeball set for the boys"
                            selectionColor={"#A9A9A9"}
                            inputContainerStyle={{
                                alignSelf: "flex-end",
                                borderBottomWidth: 0,
                                marginBottom: 0,
                                elevation: 0,
                                shadowOpacity: 0,
                                backgroundColor: 'transparent',
                            }}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholderTextColor="#D9D9D9"
                            placeholder="$0.00"
                            onChangeText={handleAmountChange}
                            value={cost}
                            keyboardType="decimal-pad"
                            label="Cost"
                            labelStyle={{ color: "black", fontWeight: "500", marginTop: -15 }}
                            inputContainerStyle={{ borderBottomWidth: 0, marginBottom: 0 }}
                        />
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={() => createTransaction()}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: '#FFFCF4'
                        }}>
                            + Add new
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <FlatList
                data={transactionHistory}
                keyExtractor={({ id }) => id}
                
                ItemSeparatorComponent={() => <View style={{ width: 25 }} />}
                style={{ overflow: "scroll", width: "100%", maxHeight: 360, marginTop: 15 }}
                renderItem={({ item, index }) => (
                    <TransactionCard 
                        key={index} 
                        owed={item['owed']} 
                        user={item['accountId']} 
                        description={item['name']} 
                        createdAt={new Date(item['createdAt'])}
                    />
                )} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 40
    },
    sumContainer: {
        borderRadius: 20,
        marginBottom: 18,
        width: "100%",
    },
    sumContainerShadow: {
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    title: {
        marginBottom: 8,
        fontSize: 25,
        fontStyle: "normal",
        fontWeight: "600",
    },
    dropdownContent: {
        marginTop: 17,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    input: {
        fontSize: 18,
        display: "flex",
        flex: 1,
        alignSelf: "center",
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 2,
    },
    dropdownIconDown: {
        transform: [{ rotate: "90deg" }],
    },
    dropdownIconUp: {
        transform: [{ rotate: "-90deg" }],
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        columnGap: 18,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    gradient: {
        padding: 25,
        borderRadius: 20,
    },
    optionsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bold: {
        fontWeight: "600",
    },
    sumContainerTitle: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 12,
    },
    transactionTitle: {
        fontSize: 20,
        fontWeight: "600",
    },
    sumContainerTotal: {
        fontSize: 35,
        fontWeight: "600",
        marginBottom: 22,
    },
    sumContainerText: {
        fontSize: 15,
        fontWeight: "400",
        marginBottom: 2,
    },
    addButton: {
        display: 'flex',
        justifyContent: 'center',
        width: 162,
        height: 46,
        alignItems: 'center',
        alignSelf: "center",
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: '#89B8FF'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default Bills;

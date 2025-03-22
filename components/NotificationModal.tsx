import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, StatusBar, ScrollView, RefreshControl } from 'react-native';
import NotificationCard from './NotificationCard';
import axios from 'axios';

interface NotificationsModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  pictureUrl: string | undefined,
  user: string
}

const TOP_MARGIN = 0; // Adjust this value as needed

const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isVisible,
  onClose,
  user,
  title,
  pictureUrl
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([])

  const fetchNotifs = async () => {
    setRefreshing(true);
    const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/user-notifications/${user}`)
    if (res.data) {
      setNotifications(res.data)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchNotifs();
  }, [])

  const onRefresh = React.useCallback(() => {
    fetchNotifs()
  }, []);

  const showIndicator = notifications?.some((notification) => {
    return !notification["seen"]
  })

  return (
    <>
      {showIndicator &&
        < View style={styles.notificationIndicator}></View >
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        {/* <StatusBar translucent backgroundColor="transparent" /> */}
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { marginTop: TOP_MARGIN }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => { fetchNotifs(); onClose() }}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.notificationList} refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
              {
                notifications.map((notification, index) => {
                  return <NotificationCard key={index} firstName={notification["notification"]["actorAccount"]["firstName"]} action={notification["notification"]["action"]} picture={notification["notification"]["actorAccount"]["pictureUrl"]} choreName={notification["notification"]["actorChore"]["name"]} seen={notification["seen"]} notificationId={notification["notificationId"]} accountId={notification["accountId"]} date={notification["notification"]["createdAt"]} />
                })
              }
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

// type notification struct {
//   ID                     uuid.UUID  gorm:"primaryKey; default:uuid_generate_v4()" json:"id"
//   Action                 string     json:"action"
//   ActorAccountID         uuid.UUID  gorm:"not null" json:"actorAccountId"
//   ActorChoreID           uuid.UUID json:"assignedChoreId"
//   FinancialTransactionIDuuid.UUID json:"financialTransactionId"
// }

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFCF4',
    marginTop: 50,
    display: 'flex',
    alignContent: 'center'
  },
  notificationIndicator: {
    borderRadius: 50,
    width: 8,
    height: 8,
    position: "absolute",
    right: 4,
    top: 14,
    backgroundColor: '#FFFCF4'
  },
  modalContent: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFCF4',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationList: {
    // paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 10,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 22,
  },
  notificationItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold'
  },

});

export default NotificationsModal;

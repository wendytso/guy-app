import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';
import SkillSelector from '../components/SkillSelector';
import BackButton from '../components/BackButton';
import CustomText from '../components/Text';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig'; // adjust path
import { uploadFirebase } from '../lib/uploadFirebase';




const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', padding: 20,
    },
    input: {
        height: 50, borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5,
    },
    center: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
    photo: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#eee',
    },
    cameraWrapper: {
        width: 250,
        height: 250,
        borderRadius: 20,
        overflow: 'hidden',
    },
    camera: {
        flex: 1,
    },
});

const SignUpStep2 = ({ route, navigation }: any) => {
    const { firstName, lastName, phoneNumber, password } = route.params;
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [photo, setPhoto] = useState<string | null>(null);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    const cameraRef = useRef<Camera>(null);

    useEffect(() => {
        const reqCamera = async () => {

            const permission = await Camera.requestCameraPermissionsAsync()
            setHasPermission(permission.status === 'granted');
        }
        reqCamera()
    }, []);

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photoData = await cameraRef.current.takePictureAsync({ quality: 0.7 });
            setPhoto(photoData.uri);
            setCameraVisible(false);
        }
    };

    const pickFromGallery = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission denied', 'Please allow access to photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            setPhoto(result.assets[0].uri);
        }
    };

    const handleComplete = async () => {
        let photoUrl = '';
        console.log("HIHIHI")

        try {
            if (photo) {
                photoUrl = await uploadFirebase(photo, phoneNumber);
            }

            const res = await fetch('https://2890-128-189-236-142.ngrok-free.app/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`,
                    phone_number: phoneNumber,
                    password,
                    skills: selectedSkills,
                    connections: [],
                    location: '',
                    photo: photoUrl,
                }),
            });

            if (res.ok) {
                navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            } else {
                const err = await res.text();
                console.error(err);
                alert('Something went wrong signing up.');
            }
        } catch (err) {
            console.error(err);
            alert('Network error or upload failed.');
        }
    };

    if (cameraVisible) {
        return (
            <View style={styles.center}>
                <View style={styles.cameraWrapper}>
                    <Camera style={styles.camera} ref={cameraRef} type={CameraType.front} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button title="capture photo" onPress={takePhoto} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.center}>
            <CustomText style={{ fontSize: 24, }}>hi {firstName.toLowerCase()}!</CustomText>
            <CustomText style={{ marginVertical: 15 }}>what kind of guy are you?</CustomText>
            <Button
                title={photo ? 'retake profile photo' : 'take profile photo'}
                onPress={() => setCameraVisible(true)}
            />
            <View style={{ height: 10 }} />
            <Button
                title="choose from library"
                onPress={pickFromGallery}
            />
            {photo && <Image source={{ uri: photo }} style={styles.photo} />}
            <SkillSelector selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />
            <View style={{ padding: 20 }}></View>
            <Button title="see your network of guys" onPress={handleComplete} />
            <BackButton />
        </View>
    );
};

export default SignUpStep2;

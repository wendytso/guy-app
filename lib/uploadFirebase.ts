// utils/uploadToFirebase.ts
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

export const uploadFirebase = async (localUri: string, name: string) => {
  try {
    const blob: Blob = await uriToBlob(localUri);

    const filename = `${name}.jpg`;
    const imageRef = ref(storage, `profiles/${filename}`);

    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (err) {
    console.error('Upload failed:', err);
    throw err;
  }
};

const uriToBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

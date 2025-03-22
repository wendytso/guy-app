// react-native-config.d.ts
declare module 'react-native-config' {
    interface Env {
      API_URL: string;
    }
  
    const Config: Env;
    export default Config;
  }
  
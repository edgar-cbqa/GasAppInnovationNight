import { AsyncStorage } from 'react-native';

const _userKey = '@rmfanapp:user';

export const saveUser = async(uid) => {
    try {
        await AsyncStorage.setItem(_userKey, uid);
    } catch(error) {
        debugger;
        return undefined;
    }
}

export const getUser = () => {
    return new Promise(async(resolve) => {
        try {
            const user = await AsyncStorage.getItem(_userKey);
            resolve(user);
        }catch(error) {
            resolve(undefined);
        }
    });
}

export const logoutUser = () => {
    return new Promise(async resolve => {
        try {
            await AsyncStorage.removeItem(_userKey);
        } catch(error) {
            console.log(error);
        } finally {
            resolve();
        }
    })
}
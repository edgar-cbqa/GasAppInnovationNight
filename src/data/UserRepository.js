import { AsyncStorage } from 'react-native';

const _userKey = '@rmfanapp:user';

export const saveUser = async(accessKey, secretKey, token) => {
    try {
        const data = JSON.stringify({accessKey, secretKey, token});
        debugger;
        await AsyncStorage.setItem(_userKey, data);
    } catch(error) {
        debugger;
        return undefined;
    }
}

export const getUser = () => {
    return new Promise(async(resolve) => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem(_userKey));
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
import { AuthClient } from './AmplifyClient';
import axios from 'axios';

export const loginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', { email, password});
            const { data } = response;

            resolve({
                accessKey: data.aws.accessKey,
                secretKey: data.aws.secretKey,
                token: data.aws.token
            })
        } catch(error) {
            console.log(error.message);
            debugger;
            reject(undefined);
        }
    });
}

export const signupUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            await AuthClient.signUp({ username: email, password: password });
            const userData = await loginUser(email, password);
            debugger;
            resolve(userData);
        } catch(error) {
            console.log(error.message);
            debugger;
            reject();
        }
    });
}
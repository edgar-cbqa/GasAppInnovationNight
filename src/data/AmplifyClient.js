import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-export';

Amplify.configure(awsconfig);

const AuthClient = Auth;

export { AuthClient};
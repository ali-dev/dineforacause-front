import { withAuthenticator } from 'aws-amplify-react';

import AuthTheme from './config/AuthTheme';
import { signUpConfig } from './config/AuthConfig';



export const protectedPage = (component) => {
    return withAuthenticator(component, false, [], null, AuthTheme, signUpConfig)
}
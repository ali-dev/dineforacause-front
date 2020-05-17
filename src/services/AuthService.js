import { Auth } from 'aws-amplify';
const currentUser = () => {

    return Auth.currentAuthenticatedUser();
    
    // .then((u) => {
    //     console.log(u);
    //     return u;
    // }).catch((e) => {
    //     console.log(e)
    //     return false;
    // });
}

export default currentUser;
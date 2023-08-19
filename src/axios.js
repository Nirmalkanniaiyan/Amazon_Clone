import axios from "axios";

const instance = axios.create({
    baseURL : '' // this is where we will put API url (cloud function)
    // we will put localhost when we are testing but to
});

export default instance ;

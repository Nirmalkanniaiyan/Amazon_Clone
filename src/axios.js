import axios from "axios";

const instance = axios.create({
    baseURL : 'http://127.0.0.1:5001/clone-3ccac/us-centrxal1/api' // this is where we will put API url (cloud function)
    // we will put localhost when we are testing but to
});

export default instance ;
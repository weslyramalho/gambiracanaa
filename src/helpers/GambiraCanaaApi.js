import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://localhost:5000';

const apiFetchPost = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    const res = await fetch(BASEAPI+endpoint, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}
const apiFetchGet = async (endpoint, body = []) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await res.json();

    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }

    return json;
}

const GambiraCanaaApi = {

    login:async (email, password) => {
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );
        return json;
    },

    register:async (name, email, password, stateLoc) => {
        const json = await apiFetchPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        );
        return json;
    },

    getStates:async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;
    },

    getAds: async (options) => {
        const json = await apiFetchGet(
            '/ad/list',
            options
        );
        return json;
    },

    getCategories: async() => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories
    },

    getAd:async (id, other = false) =>{
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        );
        return json;
    }

};

export default () => GambiraCanaaApi;
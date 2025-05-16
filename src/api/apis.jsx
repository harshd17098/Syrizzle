const baseURL = import.meta.env.VITE_API_URL;


const API = {

    dropdown:{
        model:`${baseURL}/model`,
    },

    motors: {
        filter: `${baseURL}/motor-filter`,
    },
}

export default API;
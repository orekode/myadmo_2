import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;

if(sessionStorage.getItem("token"))
window.axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("token")}`;
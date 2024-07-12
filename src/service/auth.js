import http from './config'

const auth = {
    login: (login)=> http.post("/login",login),
}
export default auth
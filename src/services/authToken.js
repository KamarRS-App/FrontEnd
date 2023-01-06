import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const AuthToken = () => {
    const token = Cookies.get('token');
    if (!token) {
        return false;
    }
    try {
        const decode = jwtDecode(token);
        if (decode.authorized !== true) {
            return false
        }
        if (decode.exp < new Date().getTime() / 1000) {
            return false
        }
    } catch (e) {
        return false;
    }
    return true; 
}
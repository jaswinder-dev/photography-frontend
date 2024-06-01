// backend URL
import { BACKEND_BASE_URI } from "../../config/env";

// will carry out login and logout operations
export class LogIn {

    #username = "";
    #email = "";
    #password = "";
    #error = {};  //storing errors
    #data = {}; //storing response data
    #loginData = JSON.parse(localStorage.getItem("photographer")) || null;  //data from localStorage

    //is already logged in
    isLoggedIn() {
        if (this.#loginData) {
            return true;
        }
        return false;
    }

    //login request
    async login(email, username, password) {
        this.#email = email;
        this.#username = username;
        this.#password = password;
        let loginData = {};

        if (!this.#validate()) {  //validating whether the required data is provided ?
            return { success: false, message: this.#error };
        }

        if (this.#username === "") {  // 'email + password', for log in
            loginData = { email: this.#email, password: this.#password };
        } else {  // 'username + password', for log in
            loginData = { username: this.#username, password: this.#password };
        }

        const response = await this.#request(
            "/account/api/login",
            "POST",
            loginData
        );

        if (!response) {  //if not successfully logged in
            return this.#error;
        }

        //storing the login response in localStorage, to keep the user logged in
        localStorage.setItem("photographer", JSON.stringify({ data: this.#data.photographer, cookie: this.#data.cookie.val }));
        return { message: this.#data.message, success: this.#data.success, cookie: this.#data.cookie };
    }

    //logout request
    async logout() {
        const response = await this.#request(
            "/account/api/logout",
            "POST"
        );

        if (!response) {  //if not successfully logged out
            return this.#error;
        }

        //removing the log in response from localStorage
        localStorage.removeItem("photographer");

        return { message: this.#data.message, success: this.#data.success };
    }

    //validating whether the required data is provided ?
    #validate() {
        if (this.#username === "" && this.#email === "") {
            this.#error = { success: false, message: "Either Username or Email must be filled!" };
            return false;
        } else if (this.#password === "") {
            this.#error = { success: false, message: "Password should not be empty!" };
            return false;
        }
        return true;
    }

    //fetch requests
    async #request(url, method, data) {
        let headers = { "Content-Type": "application/json" };
        if (this.#loginData) {
            headers.data = (this.#loginData).cookie;
        }
        try {
            const req = await fetch(BACKEND_BASE_URI + url, { method, credentials: 'include', body: JSON.stringify(data), headers });
            const json = await req.json();
            if (!req.ok) throw json;
            this.#data = json;
            return true;
        } catch (error) {
            this.#error = error;
            return false;
        }
    }

}
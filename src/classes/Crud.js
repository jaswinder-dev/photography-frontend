//backend URL
import { BACKEND_BASE_URI } from "../../config/env";

//will carry out all the CRUD operations
export class Crud {

    #error = {};  //storing errors
    #data = {}; //storing response data
    #auth = JSON.parse(localStorage.getItem("photographer")).auth || null;

    //getting data ('GET' or 'POST')
    async get(url, options = { method: "GET" }) {
        if (this.#auth) {
            options.headers = { "data": this.#auth }
        }
        if (await this.#request(url, options)) {
            return (this.#data);
        } else {
            return (this.#error);
        }
    }

    //send data for update ('PUT')
    async set(url, method, data, headers, isFile) {
        //data = data to send
        //isFile = true; (when there is a file in the data to send)
        //method = null (when isFile = true)
        //headers = {} (when isFile = true)

        let options = {};

        if (method !== null) {
            options.method = method;
        }

        if (!isFile) {
            options.body = JSON.stringify(data);
        } else {
            options.body = data;
        }

        if (headers !== null) {
            options.headers = headers;
        } else {
            options.headers = {};
        }

        if (this.#auth) {
            options.headers.data = this.#auth;
        }

        if (await this.#request(url, options)) { //if successfully responded, return the response data
            return (this.#data);
        } else { //return the error
            return (this.#error);
        }
    }

    // deleting the data ("DELETE")
    async delete(url) {
        if (await this.#request(url, { method: 'DELETE', headers: { data: this.#auth } })) {
            return (this.#data);
        } else {
            return (this.#error);
        }
    }

    //fetch requests
    async #request(url, options = { method: "GET" }) {
        console.log({
            url: BACKEND_BASE_URI + url,
            options
        });
        // try {
        //     const req = await fetch(BACKEND_BASE_URI + url, options);
        //     const response = await req.json();
        //     if (!req.ok) throw response; //if there is any error
        //     this.#data = response; //successfull response by the request, store the response data
        //     return true;
        // } catch (error) {
        //     this.#error = error;  //store the error 
        //     return false;
        // }
    }

}
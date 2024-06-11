import { CapacitorHttp, HttpOptions } from "@capacitor/core";

export default class Http {
    options: HttpOptions;
    url: string;
    constructor(url: string, options?: HttpOptions) {
        this.options = {
            ...options,
            url: import.meta.env.VITE_API_URL,
        };
        this.url = url;
        this.init();
    }
    init() {
        this.options = {
            url: this.options.url + this.url,
            method: this.options?.method || "GET",
        };
    }
    request() {
        return CapacitorHttp.request(this.options);
    }
}
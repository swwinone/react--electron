export const GETINFO = "login/GETINFO";
export const DECREMENT = "login/DECREMENT";
export const RESET = "login/RESET";

export function getinfo(data) {
    return {type: GETINFO,data:data}
}

export function decrement() {
    return {type: DECREMENT}
}

export function reset() {
    return {type: RESET}
}
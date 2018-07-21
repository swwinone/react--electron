import { DECREMENT, RESET, GETINFO} from '../actions/login';

/*
* 初始化state
 */

const initState = {
    userinfo: {}
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case GETINFO:
            return Object.assign({},state,{userinfo:action.data});
        case DECREMENT:
            return {
                count: state.count - 1
            };
        case RESET:
            return {count: 0};
        default:
            return state
    }
}
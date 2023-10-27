import { headers } from 'next/headers'
import Cookies from 'universal-cookie';

import Login_c from "./login"
import { JumpToIndex } from '../Jump';
const cookies = new Cookies();
function get_header() {
    const headersL = headers();
    const JheadersList = {};
    headersL.forEach((v, k) => (JheadersList[k] = v));//迭代器->JSON
    return JheadersList
}

export default async function login() {
    const res = await fetch("http://localhost:8000/api/user_status", { headers: get_header() })
    if (res.status == 200) {
        return (
            <main>
                <JumpToIndex />
            </main>
        )
    } else if (res.status == 401) {
        return (<Login_c />)
    } else {
        return (<p>???????{res.status}</p>)
    }
}
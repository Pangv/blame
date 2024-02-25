import {auth, signIn, signOut} from "../fbAuth.ts";
import {useState} from "react";


export default function Authentication() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (event: any) => {
        // @ts-ignore
        if (event.target.name === "email") {
            setEmail(event.target.value);
        }

        // @ts-ignore
        if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    }

    return (
        <div className="flex justify-between text-white text-xs">
            {!auth.currentUser ?
                <form action="" className="flex flex-wrap">
                    <input className="py-1 px-3 mr-1 text-black" autoComplete="username" name="email"
                           type="email"
                           onChange={handleInputChange}/>
                    <input className="py-1 px-3 mr-1 text-black" autoComplete="current-password" name="password"
                           type="password"
                           onChange={handleInputChange}/>
                </form>
                : <span className="p-1">{auth.currentUser.email}</span>}

            {auth.currentUser ?
                <button className="ml-2 border border-amber-400 hover:bg-amber-400 hover:text-black p-1"
                        onClick={() => signOut()}>Logout</button> :
                <button className="ml-2 border border-amber-400 hover:bg-amber-400 hover:text-black p-1"
                        onClick={() => signIn(email, password)}>Login</button>}
        </div>
    )
}
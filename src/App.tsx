import './App.css'
import {SetStateAction, useEffect, useState} from "react";
import Stopwatch from "./Stopwatch.tsx";
import Blames from "./Blames.tsx";
import {createKeyword, increaseKeywordCount, listenForChanges, signIn, getTop5Keywords, resetAllKeywordCounts} from "./firebase.ts";
import CIcon from "@coreui/icons-react";
import {cilLibraryAdd, cilReload, cilSync} from "@coreui/icons";
import {auth, signOut} from "./fbAuth.ts";
import {} from "./fbDatabase.ts";

function App() {

    const [keywords, setKeywords] = useState([]);
    const [newKeyword, setNewKeyword] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [top5, setTop5] = useState([])


    useEffect(() => {
        const unsubscribe = listenForChanges(setKeywords);

        const readTop5 = async () => {
            // @ts-ignore
            let top5Keywords: Keyword[] = await getTop5Keywords();
            let top5Keys = top5Keywords.map((keyword, index) => {
                return (<button key={index} className="bg-blue-700 text-white mr-1 px-1"
                        onClick={() => addKeywordFromTop5(keyword.name)}>{keyword.name}</button>)
            });

            // @ts-ignore
            setTop5(top5Keys);
        }
        readTop5();

        // Clean up function
        return () => {
            unsubscribe();
        };
    }, []);

    const addKeyword = () => {
        // do not add duplicate keywords to the list
        if (keywords.some((keyword: { name: string; }) => keyword.name === newKeyword)) {
            createKeyword(newKeyword);
            return;
        }

        if (newKeyword.length !== 0) {
            // @ts-ignore
            createKeyword(newKeyword);
            setNewKeyword("")
        }
    }

    // function to add keyword from the top 5 with a name to the list of keywords
    const addKeywordFromTop5 = (keywordName: string) => {
        // @ts-ignore
        createKeyword(keywordName);
    }

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        // @ts-ignore
        if (event.target.name === "keyword") {
            setNewKeyword(event.target.value);
        }

        // @ts-ignore
        if (event.target.name === "email") {
            setEmail(event.target.value);
        }

        // @ts-ignore
        if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    }

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === "Enter") {
            addKeyword();
        }
    }

    const reset = () => resetAllKeywordCounts();

    const reload = () => resetAllKeywordCounts();

    return (
        <>
            <div className="w-[400px] mx-auto flex-col ">

                <h1 className="title text-3xl text-white mt-1 text-center font-merriweather">Blame 'em</h1>

                <div className="flex justify-between text-white text-xs">
                    {!auth.currentUser ?
                        <form action="" className="p-1">
                            <input autoComplete="username" name="email" type="email" onChange={handleInputChange}/>
                            <input autoComplete="current-password" name="password" type="password" onChange={handleInputChange}/>
                        </form>
                        : <span className="p-1">{auth.currentUser.email}</span>}

                    {auth.currentUser ?
                        <button className="mx-2 border border-amber-400 p-1" onClick={() => signOut()}>Logout</button> :
                        <button className="mx-2 border border-amber-400 p-1"
                                onClick={() => signIn(email, password)}>Login</button>}
                </div>
                <Stopwatch/>

                <h2 className="text-white text-xl text-center mb-2">Shorts</h2>
                <div className="px-2 flex flex-wrap gap-1">
                    {top5}
                </div>

                <div className="px-2 mt-3">
                    <h2 className="text-white text-center mb-3">Eigene</h2>
                    <div className="flex justify-between items-start">
                        <div className="flex">
                            <input name="keyword" type="text" className="h-10" value={newKeyword}
                                   onChange={handleInputChange}
                                   onKeyDown={handleKeyDown}/>
                            <button className="h-10 w-10 text-white px-2 bg-blue-900"
                                    onClick={addKeyword}>
                                <CIcon icon={cilLibraryAdd}/>
                            </button>
                        </div>
                        <div className="flex">
                            <button className="h-10 w-10  px-2 bg-red-600"
                                    onClick={reset}>
                                <CIcon icon={cilSync}/>
                            </button>
                            <button className="h-10 w-10 px-2 bg-yellow-400"
                                    onClick={reload}>
                                <CIcon icon={cilReload}/>
                            </button>
                        </div>
                    </div>
                </div>

                <Blames keywords={keywords} increaseCount={increaseKeywordCount}/>

            </div>
        </>

    )

}

export default App

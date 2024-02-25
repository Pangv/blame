import './App.css'
import {useEffect, useState} from "react";
import Stopwatch from "./components/Stopwatch.tsx";
import Blames from "./components/Blames.tsx";
import {
    createKeyword,
    increaseKeywordCount,
    listenForChanges,
    getTop5Keywords,
} from "./firebase.ts";
import Authentication from "./components/Authentication.tsx";
import InputControls from "./components/InputControls.tsx";
import {auth} from "./fbAuth.ts";

function App() {

    const [keywords, setKeywords] = useState([]);
    const [top5, setTop5] = useState([])

    const getButtonStyle = () => {
        const deactivatedState = "bg-gray-700 text-white mr-1 px-1 cursor-not-allowed";
        const activeState = "bg-blue-700 text-white mr-1 px-1";
        return `${auth.currentUser ? activeState : deactivatedState}`
    }
    const readTop5 = async () => {
        // @ts-ignore
        let top5Keywords: Keyword[] = await getTop5Keywords();
        let top5Keys = top5Keywords.map((keyword, index) => {
            return (
                <button key={index} className={getButtonStyle()}
                        onClick={() => createKeyword(keyword.name)}
                        disabled={!auth.currentUser}>{keyword.name}
                </button>
            )
        });

        // @ts-ignore
        setTop5(top5Keys);
    }

    useEffect(() => {
        const unsubscribe = listenForChanges(setKeywords);
        readTop5().then(() => {/*to nothing*/
        });

        // Clean up function
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <div className="max-w-[400px] mx-auto flex-col ">
                <Authentication/>
                <h1 className="title text-3xl text-white mt-1 text-center font-merriweather">Blame 'em</h1>
                <Stopwatch/>
                <h2 className="text-white text-xl text-center mb-2">Shorts</h2>
                <div className="pr-2 flex flex-wrap gap-1">{top5}</div>
                {auth.currentUser && <InputControls keywords={keywords}/>}
                <Blames keywords={keywords} increaseCount={increaseKeywordCount}/>
            </div>
        </>

    )

}

export default App

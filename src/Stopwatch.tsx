import {useEffect, useState} from "react";
import Watch from "./Watch.ts";
import CIcon from "@coreui/icons-react";
import {cilMediaPause, cilMediaPlay, cilMediaStop} from "@coreui/icons";

export default function Stopwatch() {
    const [time, setTime] = useState("00:00:00");
    const [stopwatch] = useState(new Watch());

    // update the time every second and display it to the screen
    useEffect(() => {
        const interval = setInterval(() => {
            // @ts-ignore
            setTime(stopwatch.getElapsedTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const pause = () => {
        // @ts-ignore
        stopwatch.pause();
    }

    const stop = () => {
        // @ts-ignore
        stopwatch.stop();
    }

    const start = () => {
        // @ts-ignore
        stopwatch.start();
    }

    return (
        <>
            <div className="text-5xl p-2 my-2 bg-gray-600 text-center font-mono">{time}</div>
            <div className="flex justify-evenly">
                {stopwatch.isRunning() ?
                    <button className="h-10 w-10 border-amber-400 bg-amber-300 mx-2 px-2" onClick={pause}>
                        <CIcon icon={cilMediaPause}/>
                    </button> :
                    <button className="h-10 w-10 border-amber-400 bg-amber-300 mx-2 px-2" onClick={start}>
                        <CIcon icon={cilMediaPlay}/>
                    </button>}
                <button className="h-10 w-10 border-amber-400 bg-amber-300 mx-2 px-2" onClick={stop}>
                    <CIcon icon={cilMediaStop}/>
                </button>
            </div>
        </>
    )
}
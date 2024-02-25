import {SetStateAction, useState} from "react";
import {createKeyword, resetAllKeywordCounts} from "../fbDatabase.ts";
import CIcon from "@coreui/icons-react";
import {cilLibraryAdd, cilReload, cilSync} from "@coreui/icons";

export default function InputControls(props: { keywords: any; })  {

    const {keywords} = props;

    const [newKeyword, setNewKeyword] = useState("");

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

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        // @ts-ignore
        if (event.target.name === "keyword") {
            setNewKeyword(event.target.value);
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
        <div className="px-2 mt-3">

            <h2 className="text-white text-center mb-3">Eigene</h2>
            <div className="flex justify-between items-start">
                <div className="flex">
                    <input name="keyword" type="text" className="h-10 w-64" value={newKeyword}
                           onKeyDown={handleKeyDown}
                           onChange={handleInputChange}/>
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
    );
}
import {auth} from "../fbAuth.ts";

export default function Blame(props: {
    keyword: { name: string; count: number; };
    increaseCount: (arg0: string) => void;
}) {

    const {keyword, increaseCount} = props;

    const getButtonStyle = () => {
        const deactivatedState = "bg-gray-700 text-white mr-1 px-1 cursor-not-allowed";
        const activeState = "bg-blue-700 text-white mr-1 px-1";
        return `${auth.currentUser ? activeState : deactivatedState}`
    }


    return (
        <button className={getButtonStyle()}
                key={keyword.name}
                onClick={() => (increaseCount(keyword.name))}
                disabled={!auth.currentUser}>
            {keyword.name} ({keyword.count} )
        </button>
    )


}
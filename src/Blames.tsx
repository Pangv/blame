import Blame from "./Blame.tsx";

export default function Blames(props: { keywords: any[], increaseCount: any }) {

    const {keywords, increaseCount} = props;

    return (
        <div className="px-2 mt-2 flex flex-wrap justify-around">
            {/*@ts-ignore*/ keywords
                .filter(keyword => keyword.count > 0)
                .map((keyword, idx) =>
                <Blame key={idx} keyword={keyword} increaseCount={increaseCount}/> )
            }
        </div>
    )

}
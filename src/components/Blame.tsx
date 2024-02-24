export default function Blame(props: {
    keyword: { name: string; count: number; };
    increaseCount: (arg0: string) => void;
}) {

    const {keyword, increaseCount} = props;

    return (
        <button className="bg-blue-700 text-white mb-1 mr-1 px-1"
                onClick={() => (increaseCount(keyword.name))}>
            {keyword.name} ({keyword.count} )
        </button>
    )


}
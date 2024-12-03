interface Props{
    name: string;
    intext: string;
    daynight: string;
    location: string;
    description: string;
}

const SceneSummary = (props: Props) => {
    const { name, intext, daynight, location = '<Location>', description } = props;
    return (
        <div className="flex items-center mb-2 w-full font-bold">
            <div className="p-2 w-20 text-center">
                <p>Scene<br/>{name}</p>
            </div>
            <div className="grow-0 flex flex-col p-2 w-26 text-center">
                <p>{ intext.toUpperCase() }</p>
                <p>{ daynight.toUpperCase() }</p>
            </div>
            <div className="grow flex flex-col p-2">
                <div><p>{ location }</p></div>
                <div><p className="text-sm">{ description }</p></div>
            </div>
            <div className="grow-0 flex items-center">
                <button className="btn btn-blue w-12 h-12">Edit</button>
            </div>
        </div>
    )
}

export default SceneSummary;
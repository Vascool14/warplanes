
export default function Button({text,icon=false,color='blue',onButtonClick}:{text:string,icon?:boolean,color?:'blue'|'red'|'yellow'|'green',onButtonClick?:()=>void}) {
    return (
        <div className={`btnWrapper ${color}`}>
            <button onClick={onButtonClick}>
                <h3 style={{
                    margin: icon?'-0.2rem 0':0, 
                    transform: icon?'scale(1.5)':'scale(1)'
                }}>{text}</h3>
            </button>
        </div>
    )
}
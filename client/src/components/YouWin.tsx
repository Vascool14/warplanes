import '../App.css'

export default function YouWin({text}: {text: string}) {
    return (
        <div className="win fixed inset-0 flex items-center justify-center">
            <h1 style={{animation: 'win 1s ease-in-out forwards', zIndex: 100, height: '5rem'}}>&nbsp; {text}</h1>
        </div>
    )
}
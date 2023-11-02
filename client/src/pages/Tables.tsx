import Button from "../components/Button";
import { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Tables(){
    const { state, setState } = useContext<any>(Context);
    const [ loading, setLoading ] = useState(true)
    const bots = [
        {name: 'ioana', difficulty: 'easy', emoji: '🤷🏼‍♀️'},
        {name: 'vasile', difficulty: 'hard', emoji: '🙋🏽‍♂️'}
    ]
    const [ tables, setTables ] = useState<{id: number; user: string; PIN?: string, details?: string}[]>([
        {id: 23, user: 'vascool'},
        {id: 87, user:'mariansex', PIN: '1234'},
        {id: 23, user: 'vascool'},
        {id: 87, user:'mariansex', PIN: '1234'}
    ])
    function GetTables(){
        setLoading(true)
        // axios.get('/tables').then(res => {
        //     setTables(res.data)
        //     if(res.data.length == 0) setState({...state, toast: {message: 'No open tables found', success: false}})
        // }).catch(err => {
        //     console.log(err)
        //     setState({...state, toast: {message: err.message, success: false}})
        // });
        setTimeout(() => {  setLoading(false)}, 500);
    }
    // function JoinTable(name: string){
    //     const table = tables.find(table => table.name == name)
    //     if(table?.PIN != PIN) return setState({...state, toast: {message:'Wrong PIN', success:false}})
    //     axios.post('/tables/join', {name, PIN})
    //     .then(res => {
    //         setState({...state, toast: {message: res.data.message, success: true}})
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         setState({...state, toast: {message: err.message, success: false}})
    //     });
    // }
    useEffect(() => {
        GetTables();
    }, [])
    const navigate = useNavigate();
    return(
        <main className="flex flex-col items-center gap-[var(--padding)] p-0">
            <section className="max-w-[min(84vw,64rem)] flex flex-col justify-center p-4 pt-6 gap-4">
                <style>{`
                .table{  
                    background: var(--text);
                    color: var(--bg);
                    width: 20rem;
                    max-width: 100%;
                    border-radius: calc(var(--radius) + 0.4rem);
                    position: relative;
                    padding: 0.6rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 0.5rem;
                }`}</style>
                <h2 className="text-center w-full">Offline</h2>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bots.map((bot, i) => (
                        <div key={i} className="table">
                            <h3>🤖 BOT {bot.name} {bot.emoji}</h3>
                            <p className="pl-1 mt-[-0.5rem]">difficulty: {bot.difficulty}</p>
                            <Button text={'join'} onButtonClick={() => navigate(`/tables/bot-${bot.name}`)}/>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-4 justify-center">
                    <h2>Online</h2>
                    <div className={`w-8 h-8 mb-3 flex items-center justify-center cursor-pointer rounded-full ${loading && 'animate-spin'}`} 
                    onClick={() => GetTables()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor"
                        className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {!loading && tables.map((table, i) => (
                        <div key={i} className="table">
                            <h3 className="pl-1">{table.user}</h3>
                            <p className="pl-1 mt-[-0.5rem]">table id: <span className="text-[var(--gray)]">{table.id}</span></p>
                            <Button text={table.PIN?'🔒':'join'} onButtonClick={() => navigate(`/tables/id=${table.id}`)}/>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

function CreateTable() {
    const {state, setState} = useContext<any>(Context);
    const [ name, setName ] = useState('')
    const [ PIN, setPIN ] = useState('')
    function CreateTable(){
        axios.post('/table', {name, PIN})
        .then(res => {
            setState({...state, toast: {message: res.data.message, success: true}})
        })
        .catch(err => {
            console.log(err)
            setState({...state, toast: {message: err.message, success: false}})
        });
    }
    return (
        <main>
            <section className="h-full w-[min(22rem,100%)] mx-auto">
                <form className="flex w-full flex-col gap-3" onSubmit={(e) => {e.preventDefault(); CreateTable()}}>
                    <h1 className="mt-2">Host your game!</h1>
                    <div className="input-group w-full">
                            <input required type="text" minLength={3} maxLength={25} value={name} onChange={(e) => setName(e.target.value)}
                            />
                            <label>table Name</label>
                        </div>
                    <div className="flex gap-3">
                        <div className="input-group w-60">
                            <input type="text" maxLength={4} minLength={4} value={PIN} onChange={(e) => setPIN(e.target.value)}
                            name="PIN" />
                            <label>PIN&nbsp;<span className="text-[1rem]">(optional)</span></label>
                        </div>
                        <Button text="Create" />
                    </div>
                </form>
            </section>
        </main>
    )
}
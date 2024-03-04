import Button from "../components/Button";
import { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'
import { TableType } from "../types";

export default function Tables(){
    const { state, setState } = useContext<any>(Context);
    const [ loading, setLoading ] = useState(true)
    const bots = [
        {name: 'ioana', difficulty: 'easy', emoji: '🤷🏼‍♀️'},
        {name: 'andrei', difficulty: 'medium', emoji: '🙋🏻‍♂️'},
        {name: 'vasile', difficulty: 'hard', emoji: '👨🏽‍🎓'}
    ]
    const [ tables, setTables ] = useState<{id: number; user: string; PIN?: string, details?: string}[]>([
        {id: 12, user: 'test'},
        {id: 87, user:'test-with-lock', PIN: '1234'}
    ])
    function GetTables(){
        setLoading(true)
        // axios.get('/tables').then(res => {
        //     setTables(res.data)
        //     if(res.data.length == 0) setState({...state, toast: {message: 'No open tables found', success: false}})
        // }).catch(err => {
        //     console.log(err)
        //     setState({...state, toast: {message: err.message, success: false}})
        //     setTables([])
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

    const navigate = useNavigate();
    function handleClick(table: TableType){
        if(table.PIN){
            
        }
        navigate(table.PIN?'':`/table/id=${table.id}/setup`)
    }

    useEffect(() => {
        GetTables();
        setState({...state, canExit: true, musicType: 'menu'})
    }, [])
    return(
        <main className="swipe-up flex flex-col items-center gap-[var(--padding)] p-0 pt-12 md:pt-20 overflow-y-scroll">
            <section className="max-w-[min(80vw,76rem)] flex flex-col justify-center p-4 pt-2 sm:pt-6 gap-4">
                <h1 className="text-center w-full">Offline</h1>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <style>{`
                    .table{  
                        background: var(--bg);
                        width: max(18rem, 50vw);
                        max-width: 100%;
                        border-radius: calc(var(--radius) + 0.4rem);
                        position: relative;
                        padding: 0.6rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        gap: 0.5rem;
                    }
                    `}</style>
                    {bots.map((bot, i) => (
                        <div key={i} className="table">
                            <h3 className="pl-2">{bot.name} {bot.emoji}</h3>
                            <p className="pl-2 mt-[-0.5rem]">difficulty: {bot.difficulty}</p>
                            <Link to={`/table/bot-${bot.name}/setup`}>
                                <Button text={'join'} color="yellow" sound="attack" />
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-4 justify-center">
                    <h1 className="mt-3">Online</h1>
                    <Button text="↻" icon color="green" onButtonClick={() => GetTables()} />
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {!loading && (tables.length > 0 ? tables.map((table, i) => (
                        <div key={i} className="table">
                            <h3 className="pl-1">{table.user}</h3>
                            <p className="pl-1 mt-[-0.5rem]">table id: <span className="text-[var(--gray)]">{table.id}</span></p>
                            <div onClick={() => handleClick(table)}>
                                <Button text={table.PIN?'🔒':'join'} color="green" sound={table.PIN?"hit":"attack"} />
                            </div>
                        </div>
                    )):
                        <h3 className="text-center col-span-full">No open tables found</h3>
                    )}
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
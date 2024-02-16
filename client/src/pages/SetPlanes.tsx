import { useContext, useState } from "react";
import { Context } from "../Context";
import { TileType } from "../types";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";

export default function SetPlanes({bot}: {bot: "andrei" | "ioana" | "vasile"}) {
    const { state, setState } = useContext(Context);
    const [ board, setBoard ] = useState<TileType[]>(Array(100).fill({body: false, head: false, hit: false}));
    // to get the pathname:
    const location = useLocation();
    const path = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
    return (
        <main className="flex items-center justify-center flex-col gap-6 text-center">
            <h1>Set up your planes</h1>
            <p>Tap once to add plane<br/>Tap again to rotate<br/>Double-tap to remove</p>
            <section className="board my-auto">
                {board.map((tile: TileType, i:number) => ( 
                    <div key={i} className="tile"
                        style={{background: !tile.body?'#1e78d733':
                        tile.body&&tile.hit&&!tile.head?'#1e78d7':tile.head?'#999':'#1e78d7aa'}}
                    ></div>
                ))}
            </section>
            <Link to={path}>
                <Button text="Start" />
            </Link>
        </main>
    )
}

export default function BotGame({bot}:{bot:'vasile'|'ioana'}){
    const enemyBoard = [
        {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:true, head: true, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:true, head: false, body: true}, {hit:false, head: false, body: true}, {hit:true, head: false, body: true}, {hit:true, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:true, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: true, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:true, head: false, body: false}, {hit:false, head: true, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:true, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
        {hit:false, head: false, body: false},{hit:false, head: false, body: false}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true}, {hit:false, head: false, body: true},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},{hit:false, head: false, body: false},
    ]
    return (
        <main className="flex max-sm:flex-col items-center justify-center gap-6">
            <section className="board">
                {[...enemyBoard].reverse().map((tile, i) => (
                    <div key={i} className="tile" 
                    style={{background: tile.hit&&tile.head?'#d33':tile.hit&&tile.body?'#15c':tile.hit?'transparent':tile.body?'#38f':'#38f3'}}
                    ></div>
                ))}
            </section>
            <section className="board">
                {enemyBoard.map((tile, i) => (
                    <div key={i} className="tile cursor-pointer enemy flex items-center justify-center" 
                    style={{background: tile.hit&&!tile.body?'transparent':tile.hit&&tile.head?'#d33':tile.hit&&tile.body?'#f83':'#f333'}}
                    ></div>
                ))}
            </section>
        </main>
    )
}
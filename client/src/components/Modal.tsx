
export default function Modal({text, onExit}: {text: string, onExit: () => void}){
    return (
        <main className="bg-[#0002] relative flex items-center justify-center z-[110]">
            <div className="inset-0 absolute" onClick={onExit}></div>
            <section className="bg-[var(--bg)] rounded-[var(--radius)] p-[var(--padding)] z-[10]">
                {text}
            </section>
        </main>
    )
}
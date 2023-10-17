
export default function Modal(text: string){
    function closeModal(){
        
    }
    return (
        <main className="bg-[#0002] relative flex items-center justify-center z-[110]">
            <div className="inset-0 absolute" onClick={closeModal}></div>
            <section className="bg-[var(--bg)] rounded-[var(--radius)] p-[var(--padding)] z-[10]">
                {text}
            </section>
        </main>
    )
}
import Button from "./Button";

export default function MenuSidebar() {
    return (
        <div className="fixed top-0 right-0 hover:w-[20rem] active:w-[20rem] h-screen w-[6.3rem] bg-[#fff3] p-[var(--padding)] transition-all flex flex-col">
            <div className="w-full h-[3rem]">
                <Button 
                    text='+' 
                    color='yellow' 
                    wFull
                />
            </div>
        </div>
    )
}
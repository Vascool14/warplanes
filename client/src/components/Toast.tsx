import { useEffect, useState } from 'react'

const Toast = ({toast}:{toast:{message:string, success:boolean}}) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (toast.message.length>0) {
            setShow(true)
            setTimeout(() => {
                setShow(false)
            }, 3000)
        }
    }, [toast])
    return (
    <div onClick={() => setShow(false)} 
    className={`px-6 py-3 max-w-[96vw] rounded-[var(--radius)] border-[3px] border-[var(--text)] shadow-md shadow-[#4444] transition-all duration-500 flex gap-2 items-center p-2
    ${toast.success?'border-[var(--text)]':'border-red-500 text-red-500'} bg-[var(--bg)] fixed right-4 cursor-pointer
    bottom-4 z-[100] ${show ? 'translate-y-[0]':'translate-y-[160%]'}`}>
        <h4>{toast.message}</h4>
    </div>
    )
}

export default Toast
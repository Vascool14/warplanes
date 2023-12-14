import Button from './Button'
import { useContext } from 'react'
import { Context } from '../Context'
import { useNavigate } from 'react-router-dom'

export default function Nav() {
    const { state, setState } = useContext(Context);
    const navigate = useNavigate();
    return (
        <nav>
            {state.canExit &&
            <div className="fixed left-0 top-0 m-4 md:m-6 z-[10]">
                <Button text='&lt;' icon color='red' onButtonClick={() => navigate(-1)}/>    
            </div>
            }
            
            <div className="fixed right-0 top-0 m-4 md:m-6 z-[10]">
                <Button text='+' icon color='yellow' onButtonClick={() => setState({...state, menuOpen: !state.menuOpen})} />
            </div>
        </nav>
    )
}
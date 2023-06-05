import React from 'react'
import { Link, useParams } from 'react-router-dom'

type Props = {i:string,icon:any}

const  NavButtons=({i,icon}: Props)=> {
    

        return (
            <>

                <Link className=' text-white hover:bg-white/20  w-11/12 rounded-lg cursor-pointer flex items-center gap-5 p-2 text-sm ' to={`${i}`} >
                    <span className='' >{icon}</span><div className=''>{i}</div>
                </Link>



            </>
        )
    
}

export default NavButtons
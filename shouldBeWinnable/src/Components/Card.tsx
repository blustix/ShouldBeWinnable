import React from "react";

interface Props  {
    title : string,
    content : string,
    sx? : React.CSSProperties,
    imageURL? : string, 
}

function Card ({title, content, sx, imageURL} : Props) {
    return (
        <div className='bg-slate-700 border-color-slate-800 border-1 rounded-md w-fit min-w-8' style={sx}>
            <h1 className='flex justify-center'>{title}</h1>
            <p>{content}</p>
        </div>   
    )
}

export default Card

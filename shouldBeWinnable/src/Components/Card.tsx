import React from "react";

interface Props  {
    title : string,
    content : string,
    sx? : React.CSSProperties,
    imageURL? : string, 
}

function Card ({title, content, sx, imageURL} : Props) {
    return (
        <div className='bg-slate-800 shadow-lg border-color-slate-800 border-1 rounded-md w-full min-w-8 p-6' style={sx}>
            {imageURL && <img className='rounded w-full h-64 object-cover mb-4' src={imageURL}/>}
            <h1 className='flex justify-center text-x1 font-bold mb-2'>{title}</h1>
            <p className='text-zinc-200'>{content}</p>
        </div>   
    )

}

export default Card

import React, { useEffect, useState } from 'react'
import { saveAs } from 'file-saver'

const Body = () => {
    const [allMemes,setAllMemes]=useState([])
    const [meme,setMeme]=useState(
        {
            topText:'One does not simply',
            buttomText:"Walk into Mordor",
            imgUrl:"http://i.imgflip.com/1bij.jpg"
        }   
    )
    function handleChange(e){
        const {value,name}=e.currentTarget
        setMeme(previousMeme=>({
            ...previousMeme,
            [name]:value
        }))
        
    }
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setAllMemes(data.data.memes));
    },[])

    function showMeme(){
        const randomNumber=Math.floor(Math.random() * allMemes.length)
        const randomMemeUrl=allMemes[randomNumber].url
        setMeme(prevMeme=>({
            ...prevMeme,
            imgUrl:randomMemeUrl,
        }))
    }

    
    const handleDownload = async () => {
        const canvas = document.getElementById('memeCanvas');
        const ctx = canvas.getContext('2d');
    
        const image = new Image();
        image.crossOrigin = 'anonymous'; // avoid CORS issues
        image.src = meme.imgUrl;
    
        image.onload = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            // Draw image
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
            // Text styles
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.font = '30px Anton';
            ctx.lineWidth = 2;
            ctx.textAlign = 'center';

    
            // Top Text
            ctx.fillText(meme.topText, canvas.width / 2, 50);
            ctx.strokeText(meme.topText, canvas.width / 2, 50);
    
            // Bottom Text
            ctx.fillText(meme.buttomText, canvas.width / 2, canvas.height - 20);
            ctx.strokeText(meme.buttomText, canvas.width / 2, canvas.height - 20);
    
            // Convert to blob and download
            canvas.toBlob(blob => {
                saveAs(blob, 'custom-meme.png');
            });
        };
    };

    return (
        <div className='main'>
            <div className='main-text'>
                <div className='label1'>
                    <label className='label-main'>
                        Top Text
                    </label>
                    <input type="text" 
                    className='text1'
                    placeholder='One does not simply'
                    name='topText'
                    onChange={handleChange}
                    value={meme.topText}/>
                </div>
                <div className='label2'>
                    <label className='label-main'>
                        Buttom Text
                    </label>
                    <input type="text" 
                    className='text2'
                    placeholder='Walk into Mordor'
                    name='buttomText'
                    onChange={handleChange}
                    value={meme.buttomText}/>
                </div>
            </div>
            <button onClick={showMeme} className='button'>Get a new meme image</button>
            <div className='meme'>
                <img src={meme.imgUrl} alt="" className='img'/>
                <span className='top'>{meme.topText}</span>
                <span className='buttom'>{meme.buttomText}</span>
            </div>
            <button onClick={handleDownload} className='download'>Download</button>
            <canvas id="memeCanvas" width="500" height="500" style={{ display: 'none' }}></canvas>
        </div>
    )
}

export default Body

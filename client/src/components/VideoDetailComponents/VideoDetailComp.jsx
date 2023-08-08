import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player'
function VideoDetailComp() {
    const data = useSelector(state => state.dataSlice.video)
    const [playedSeconds, setPlayedSeconds] = useState(0);


    // const handleSeek = newSeekTime => {
    //     setPlayedSeconds(newSeekTime);
    //     console.log(newSeekTime);
    // };

    const handleVideoClick = e => {

        const clickedTime = Math.floor((e.nativeEvent.offsetX / e.target.offsetWidth) * e.target.duration);
        setPlayedSeconds(clickedTime);
        console.log(clickedTime);
    };





    return (
        <div className="w-full">
            <div className="video__content border h-[500px]">
                {
                    data?.videoawsid ?
                        <ReactPlayer
                            url={data?.videoawsid ? "http://localhost:8080/video/getvideo/" + data?.videoawsid : ""}
                            controls={true}
                            width={"100%"}
                            height={"100%"}

                        />
                        : <h1>Loading...</h1>
                }
            </div>

            <div className="video__author__data">
                <h1>{data?.userid?.username}</h1>
            </div>




        </div>
    )
}

export default VideoDetailComp
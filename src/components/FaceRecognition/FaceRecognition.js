import React from 'react';

const FaceRecognition = ({imageUrl}) => {
    return(
        <div className='center ma'>
            <div className="absolute mt2" id='canvas'>
                <img src={imageUrl} id='image' alt="faces" width='500px' height='auto'/>
            </div>
        </div>
    )
}

export default FaceRecognition;
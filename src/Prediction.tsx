import { useEffect, useState } from 'react';

import './Prediction.css';

interface PredictionProps {
    className: string;
}

function Prediction(props: PredictionProps) {
    const { className } = props;

    const [prediction, setPrediction] = useState('...');

    const handlePredictionMessage = async (message: string) => {
        console.log('Prediction received:', message);
        setPrediction(message);
    }

    // TODO: Remove this mock
    useEffect(() => {
        setInterval( () => handlePredictionMessage(
            String.fromCharCode(Math.floor(Math.random() * 26) + 97)
        ), 5000 );
    }, [])

    return (
        <div className={className}>
            <p>I'm guessing it's:</p>
            <div className='Digit'>{prediction}</div>
            <div className='Buttons'>
                <button type='button' className='correct'>Correct</button>
                <button type='button' className='incorrect'>Incorrect</button>
            </div>
        </div>
    )
}

export default Prediction;
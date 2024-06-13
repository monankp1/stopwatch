import React, { useEffect, useState } from 'react'
import styles from './Stopwatch.module.css'
import Button from '../Button/Button'

const format = (timer) => {
    const mins = Math.floor(timer / 60000);
    const secs = Math.floor((timer % 60000) / 1000);
    const milisecs = timer % 1000;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}:${milisecs < 10 ? '0' : ''}${milisecs}`
};

const Stopwatch = () => {
    const [isActivated, setIsActivated] = useState(false);
    const [timer, setTimer] = useState(0);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        let timerId;
        if (isActivated) {
            timerId = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 10);
            }, 10);
        } else {
            clearInterval(timerId);
        }

        return () => {
            clearInterval(timerId);
        };

    }, [isActivated]);

    const handleStart = () => {
        setIsActivated(true);
    }

    const handleLap = () => {
        if (isActivated) {
            setLaps((prevLaps) => [...prevLaps, format(timer)])
        } else {
            return
        }
    }
    const handleStop = () => {
        setIsActivated(false);
    }

    const handleReset = () => {
        setIsActivated(false);
        setTimer(0);
        setLaps([]);
    }

    return (
        <div>
            <div className={styles.container}>
                <h1>Stopwatch</h1>
                <div className={styles.timer}>{format(timer)}</div>
                <div>
                    <Button name='Start' onClick={handleStart} />
                    <Button name='Lap' onClick={handleLap} />
                    <Button name='Stop' onClick={handleStop} />
                    <Button name='Reset' onClick={handleReset} />
                </div>
                <div>
                    {Array.isArray(laps) && laps.map((lap, idx) => (
                        <div className={styles.laps} key={lap}>Lap{idx + 1}:-{lap}</div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Stopwatch
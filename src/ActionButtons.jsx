import React from "react";
import useWebWorker from "./useWebWorker";

const ActionButtons = () => {
    const evilFunction = (amount) => {
        const result = [...Array(amount).keys()].reduce((acc, curr) => acc + curr, 0)

        return result;
    }

    const workerFunction = (message) => {
        const {data} = message;

        const result = [...Array(data).keys()].reduce((acc, curr) => acc + curr, 0)
    
        self.postMessage(result);
    }

    // Get the function to post messages to the Web Worker
    const postMessageToWorker = useWebWorker(
        workerFunction,
        (data) => alert(data)
    );

    return (
        <div className="action-buttons">
            <button onClick={() => alert(evilFunction(100000000))}>Run Evil Function</button>

            <button onClick={() => postMessageToWorker(100000000)}>Run Evil Function With Worker</button>
        </div>
    )
}

export default ActionButtons;

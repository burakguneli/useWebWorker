import React from "react";
import useWebWorker from "./useWebWorker";

const ActionButtons = () => {
    const evilGenerateTotalSum = (amount) => {
        const result = [...Array(amount).keys()].reduce((acc, curr) => acc + curr, 0)

        console.log('evilGenerateTotalSum result:', result);
    }

    const generateTotalSum = (message) => {
        const {data: amount} = message;

        const result = [...Array(amount).keys()].reduce((acc, curr) => acc + curr, 0)

        self.postMessage(result);
    }

    const generateTotalSumWithWorker = useWebWorker(
        generateTotalSum,
        (data) => console.log('generateTotalSumWithWorker result:',data)
    );

    return (
        <div className="action-buttons">
            <button onClick={() => evilGenerateTotalSum(100000000)}>Generate Total Sum</button>

            <button onClick={() => generateTotalSumWithWorker(100000000)}>Generate Total Sum With Worker</button>
        </div>
    )
}

export default ActionButtons;

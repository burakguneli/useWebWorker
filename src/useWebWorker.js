import { useEffect, useRef } from 'react';

const useWebWorker = (workerFunction, callbackFunction) => {
  const workerRef = useRef();

  useEffect(() => {
    // Create a new Web Worker from the provided function
    const createWorker = () => {
      const blob = new Blob([`self.onmessage = ${workerFunction}`], {
        type: 'application/javascript',
      });

      const worker = new Worker(URL.createObjectURL(blob));
      workerRef.current = worker;

      // Handle messages from the worker
      worker.onmessage = (event) => {
        // Handle the result sent by the worker
        console.log('Result from worker:', event.data);

        callbackFunction(event.data)
      };

      // Handle errors from the worker
      worker.onerror = (error) => {
        console.error('Error in worker:', error);
      };
    };

    createWorker();

    return () => {
      // Terminate the worker when the component unmounts
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [callbackFunction, workerFunction]);

  // Function to post a message to the worker
  const postMessageToWorker = (message) => {
    if (workerRef.current) {

      workerRef.current.postMessage(message);
    }
  };

  return postMessageToWorker;
};

export default useWebWorker;

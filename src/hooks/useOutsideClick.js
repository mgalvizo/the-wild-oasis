import { useEffect, useRef } from 'react';

// Default is listen to the event in the capturing phase for proper functionality
export const useOutsideClick = (handler, listenCapturing = true) => {
    const ref = useRef();

    useEffect(() => {
        const handleClick = e => {
            // If the modal element exists and a click was made outside the modal
            if (ref.current && !ref.current.contains(e.target)) {
                handler();
            }
        };

        document.addEventListener('click', handleClick, listenCapturing);

        return () => {
            document.removeEventListener('click', handleClick, listenCapturing);
        };
    }, [handler, listenCapturing]);

    return ref;
};

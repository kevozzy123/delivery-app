import { useState, useCallback } from 'react';
import { isFunction } from 'lodash';

const useMergeState = <I>(initialState: I) => {
    const [state, setState] = useState<I>(initialState);

    const mergeState = useCallback(
        (newState: Partial<I> | ((state: Partial<I>) => any)) => {
            if (isFunction(newState)) {
                setState((prevState: I) => ({ ...prevState, ...newState(prevState) }));
            } else {
                setState((prevState: I) => ({ ...prevState, ...newState }));
            }
        }, []);

    return { state, mergeState }
}

export default useMergeState
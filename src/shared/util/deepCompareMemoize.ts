import { useRef } from "react";
import { isEqual } from 'lodash'

const useDeepCompareMemoize = <D>(value: D) => {
    const valueRef = useRef<D | undefined>()

    if (!isEqual(value, valueRef.current)) {
        valueRef.current = value
    }
    return valueRef.current
}

export default useDeepCompareMemoize
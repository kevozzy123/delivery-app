import { useRef } from "react";
import { isEqual } from "lodash";

const useDeepCompareMemoize = <V>(value: V) => {
    const valueRef = useRef<V | undefined>()

    if (isEqual(value, valueRef.current)) {
        valueRef.current = value
    }

    return valueRef.current
}

export default useDeepCompareMemoize
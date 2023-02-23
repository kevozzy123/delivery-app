import React, { useEffect, useRef } from "react";
import useDeepCompareMemoize from "./deepCompareMemoize";

interface ClickOutsideProps {
    $ignoredElementRefs: React.MutableRefObject<HTMLElement>,
    isListening: boolean,
    onOutsideClick: () => void,
    $listeningElementRef: React.MutableRefObject<HTMLElement>,
}
const useOnClickOutside = ({
    $ignoredElementRefs,
    isListening,
    onOutsideClick,
    $listeningElementRef
}: ClickOutsideProps) => {
    const $mouseDownTargetRef = useRef<EventTarget | null>()
    const $ignoredElementRefsMemoized = useDeepCompareMemoize([$ignoredElementRefs].flat())

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            $mouseDownTargetRef.current = e.target
        }

        const handleMouseUp = (e: MouseEvent) => {
            const isIgnoredElementsAncestor = $ignoredElementRefsMemoized?.some(
                element => {
                    element.current.contains($mouseDownTargetRef.current as Node) ||
                        element.current.contains(e.target as Node)
                }
            )
            if (e.button === 0 && !isIgnoredElementsAncestor) {
                onOutsideClick()
            }
        };

        const $listenElement = $listeningElementRef.current || document

        if (isListening) {
            $listenElement.addEventListener('mousedown', handleMouseDown)
            $listenElement.addEventListener('mouseup', handleMouseUp)

        }
        return () => {
            $listenElement.removeEventListener('mousedown', handleMouseDown)
            $listenElement.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])
}

export default useOnClickOutside
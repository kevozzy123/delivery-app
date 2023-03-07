import React, { ReactNode, useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { sizes, zIndexValues, font, color } from '@/shared/styles/styles'
import useOnClickOutside from '@/shared/util/hooks/useOnOutsideClick'

interface IProps {
    children: ReactNode,
    className?: string,
    withCloseIcon?: boolean,
    onClose?: () => void
}

const BottomModal = ({
    children,
    className,
    withCloseIcon = false,
    onClose = () => { }
}: IProps) => {
    const [stateIsOpen, setStateIsOpen] = useState(false);

    const $modalRef = useRef<HTMLDivElement>(null);
    const $overlayRef = useRef<HTMLElement>();

    const handleCloseModal = useCallback(() => {
        onClose()
    }, [onClose]);

    useOnClickOutside(
        $modalRef as React.MutableRefObject<HTMLElement>,
        stateIsOpen,
        handleCloseModal,
        $overlayRef as React.MutableRefObject<HTMLElement>
    );

    return (
        <>
            <ModalWrapper ref={$modalRef} className={className}>
                {children}
            </ModalWrapper>
        </>
    )
}

const $root = document.getElementById('root')

const ModalWrapper = styled.div`
    position: fixed;
    bottom: -100%;
    height: fit-content;
    background-color: white;
    z-index: ${zIndexValues.modal};
    width: 100%;
`
export default BottomModal
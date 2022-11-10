import React, { ReactNode, useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../utils/useOnClickOutside";

interface IModal {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onClose: (_: boolean) => void;
}

const Modal = (props: IModal) => {
    const { isOpen, title, children, onClose } = props;
    const [open, setOpen] = useState(isOpen);
    const modalRef = useRef(null);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        if (open) {
            setOpen(false);
            onClose(false);
        }
    }

    useOnClickOutside(modalRef, handleClose);

    return (
        <>
            <div className={`modal ${open ? "show" : ""}`}>
            </div>
            <div className={`modal-content ${open  ? "show" : ""}`} ref={modalRef}>
                <div className="modal--header">
                    {title}
                    <span onClick={handleClose} title="Close">X</span>
                </div>
                <div className="modal--child">
                    {children}
                </div>
            </div>
        </>
    );
}

export default React.memo(Modal);
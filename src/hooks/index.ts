import React from "react";
import { DialogProps } from "../components/Dialog";

export interface IDialog {
    dialogProps: DialogProps;
    closeDialog: () => void;
    showDialog: (props: Partial<DialogProps>) => void;
    isOpen: boolean;
}

export const useDialog = (): IDialog => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [dialogProps, setDialogProps] = React.useState<DialogProps>({
        isOpen,
        onClose: () => setIsOpen(false),
    });

    const closeDialog = () => {
        setIsOpen(false);
    };

    const showDialog = (props: Partial<DialogProps>) => {
        setDialogProps({ ...props, onClose: () => closeDialog(), isOpen });
        setIsOpen(true);
    };

    return {
        dialogProps,
        closeDialog,
        showDialog,
        isOpen,
    };
};

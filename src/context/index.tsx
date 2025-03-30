import React from "react";
import { observer } from "mobx-react";
import { IDialog, useDialog } from "../hooks";
import { Dialog } from "../components/Dialog";

interface IGlobalStore {
    dialog: IDialog;
}

const GlobalStoreContext = React.createContext<IGlobalStore | null>(null);

interface IProps {
    children?: React.ReactNode;
}

export const GlobalStoreProvider: React.FC<IProps> = observer((props) => {
    const dialog = useDialog();

    return (
        <GlobalStoreContext.Provider value={{ dialog }}>
            <Dialog {...dialog.dialogProps} isOpen={dialog.isOpen} />
            {props.children}
        </GlobalStoreContext.Provider>
    );
});

export const useGlobalStore = () => {
    const store = React.useContext(GlobalStoreContext);
    if (!store) {
        throw new Error("Cannot Access Store outside it's context");
    }
    return store;
};

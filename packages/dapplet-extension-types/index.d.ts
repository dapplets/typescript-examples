export interface ICore {
    openOverlay(id: ID, ctx: any): void;
    sendWalletConnectTx(tx: any): void;
}

export interface IModule { }

export interface IContentAdapter extends IModule {
    //init(core: ICore, doc: Document): void;
    registerFeature(feature: IFeature, doc: Document, core: ICore): void;
    unregisterFeature(feature: IFeature): void;
}

export interface IFeature extends IModule {
    activate(): void;
    deactivate(): void;
}

export interface IAction { }

export interface IView {
    name: string;
    isActive: boolean;
    INSERT_POINTS: ID[];
    attachActionFactories(actions: IAction[], insPoint: ID): void;
    activate(doc: Document): void;
    deactivate(doc: Document): void;
}

export type ID = string;


declare global {

    export function Load(name: string, version: string): Function;

    export var Core: {
        openOverlay: (id: string, ctx: any) => void,
        sendWalletConnectTx: (dappletId: string, metadata: any) => Promise<any>
    };

    export function PublicName(name: string, version: string, isFeature?: boolean): Function;

    export abstract class AbstractFeature {
        abstract activate(): void;
        abstract deactivate(): void;
    }
}
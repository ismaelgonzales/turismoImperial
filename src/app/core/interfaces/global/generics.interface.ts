export interface IHeaderOptions {
    name: string;
    route?: string;
    options?: IIdiomas[];
    type: 'button' | 'dropdown' | 'link' | 'text';
    action?: () => void;
}

export interface IFooterOptions {
    name: string;
    type: 'link' | 'dropdown' | 'button' | 'text';
    route?: string;
    options?: IIdiomas[];
    action?: () => void;
}

interface IIdiomas {
    name: string;
    cod: string;
}

export interface IImageSlide {
    imgRoute: string;
    alt: string;
}

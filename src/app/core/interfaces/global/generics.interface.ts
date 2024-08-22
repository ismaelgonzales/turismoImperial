export interface IHeaderOptions {
    name : string;
    route ?: string;
    options ?: IIdiomas[],
    type : 'button' | 'dropdown',
}

interface IIdiomas {
    name : string;
    cod : string
}

export interface IImageSlide {
    imgRoute : string;
    alt : string
}
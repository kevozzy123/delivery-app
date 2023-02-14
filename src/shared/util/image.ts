import { substr } from "./javascript";

export const getImgPath = (path: string) => {
    let suffix;
    if (!path) {
        return '//elm.cangdu.org/img/default.jpg'
    }
    if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
    } else {
        suffix = '.png'
    }
    let url = '/' + substr(path, 0, 1) + '/' + substr(path, 1, 2) + '/' + substr(path, 3) + suffix;
    return import.meta.env.VITE_IMG_PATH + url
}
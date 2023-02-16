export function substr(string: string, start: number, length?: number) {
    let finalString = "";

    // Check if start value is negative
    if (start < 0) {
        start = string.length + start;
    }

    // Check if length value is not provided
    if (length === undefined) {
        length = string.length;
    }

    // Check if length value is negative
    if (length < 0) {
        length = string.length + length - start;
    }

    // Extract the desired substring
    for (let i = start; i < start + length; i++) {
        if (string[i] === undefined) {
            break;
        }

        finalString += string[i];
    }

    return finalString;
}

export async function shareContent(title: string, url: string) {
    try {
        await navigator.share({
            title: title,
            url: url
        })
        alert('Thank you for sharing!')
    } catch (err) {
        alert('oops! Somthing went wrong')
    }
}

export function pickRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function splitStr(string: string, separator: string) {
    return string.split(separator)
}

export const cleanObject = (object: { [key: string]: unknown }) => {
    let result = { ...object }
    Object.keys(result).forEach((key) => {
        if (!result[key]) {
            delete result[key]
        }
    })

    return result
}
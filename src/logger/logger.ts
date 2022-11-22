const colors = require('colors');

export const successInfo = (message: string) => {
    console.log(colors.green(message));
}

export const errorInfo = (message: string) => {
    console.log(colors.red(message));
}

export const warningInfo = (message: string) => {
    console.log(colors.yellow(message));
}

export const debugInfo = (message: string) => {
    console.log(colors.magenta(message));
}

export const logInfo = (message: string) => {
    console.log(colors.white(message));
}
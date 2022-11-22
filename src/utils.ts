const { promises: Fs } = require('fs')
const Path = require('path')  
import { readdir } from 'fs/promises'

export const getDirectories = async (src: string, callback: any) => {
    const files = await readdir(src)
    for (const file of files) {
        const dir = Path.join(src, file)
        const stat = await Fs.stat(dir)
        if (stat.isDirectory() && file !== 'node_modules' && file !== 'ios' && file !== 'android' && file !== '.git') {
            callback(dir)
            await getDirectories(dir, callback)
        }
    }
}

export const getFiles = (dir: string): any => {
    return new Promise((resolve, reject) => {
        readdir(dir, { withFileTypes: true })
        .then(dirents => {
            let filesList: string[] = []
            dirents.map(dirent => {
                filesList.push(dirent.name);
            })
            resolve(filesList);
        })
        .catch(err => {
            reject(err)
        })
    })
}



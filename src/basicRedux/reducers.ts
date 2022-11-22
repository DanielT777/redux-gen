import PromptState from '../interfaces';
import { getDirectories, getFiles } from '../utils'
const colors = require('colors');
const { promises: Fs } = require('fs')
import { successInfo, errorInfo, warningInfo, debugInfo, logInfo } from '../logger/logger'

const generateAppendReducer = (reducersDir: string, state: PromptState, reducerImportString: string, reducerSwitchArray: string[]) => {

    getFiles(reducersDir).then(async (files: string[]) => {
            const filesToSearch = files.filter((file) => file.includes(state.filesname))
            if (filesToSearch.length > 0) {
                logInfo('Found files: /reducers/' + colors.white.magenta(filesToSearch.join(', ')))
                const file = await Fs.readFile(reducersDir + '/' + state.filesname, 'utf8')
                const index = file.indexOf('default:')
                const newFile = file.slice(0, index)
                const newFileWithReducer = reducerImportString + "\n" + newFile  + reducerSwitchArray.join('\n') + '\n\t\tdefault:\n\t\t\treturn state\n\t}\n}'
                await Fs.writeFile(reducersDir + '/' + state.filesname, newFileWithReducer, {encoding:'utf8',flag:'w'})
                successInfo('Reducer appended to file: ' + colors.white.magenta(state.filesname))
            } else {
                errorInfo('No files found in /reducers/ directory')
                logInfo('Creating file: ' + colors.white.magenta(state.filesname))
                Fs.writeFile(reducersDir + '/' + state.filesname, reducerImportString + '\n\n' + `const initialState = {
    loading: false,
    payload: null,
    error: null
    }\n
    const ${state.prefix.toLowerCase()}${state.action_name.charAt(0) + state.action_name.substring(1).toLowerCase()} = (state = initialState, action) => {
    switch (action.type) {
    \t\t${reducerSwitchArray.join('\n')}
        default:
            return state
    }
    }`, (err: string) => {
                    if (err) {
                        errorInfo('Error while creating file: ' + err)
                        process.exit(1)
                    }   
            })            
        }
    })
}

export default generateAppendReducer
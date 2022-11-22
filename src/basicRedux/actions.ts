import PromptState from '../interfaces';
import { getDirectories, getFiles } from '../utils'
const colors = require('colors');
const { promises: Fs } = require('fs')
import { successInfo, errorInfo, warningInfo, debugInfo, logInfo } from '../logger/logger'

const generateAppendAction = (actionsDir: string, state: PromptState, actionLine: string, actionFunctionsLine: string) => {
    getFiles(actionsDir).then((files: string[]) => {
        const filesToSearch = files.filter((file) => file.includes(state.filesname))
        if (filesToSearch.length > 0) {
            logInfo('Found files: /actions/' + colors.white.magenta(filesToSearch.join(', ')))
            Fs.appendFile(actionsDir + '/' + state.filesname,'\n'+ actionLine + '\n\n' + actionFunctionsLine, {flag: 'a+'}, (err: any) => {
                    if (err) {
                        errorInfo('Error while appending to file: ' + err)
                    } else {
                        successInfo('Action types and functions appended to file: ' + colors.white.magenta(state.filesname))
                    }
                }
            )
        } else {
            errorInfo('No files found in /actions/ directory')
            logInfo('Creating file: ' + colors.white.magenta(state.filesname))
            Fs.writeFile(actionsDir + '/' + state.filesname, actionLine + '\n\n' + actionFunctionsLine, (err: string) => {
                if (err) {
                    errorInfo('Error while creating file: ' + err)
                    process.exit(1)
                }
                successInfo('File created: ' + colors.white.magenta(state.filesname))
            })
        }
    })
}

export default generateAppendAction
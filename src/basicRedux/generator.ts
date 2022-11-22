import { successInfo, errorInfo, warningInfo, debugInfo, logInfo } from '../logger/logger'
import { formatTypes, formatFunctions, allActionTypes, generationImportTypes, reducerSwitch} from '../basicRedux/format';
import { getDirectories, getFiles } from '../utils'
import generateAppendAction from './actions'
import generateAppendReducer from './reducers'
const colors = require('colors');
const { promises: Fs } = require('fs')
import PromptState from 'interfaces';

export const basicReduxGenerator = async (state: PromptState) => {
        logInfo('Looking for files in the current directory... in ' + process.cwd())
        
        let actionTypesArray: string[] = formatTypes(state.prefix, state.action_name, state.types)

        const actionLine = actionTypesArray.join('\n')

        successInfo('Action types generated: \n' + actionLine)

        let actionFunctionsArray: string[] = formatFunctions(state.prefix, state.action_name, state.types)

        const actionFunctionsLine = actionFunctionsArray.join('\n\n')

        let allActionTypesArray: string[] = allActionTypes(state.prefix, state.action_name, state.types)

        const directories: string[] = []

        await getDirectories(process.cwd(), (dir: string) => {
            directories.push(dir)
        })

        const reducersDir = directories.find((dir) => dir.endsWith('/reducers') || dir.endsWith('/reducer'))
        const actionsDir = directories.find((dir) => dir.endsWith('/actions') || dir.endsWith('/action'))

        if (reducersDir && actionsDir) {
            logInfo('Reducers and actions directories found! :)')
        } else {
            errorInfo('Reducers and actions directories not found! :(')
            process.exit(1)
        }

        const depthReducers: number = (reducersDir.match(/\//g) || []).length
        const depthActions: number = (actionsDir.match(/\//g) || []).length

        if (depthReducers !== depthActions) {
            errorInfo('Reducers and actions directory depth are not the same, please do better next time :)')
        } else {
            logInfo('Reducers and actions directory depth are the same! :)')
        }

        if (depthReducers - depthActions < 0) {
            errorInfo('Reducers directory depth is lower than actions directory depth, or two directory are named "actions" or "reducers"')
            process.exit(1)
        }
        
        let reducerImportString: string = generationImportTypes(allActionTypesArray, depthReducers, depthActions, state.filesname)

        let reducerSwitchArray: string[] = reducerSwitch(state.prefix, state.action_name, state.types)

        generateAppendAction(actionsDir, state, actionLine, actionFunctionsLine)

        generateAppendReducer(reducersDir, state, reducerImportString, reducerSwitchArray)
}
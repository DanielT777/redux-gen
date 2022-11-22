const prompts = require('prompts');
import PromptState from '../interfaces';

const actionReducersProcess = async () => {

    const onCancel = (prompt: any) => {
        process.exit(1)
    }

    const getFilesName = await prompts([
        {
            type: 'text',
            name: 'filesname',
            message: 'Name of the files (with extension)',
            validate: (value: string) => value.length > 0 ? true : 'Name of the files'
            },
        ], { onCancel })
    
        const getActionPrefix = await prompts([
            {
                type: 'select',
                name: 'prefix',
                message: 'Select an action prefix',
                choices: [
                    { title: 'GET', value: 'GET' },
                    { title: 'DELETE', value: 'DELETE' },
                    { title: 'POST', value: 'POST' },
                    { title: 'UPDATE', value: 'UPDATE' },
                ],
                initial: 0
            }
        ], { onCancel });
    
        const getActionTypes = await prompts([
            {
                type: 'multiselect',
                name: 'types',
                message: 'Pick action types do you want',
                choices: [
                    { title: 'SUCCESS', value: 'SUCCESS' },
                    { title: 'FAILURE', value: 'FAILURE' },
                    { title: 'LOADING', value: 'LOADING' },
                ],
                hint: '- Space to select. Return to submit',
                instructions: false,
                min: 1
            },
        ], { onCancel });
    
        const getActionName = await prompts([
            {
                type: 'text',
                name: 'action_name',
                message: `Type the action name (${getActionPrefix.prefix} + ACTION NAME + ${getActionTypes.types})`,
                validate: (value: string) => value.length > 0 ? true : 'Type the action name'
            },
        ], { onCancel });    

        const state: PromptState = {
            filesname: getFilesName.filesname,
            prefix: getActionPrefix.prefix,
            types: getActionTypes.types,
            action_name: getActionName.action_name
        }

        return state
}

export default actionReducersProcess;
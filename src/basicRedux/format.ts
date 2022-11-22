
export const formatTypes = (prefix: string, action_name: string, types: string[]): string[] => {
    let actionTypesArray: string[] = []

    types.map((type: string) => {
        actionTypesArray.push(`export const ${prefix}_${action_name}_${type} = '${prefix}_${action_name}_${type}';`)
    })


    return actionTypesArray
}

export const formatFunctions = (prefix: string, action_name: string, types: string[]): string[] => {
    let actionFunctionsArray: string[] = []

    types.map((type: string) => {
        actionFunctionsArray.push(`function ${prefix.toLowerCase()}${action_name.charAt(0) + action_name.substring(1).toLowerCase()}${type.charAt(0) + type.substring(1).toLowerCase()}(payload) 
{ 
    return {
        type: ${prefix}_${action_name}_${type}${type !== 'LOADING' ? ',\n\t' : ''}${type !== 'LOADING' ? `${type == "FAILURE" ? "\terror": "\tpayload"}: payload` : ''}
    }
}`)
    })
    
        actionFunctionsArray.push(`export const ${prefix.toLowerCase()}${action_name.charAt(0) + action_name.substring(1).toLowerCase()} = (payload) => {
    const request = sdk.getRequestManager()

    return (dispatch) => {
        // dispatch loading ? :) 
        //ITS READY TO BE FILLED UP! :) 
    }
}`)

    return actionFunctionsArray
}

export const allActionTypes = (prefix: string, action_name: string, types: string[]): string[] => {
    let allActionTypes: string[] = []

    types.map((type: string) => {
        allActionTypes.push(`${prefix}_${action_name}_${type}`)
    })

    return allActionTypes
}

export const generationImportTypes = (allActionTypesArray: string[], depthReducers: number, depthActions: number, filesname: string): string => {
    let reducerImportString: string = (`import { ${allActionTypesArray.map((e) => e)} } from "${'../'.repeat((depthReducers - depthActions)+1)}actions/${filesname}"`)
    return reducerImportString
}

export const reducerSwitch = (prefix: string, action_name: string, types: string[]): string[] => {
    let reducerSwitchArray: string[] = []

    types.map((type: string) => {
        reducerSwitchArray.push(`\t\tcase ${prefix}_${action_name}_${type}:\n\t\t\treturn {\n\t\t\t\t...state,\n\t\t\t\t${type == "FAILURE" ? "error": type == "LOADING" ? "loading" : "payload"}: ${type == "FAILURE" ? "action.error": type == "LOADING" ? "true" : "action.error"},${type == "SUCCESS" || type == "FAILURE" ? "\n\t\t\t\tloading:": ""} ${type == "SUCCESS" || type == "FAILURE" ? "false": ""}\n\t\t\t}`)
    })

    return reducerSwitchArray
}
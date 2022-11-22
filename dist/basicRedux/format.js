"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducerSwitch = exports.generationImportTypes = exports.allActionTypes = exports.formatFunctions = exports.formatTypes = void 0;
const formatTypes = (prefix, action_name, types) => {
    let actionTypesArray = [];
    types.map((type) => {
        actionTypesArray.push(`export const ${prefix}_${action_name}_${type} = '${prefix}_${action_name}_${type}';`);
    });
    return actionTypesArray;
};
exports.formatTypes = formatTypes;
const formatFunctions = (prefix, action_name, types) => {
    let actionFunctionsArray = [];
    types.map((type) => {
        actionFunctionsArray.push(`function ${prefix.toLowerCase()}${action_name.charAt(0) + action_name.substring(1).toLowerCase()}${type.charAt(0) + type.substring(1).toLowerCase()}(payload) 
{ 
    return {
        type: ${prefix}_${action_name}_${type}${type !== 'LOADING' ? ',\n\t' : ''}${type !== 'LOADING' ? `${type == "FAILURE" ? "\terror" : "\tpayload"}: payload` : ''}
    }
}`);
    });
    actionFunctionsArray.push(`export const ${prefix.toLowerCase()}${action_name.charAt(0) + action_name.substring(1).toLowerCase()} = (payload) => {
    const request = sdk.getRequestManager()

    return (dispatch) => {
        // dispatch loading ? :) 
        //ITS READY TO BE FILLED UP! :) 
    }
}`);
    return actionFunctionsArray;
};
exports.formatFunctions = formatFunctions;
const allActionTypes = (prefix, action_name, types) => {
    let allActionTypes = [];
    types.map((type) => {
        allActionTypes.push(`${prefix}_${action_name}_${type}`);
    });
    return allActionTypes;
};
exports.allActionTypes = allActionTypes;
const generationImportTypes = (allActionTypesArray, depthReducers, depthActions, filesname) => {
    let reducerImportString = (`import { ${allActionTypesArray.map((e) => e)} } from "${'../'.repeat((depthReducers - depthActions) + 1)}actions/${filesname}"`);
    return reducerImportString;
};
exports.generationImportTypes = generationImportTypes;
const reducerSwitch = (prefix, action_name, types) => {
    let reducerSwitchArray = [];
    types.map((type) => {
        reducerSwitchArray.push(`\t\tcase ${prefix}_${action_name}_${type}:\n\t\t\treturn {\n\t\t\t\t...state,\n\t\t\t\t${type == "FAILURE" ? "error" : type == "LOADING" ? "loading" : "payload"}: ${type == "FAILURE" ? "action.error" : type == "LOADING" ? "true" : "action.error"},${type == "SUCCESS" || type == "FAILURE" ? "\n\t\t\t\tloading:" : ""} ${type == "SUCCESS" || type == "FAILURE" ? "false" : ""}\n\t\t\t}`);
    });
    return reducerSwitchArray;
};
exports.reducerSwitch = reducerSwitch;
//# sourceMappingURL=format.js.map
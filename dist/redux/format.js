"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allActionTypes = exports.formatFunctions = exports.formatTypes = void 0;
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
        actionFunctionsArray.push(`export const ${prefix.toLowerCase()}${action_name.charAt(0) + action_name.substring(1).toLowerCase()} = (payload) => {
    const request = sdk.getRequestManager()

    return (dispatch) => {
        // dispatch loading ? :) 
        //ITS READY TO BE FILLED UP! :) 
    }
}`);
    });
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
//# sourceMappingURL=format.js.map
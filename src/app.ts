#!/usr/bin/env node
import PromptState from './interfaces'
import actionReducersProcess from './prompt/actionReducersProcess'
const prompts = require('prompts')
import { basicReduxGenerator } from './basicRedux/generator';

(async () => {

    const chooseWhatYouWant = await prompts([
        {
            type: 'select',
            name: 'value',
            message: 'What do you want to do?',
            initial: 0,
            choices: [
                { title: 'Create/Append action and reducers', value: 'actionReducersProcess' },
            ]}
        ], { onCancel: () => process.exit(1) })

    switch (chooseWhatYouWant.value) {
        case 'actionReducersProcess':
            const state: PromptState = await actionReducersProcess();
            basicReduxGenerator(state);
    }


})();
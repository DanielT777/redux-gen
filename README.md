
![Logo](https://i.ibb.co/yFGGXvN/Redux-Logo.png)



# Take it to the next level with Redux-Gen

Redux-Gen allows you to automatically generate OR add to your redux files a skeleton so that you only have to worry about the content of your applications.


## Goal

- Generate actions/ and reducers/ files via CLI
- Do not rewrite the same code several times
- Keep a naming standard in your redux files
- Generate the minimum reliable, stay flexible
- Save time!

## Installation

NPM
```bash
npm install redux-gen
```

Yarn 
```bash
yarn add redux-gen
```



You must absolutely have in your project a "actions" and "reducers" folder.

⚠️ Your "reducers" folder must be deeper than your "actions" folder.

WORKING ✅
```bash
src/
    redux/
        reducers/
        actions/
```

```bash
    src/
        actions/
        redux/
            reducers/
```

NOT WORKING❌
```bash
src/
    reducers/
    redux/
        actions/
```


    
## Usage/Examples

Redux-gen is integrated in the CLI and its use is done via the answers to the question asked.
```bash
$> redux-gen
✔ What do you want to do? › Create/Append action and reducers
✔ Name of the files (with extension) … login.js
? Select an action prefix › - Use arrow-keys. Return to submit.
❯   GET
    DELETE
    POST
    UPDATE
? Pick action types do you want › - Space to select. Return to submit 
◉   SUCCESS
◉   FAILURE
◯   LOADING
✔ Type the action name (GET + ACTION NAME + SUCCESS,FAILURE) … TEST
Looking for files in the current directory... in ~/Desktop/Projet_perso/redux-gen
Action types generated: 
export const GET_TEST_SUCCESS = 'GET_TEST_SUCCESS';
export const GET_TEST_FAILURE = 'GET_TEST_FAILURE';
Reducers and actions directories found! :)
Reducers and actions directory depth are the same! :)
Found files: /actions/login.js
Found files: /reducers/login.js
Reducer appended to file: login.js
```


## Contributing

Contributions are always welcome!

Feel free to contribute to this small personal project to add some features or others to make our life easier.
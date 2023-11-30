import React from 'react';

import classes from './App.module.css';

import {Counter} from '@/lib/Counter';

const App = () => (
    <div className={classes.container}>
        <Counter initialValue={0} />
    </div>
);

export default App;

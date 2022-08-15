import styles from "./Todo.module.css";
import React, {useEffect, useState} from "react";

export default function Todo(){

    const [newTodoText, setNewTodoText] = useState('');
    const [todoCount, setTodoCount] = useState(0);
    const [buttonStatus, setButtonStatus] = useState('all');
    const [todos, setTodos] = useState([
        {
            text:"Todo 1",
            status: false
        },
        {
            text:"Todo 2",
            status: true
        },
        {
            text:"Todo 3",
            status: false
        }
    ]);

    useEffect(() => {
        let count = 0;
        todos.forEach(item => !item.status ? count++ : count)
        setTodoCount(count);
    },[todos])

    const addTodo = (event) => {
        if (event.key === 'Enter' && newTodoText !== ''){
            setTodos([...todos, {
                text:newTodoText,
                status:false,
            }])
            setNewTodoText("");
        }
    }

    const removeTodo = (index) => {
        todos.splice(index, 1);
        setTodos([...todos]);
    }

    const changeTodoStatus = (e, index) => {
        todos[index].status = !todos[index].status;
        setTodos([...todos]);
    }

    const clearCompletedTodos = () => {
        const newTodos = todos.filter(item => !item.status);
        setTodos([...newTodos]);
    }

    const filteredTodos = todos.filter(item => {
        if (buttonStatus === 'all'){
            return item;
        }
        else if (buttonStatus === 'active' && !item.status){
            return item;
        }
        else if (buttonStatus === 'completed' && item.status){
            return item;
        }else {
            return false;
        }
    });


    const changeInputText = (e, index) => {
        todos[index].text = e.target.value;
        setTodos([...todos]);
    }




    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <h1 className={styles.appTitle}>TODOS</h1>
                <input onKeyUp={addTodo} onChange={(e) => setNewTodoText(e.target.value)} value={newTodoText} type="text" className={'px-4 py-2 italic w-full focus:outline-0'} placeholder={'What needs to be done?'}/>
                <ul className={'divide-y [&>li]:px-5 [&>li]:py-2 border-y'}>
                    {
                        filteredTodos.length > 0 && filteredTodos.map((item, index) => (
                            <li key={'item_'+index} className={'flex gap-2 items-center'}>
                                <input onChange={(e) => changeTodoStatus(e, index)} type="checkbox" checked={item.status} />

                                <input
                                    value={item.text}
                                    onChange={(e) => changeInputText(e, index)} 
                                    className={[item.status ? 'line-through text-slate-300':''] + ' px-4 py-2 w-full'}/>

                                <button onClick={() => removeTodo(index)} className={'text-red-500'}>x</button>
                            </li>
                        ))
                    }
                </ul>
                <div className={'flex justify-between items-center gap-4 px-5 w-full text-sm'}>
                    <div>
                        <span>{todoCount} items left</span>
                    </div>
                    <div className={'flex gap-2 justify-center items-center [&>button]:px-2 [&>button]:py-1'}>
                        <button onClick={() => setButtonStatus('all')} className={buttonStatus === 'all'?'border':''}>All</button>
                        <button onClick={() => setButtonStatus('active')} className={buttonStatus === 'active'?'border':''}>Active</button>
                        <button onClick={() => setButtonStatus('completed')} className={buttonStatus === 'completed'?'border':''}>Completed</button>
                    </div>
                    <div>
                        <button onClick={clearCompletedTodos} className={'px-2 py-1'}>Clear Completed</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
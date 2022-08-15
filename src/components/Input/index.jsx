import style from "./Input.module.css";

export default function Input({type, name, placeholder, onChangeEvent, value, onKeyUpEvent}){
    return (
        <input
            name={name}
            onChange={onChangeEvent}
            onKeyUp={onKeyUpEvent}
            value={value}
            placeholder={placeholder}
            type={type}
            className={style.input}/>
    )
}
import style from "./Button.module.css";

export default function Button({text, clickEvent}){

    return (
        <button onClick={clickEvent} className={style.btn}>{text}</button>
    )
}
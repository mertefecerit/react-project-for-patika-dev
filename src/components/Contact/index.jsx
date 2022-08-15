import Button from "../Button";

import {useState} from "react";
import Input from "../Input";

function Contact() {
    const [list, setList] = useState([
        {
            name:"Cerit",
            phone: "1"
        },
        {
            name:"Efe",
            phone: "2"
        },
        {
            name:"Mert",
            phone: "3"
        }
    ]);
    const [form , setForm] = useState({
        name: "",
        phone: ""
    })
    const [filterText, setFilterText] = useState('');

    const onChangeInput = (e) => {
        setForm({...form, [e.target.name]:e.target.value})
    }

    const addList = () => {
        if (form.name && form.phone){
            setList([...list, form])
            setForm({name:"", phone:""})
        }
    }


    const filtered = list.filter(item => {
        return Object.keys(item).some((key) => {
            return item[key]
                .toLocaleString()
                .toLocaleLowerCase()
                .includes(
                    filterText.toLocaleString()
                        .toLocaleLowerCase()
                )
        })
    })


    return (
        <div className={'bg-slate-200 min-h-screen flex justify-center items-start'}>
            <div className={'flex flex-col gap-2 bg-slate-500 p-5 rounded-xl w-96 mt-2'}>
                <h1 className={'text-center text-slate-300 text-2xl mb-2'}>Contact List Example</h1>
                <div className={'flex flex-col gap-2'}>
                    <Input name="name" onChangeEvent={onChangeInput} value={form.name} placeholder={'Ad Soyad'}/>
                    <Input name="phone" onChangeEvent={onChangeInput} value={form.phone} placeholder={'Telefon'}/>
                    <Button clickEvent={addList} text={'+ Ekle'}></Button>
                </div>
                {
                    list.length > 0 &&
                    <div className={'text-white'}>
                        <div className={'text-slate-800 p-2 rounded-lg bg-slate-100 max-h-[400px] overflow-auto'}>
                            <h2 className={'text-center mb-2'}>Contact List</h2>

                            <Input name={'filter'} onChangeEvent={(e) => setFilterText(e.target.value)} value={filterText} placeholder={'Filtrele'}></Input>
                            <ul className={'divide-y [&>li]:py-2'}>
                                {
                                    filtered.map((item, index) => {
                                        return (
                                            <li className={'flex flex-col gap-1'} key={'item_'+index}>
                                                <span>Name : {item.name}</span>
                                                <span>Phone : {item.phone}</span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className={'flex justify-end items-center mt-2'}>
                            <span>Toplam Kayıt : {list.length}</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Contact;

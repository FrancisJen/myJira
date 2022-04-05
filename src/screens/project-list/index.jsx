import {SearchPanel} from "./search-panel";
import {List} from "./list";
import { useEffect, useState } from "react";
import * as qs from "qs";
import { cleanObject } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([]);
    const [param, setParma] = useState({
        name: "",
        personId: "",
    })
    const [list, setList] = useState([])


    //tips 数据初始化
    useEffect( () => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
            if(response.ok) {
                setList(await response.json())
            }
        })
    }, [param])

    useEffect( () => {
        fetch(`${apiUrl}/users`).then(async response => {
            if(response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])

    return <div>
        <SearchPanel param = {param} setParma = {setParma}  users={users} />
        <List users={users} list={list}/>
    </div>
}
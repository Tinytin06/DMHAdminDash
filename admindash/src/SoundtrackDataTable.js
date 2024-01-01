import React from "react"
import {useState} from "react"
import {Table, Button, Input, Space} from "antd"
import AddSoundtrackForm from './AddSoundtrackForm'
import {getSongs,getAllSongs,addNewSongTitleSimple,addNewSongURL} from "./APICalls";

function sortStringKey(key) {
    return function(a, b) {
        if  ( 
                a[key] === null       || 
                a[key] === undefined  ||
                b[key] === null       ||
                b[key] === undefined
            ) return ''
        
        let strA = a[key].toString(),
            strB = b[key].toString()
            
        return strA.localeCompare(strB)
    }
}

// function sortStringMetaKey(key) {
//     return function(a, b) {
//         if  ( 
//             a['meta_data'][key] === null       || 
//             a['meta_data'][key] === undefined  ||
//             b['meta_data'][key] === null       ||
//             b['meta_data'][key] === undefined
//         ) return ''
        
//         let strA = a['meta_data'][key].toString(),
//             strB = b['meta_data'][key].toString()
        
//         return strA.localeCompare(strB)
//     }
// }

function editSoundtrack(_id) {
    console.log('edit song, id:',_id)
}

function deleteSoundtrack(_id) {
    console.log('delete song, id:',_id)
}

function addSoundtrack() {
    console.log('add soundtrack stuff goes here')
}

let uriAddress = "https://3.144.222.38:5000"
// let uriAddress = 'http://localhost:5000'
let data = await fetch(uriAddress+'/music/soundtracks').then( res => res.json() ).catch( () => [] )

let cols = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        sorter: sortStringKey('title'),
        defaultSortOrder: 'ascend'
    },
    {
        title: 'Game',
        dataIndex: ['game'],
        key: 'game',
        sorter: sortStringKey('game')
    },
    {
        title: 'Release Date',
        dataIndex: ['release_date'],
        key: 'release_year',
        sorter: sortStringKey('release_date')
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'action',
        render: (text, record, index) => (
            <Space size='middle'>
                <Button onClick={ () => { editSoundtrack(record._id) } }>
                    edit
                </Button>
                <Button onClick={ () => { deleteSoundtrack(record._id) } }>
                    delete
                </Button>
            </Space>
        ),
    },
]

function SoundtrackDataTable() {

    let [filteredData, setFilteredData] = useState(data)

    function filterDataTable(evt) {
        let filterString = evt.target.value
        filteredData = data.filter( (obj) => {
            if (
                obj.title.toLowerCase().includes(filterString.toLowerCase())
            ) return true
            
            return false
        })
        // console.log(filterString, filteredData)
        setFilteredData(filteredData)
    }

    return (
        <>
        <div style={{textAlign: 'center', margin: '3em'}}>
            <h1 style={{textAlign: 'left'}}>Soundtrack Dashboard:</h1>
            <Input onChange={filterDataTable} placeholder="Filter by title"/>
            
                <Table
                    bordered
                    pagination={false}
                    virtual
                    scroll={{ x: 1, y: 500 }}
                    dataSource={[...filteredData]}
                    columns={cols}
                    rowKey="_id"
                />
            <br/>
            <AddSoundtrackForm/>
        </div>
        </>
    )
}

export default SoundtrackDataTable
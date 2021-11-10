import React, { useEffect,useState } from 'react'
import {API} from '../../utils/api';
import {Table} from 'antd';



function ContactList() {
 const [contactData, setContactData]=useState([])
 const[contactList, setContactList]=useState(false)

    const getContactInformationFromAPI=async()=>{
      setContactList(true)
        try {
           const response= await API.get("/contact")
           setContactData(response?.data[0])
            
        } catch (error) {
            
        }
   setContactList(false) }

    useEffect(()=>{
    getContactInformationFromAPI()
    },[])
 
    const columns = [
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Message',
          dataIndex: 'message',
          key: 'message',
        },
      ];
    return (
        <div style={{
            margin:24
        }}>
            <Table dataSource={contactData} columns={columns} loading={contactList} />
        </div>
    )
}

export default ContactList

import React,{useState,useEffect} from 'react'
import {API} from '../../utils/api';
import {Table,Space,Tag, Button, notification,Popconfirm} from 'antd';
import router, { useRouter } from 'next/router';
import Link from "next/Link";



function EventDetails() {
    const [eventData, setEventData]=useState([])
    const[eventListLoading, setEventListLoading]=useState(false)
    const router=useRouter()
   
       const getEventInformationFromAPI=async()=>{
         setEventListLoading(true)
           try {
              const response= await API.get("/admin/event")
              console.log(response)
              setEventData(response?.data)
               
           } catch (error) {
               
           }
      setEventListLoading(false) }
   
       useEffect(()=>{
       getEventInformationFromAPI()
       },[])
       const DeleteEvent=async(id)=>{
         await API.delete(`/event/${id}`)
         notification.success({
           message:"Event deleted sucessfully"
         })
         getEventInformationFromAPI()
       }
      console.log(eventData)
       const columns = [
           {
             title: 'Event Name',
             dataIndex: 'eventTitle',
             key: 'eventTitle',
           },
          
           {
             title: 'Venue Name',
             dataIndex: 'venueName',
             key: 'venueName',
           },
         
          {
            title: 'Organization Name',
            dataIndex: 'organizationName',
            key: 'organizationName',
          },
          {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
          },
         

          {
            title: "Status",
            dataIndex: "isApproved",
            key: "isApproved",
            render: (text, record) => {
              console.log(record);
              return <Tag color={record?.isApproved?"green":"red"}>{record?.isApproved?"Published":"In Review"}</Tag>;
            },
          },
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Space size="middle">
               
               <Button onClick={()=>{router.push(`/event/update/${record.id}`)}}>Update</Button>
               <Button onClick={()=>{router.push(`/event/edit/${record.id}`)}}>Edit</Button>
               <Popconfirm 
    title="Are you sure to delete this task?"
    onConfirm={()=>{
    DeleteEvent(record.id)
    }}
    onCancel={()=>{

    }}
    okText="Yes"
    cancelText="No"
  >
     <Button >Delete</Button>
  </Popconfirm>
              
              </Space>
            ),
          },
         ];
    return (
        <div>
         
             <div style={{
            margin:24
        }}>
           <Button type="primary" onClick={()=>{router.push("/add")}}> Add Event</Button>
            <Table dataSource={eventData} columns={columns} loading={eventListLoading} />
        </div>
        </div>
    )
}

export default EventDetails

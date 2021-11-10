import React,{useEffect,useState} from 'react'
import {useRouter} from "next/router";
import { API } from '../../../utils/api';
import {Button, notification, Radio} from "antd";

function UpdateEvent() {
    const router=useRouter()
    const {id} =router.query
    const[detailInfo,setDetailInfo]=useState();
    const[loading,setLoading]=useState(false);
    const[status,setStatus]=useState(false);
    const getDetailsInformationFromAPI=async()=>{
        setLoading(true)
        try {
            const response=await API.get(`/event/${id}`)
            console.log('abc',response)
            setDetailInfo(response.data)
        } catch (error) {
            
        }
        setLoading(false)
        
    
    }
    useEffect(()=>{
      getDetailsInformationFromAPI()
    },[id])
    console.log(detailInfo,id)

    const UpdateInfo=async()=>{
        
        try {
           await API.put(`/event/${id}`,{isApproved:status})
            notification.success({message:"Event Updated Sucessfully"})
            router.back()
        } catch (error) {
            
        }
    }
    return (
        <div style={{
            margin:24
        }}>
         <div>
             <strong>
       Event title

             </strong>
             <p> {detailInfo?.eventTitle}</p>
             </div>   

             <div>
             <strong>
       Event Address

             </strong>
             <p> {detailInfo?.Address}</p>
             </div>   

             <div>
             <strong>
       Event Summary

             </strong>
             <p> {detailInfo?.eventSummary}</p>
             </div>   

             <div>
             <strong>
       Event Description

             </strong>
             <p> {detailInfo?.eventDescription}</p>
             </div>   

             <div>
             <strong>
       Organization Email

             </strong>
             <p> {detailInfo?.organizationEmail}</p>
             </div>  

              <div>
             <strong>
       Start Date

             </strong>
             <p> {detailInfo?.startDate}</p>
             </div>  

              <div>
             <strong>
       End Date

             </strong>
             <p> {detailInfo?.endDate}</p>
             </div>    

              <div>
             <strong>
       Event Banner

             </strong>
             <img src={detailInfo?.Banner} height={200} width={500}/>
             </div> 
             <p>Status</p>   
             <Radio.Group onChange={(e)=>{setStatus(e.target.value)}} value={status}>
      <Radio value={true}>Approve</Radio>
      <Radio value={false}>Decline</Radio>
      
    </Radio.Group>
    <br/>
    <Button onClick={UpdateInfo}>Update</Button>
        </div>
    )
}

export default UpdateEvent

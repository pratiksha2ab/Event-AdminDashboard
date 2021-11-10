import {API} from '../../utils/api';
import {Table} from 'antd';
import {useState,useEffect} from 'react';
 
function RegisterList() {
    const [registerData, setRegisterData]=useState([])
    const[registerList, setRegisterList]=useState(false)
   
       const getRegisterInformationFromAPI=async()=>{
         setRegisterList(true)
           try {
              const response= await API.get("/register")
              setRegisterData(response?.data[0])
               
           } catch (error) {
               
           }
      setRegisterList(false) }
   
       useEffect(()=>{
        getRegisterInformationFromAPI()
       },[])
    
       const columns = [
           {
             title: 'Full Name',
             dataIndex: 'fullname',
             key: 'fullname',
           },
           {
             title: 'Phone Number',
             dataIndex: 'phone',
             key: 'phone',
           },
           {
             title: 'Email',
             dataIndex: 'email',
             key: 'email',
           },
         ];
       return (
           <div style={{
               margin:24
           }}>
               <Table dataSource={registerData} columns={columns} loading={registerList} />
           </div>
       )
   }
   
   export default RegisterList
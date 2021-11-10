import {Form,Input,Button,Upload, message} from 'antd';
import styles from '../../add/submit-event.module.css';
import React,{useState,useEffect} from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { API } from '../../../utils/api'; 
import {useRouter} from 'next/router';
import ImageUploading from 'react-images-uploading';




function AddEventForm() {
    const[eventTitle,setEventtitle]=useState('qwerty');
    const [eventType,setEventtype]=useState('');
    const [venueName,setVenunename]=useState('');
    const [Address,setAddress]=useState('');
    const [eventSummary,setEventsummary]=useState('');
    const[eventDescription,setEventDescription]=useState('');
    const[startDate,setStartDate]=useState('');
    const[endDate,setEndDate]=useState('');
     const [organizationName,setOrganizationname]=useState('');
    const [organizationEmail,setOrganizationemail]=useState('');
    const[loading,setloading]=useState(false);
    const [images, setImages] = useState([]);
    const [imageFile, setImageFile] = useState();
    const maxNumber = 1;
    const[eventData,setEventData]=useState();
    // const[uploadBanner,setUploadbanner]=useState('');
    
    // const[bannerFile,setBannerFile]=useState('');
    const router=useRouter();
    const {id} =router.query
    const handleRegister=async()=>{
        setloading(true) 
        const formData=new FormData();
        formData.append('eventTitle',eventTitle)
        formData.append('eventType',eventType)
        formData.append('venueName',venueName)
        formData.append('Address',Address)
        formData.append('eventSummary',eventSummary)
        formData.append('eventDescription',eventDescription)
        formData.append('organizationName',organizationName)
        formData.append('organizationEmail',organizationEmail)
        formData.append('startDate',startDate)
        formData.append('endDate',endDate)
        if(imageFile){
          formData.append('Banner',imageFile)
        }
        
        try {
            await API.put(`/event/${id}`,formData)
            message.success("event updated successfully")
            router.push('/')
        } catch (error) {
            console.log(error)
        }
        setloading(false)
          }

          const onChange = (imageList, addUpdateIndex) => {
            // data for submit
            console.log("image=======>", imageList[0]?.file);
            setImageFile(imageList[0]?.file);
            setImages(imageList);
          };

          const getDetailsInformationFromAPI=async()=>{
            setloading(true)
            try {
                const response=await API.get(`/event/${id}`)
                
                
                
                setEventData(response.data)
               
            } catch (error) {
                
            }
            setloading(false)
            
        
        }
        useEffect(()=>{
          getDetailsInformationFromAPI()
        },[id])
     console.log(eventData,"-----")
     useEffect(()=>{
      if(eventData){
          setEventtitle(eventData.eventTitle)
          setEventtype(eventData.eventType)
          setVenunename(eventData.venueName)
          setAddress(eventData.Address)
          setEventsummary(eventData.eventSummary)
          setEventDescription(eventData.eventDescription)
          setStartDate(eventData.startDate)
          setEndDate(eventData.endDate)
          setOrganizationname(eventData.organizationName)
          setOrganizationemail(eventData.organizationEmail)
          
          

      }
     },[eventData])
    return (
        <div className={styles.submitEvent}>
            <Form layout="vertical" onFinish={handleRegister} autoComplete={"off"} initialValues={{
                // "eventTitle":eventData?.eventTitle,
                "eventType":eventData?.eventType,
                "venueName":eventData?.venueName,
                "address":eventData?.Address,
                "eventsummary":eventData?.eventSummary,
                "eventdescription":eventData?.EventDescription,
                "startDate":eventData?.startDate,
                "endDate":eventData?.endDate,
                "organizationName":eventData?.organizationName,
                "organizationemail":eventData?.organizationEmail

            }
                }
                >
            <Form.Item 
            
            
            label="Event Title"
            // name="eventTitle"
            // rules={[{
            //     required:true,
            //     message:"Enter your event title"
            // }]}
            
            >
                <Input 
                size="large"
                onChange={(e)=>setEventtitle(e.target.value)}
                value={eventTitle}
                
                />
                </Form.Item>
                <Form.Item
                initialValue={eventData?.eventType}
            label="Event Type"
            // //name='eventType"
            rules={[{
                required:true,
                message:"Enter the event type"
            }]}
            
            >
                <Input 
                size="large"
                onChange={(e)=>setEventtype(e.target.value)}
                value={eventType}
                
                />
                </Form.Item>
                <Form.Item
                initialValue={eventData?.venueName}
            label="Venune Name"
            // //name='venueName"
            // rules={[{
            //     required:true,
            //     message:"Enter the venue name"
            // }]}
            
            >
                <Input type="VenueName"
                size="large"
                onChange={(e)=>setVenunename(e.target.value)}
                value={venueName}
                
                />
                </Form.Item>
                <Form.Item
            label="Address"
            // //name='address"
            // rules={[{
            //     required:true,
            //     message:"Enter the address"
            // }]}
            
            >
                <Input type="Address"
                size="large"
                onChange={(e)=>setAddress(e.target.value)}
                value={Address}
                
                />
                </Form.Item>
                <Form.Item
            label="Event Summary"
            // //name='eventsummary"
            // rules={[{
            //     required:true,
            //     message:"Enter the event summary"
            // }]}
            
            >
                <Input.TextArea type="EventSummary"
                rows={10}
                maxLength={300}
                showCount
                size="large"
                onChange={(e)=>setEventsummary(e.target.value)}
                value={eventSummary}

                
                />
                 </Form.Item>
                 
                 <Form.Item
            label="Event Description"
            //name='eventdescription"
            // rules={[{
            //     required:true,
            //     message:"Enter the event description"
            // }]}
            
            >
                <Input.TextArea type="EventDescription"
                rows={10}
                maxLength={2000}
                showCount
                size="large"
                onChange={(e)=>setEventDescription(e.target.value)}
                value={eventDescription}

                
                />

                </Form.Item>
                <Form.Item 
            label="Start Date"
            //name='startDate"

            //  rules={[{
            //     required:true,
            //     message:"enter the start date"
            // }]}
            >
             <Input type="Date"
                size="large"
                onChange={(e)=>setStartDate(e.target.value)}
                value={startDate} 
                />
                </Form.Item>

                <Form.Item 
            label="End Date"
            //name='endDate"

            //  rules={[{
            //     required:true,
            //     message:"enter the end date"
            // }]}
            >
             <Input type="Date"
                size="large"
                onChange={(e)=>setEndDate(e.target.value)}
                value={endDate} 
                />
                </Form.Item>
          
            
             <Form.Item 
            label="Organization Name"
            //name='organizationName"
            // rules={[{
            //     required:true,
            //     message:"Enter your organization name"
            // }]}
            
            >
                <Input type="OrganizationName"
                size="large"
                onChange={(e)=>setOrganizationname(e.target.value)}
                value={organizationName}
                
                />
                </Form.Item>
                <Form.Item
            label="Organization Email"
            //name='organizationemail"
            // rules={[{
            //     required:true,
            //     message:"Enter your organization email"
            // }]}
            
            >
                <Input type="OrganizationEmail"
                size="large"
                onChange={(e)=>setOrganizationemail(e.target.value)}
                value={organizationEmail}
                
                />
                </Form.Item>

                <div>Event Image </div>
                 <ImageUploading 
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList=[],
          onImageUpload,

          onImageUpdate,
          onImageRemove
        }) => (
          // write your building UI
          <div className="upload__image-wrapper" >
            <button type="button" onClick={()=>onImageUpload()}>Upload Image</button>
            &nbsp;
            {imageList && imageList?.map((image, index) => (
              <div key={index} className="image-item">
                <img src= { image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <Button onClick={() => onImageUpdate(index)}>Update</Button>
                  <Button
                    icon="delete"
                    color="red"
                    
                    onClick={() => onImageRemove(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

              
                <Form.Item>
            <Button type="ghost" 
            htmlType="submit"
            loading={loading}
            className={styles.buttonWrapper}
            >
             Submit
             </Button>
            </Form.Item>
            </Form>
          
            
        </div>
    )
}

export default AddEventForm

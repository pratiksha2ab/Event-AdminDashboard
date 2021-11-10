import {Form,Input,Button,Upload,message} from 'antd';
import styles from './blog.module.css';
import React,{useState,Component} from 'react';
import { UploadOutlined } from '@ant-design/icons';
import {useRouter} from 'next/router';
import {API} from '../../utils/api';
import ImageUploading from "react-images-uploading";


function Blog() {
    const[blogTitle,setBlogtitle]=useState('');
    const[date,setDate]=useState('');
    const[description,setDescription]=useState('');
    const[writerName,setWriterName]=useState('');
    const[loading ,setLoading]=useState('');
    const [images, setImages] = useState([]);
     const [imageFile, setImageFile] = useState();
     const maxNumber = 1;

    const router=useRouter();
    const handleBlog=async()=>{
        setloading(true) 
        const formData=new FormData();
        formData.append('blogTitle',blogTitle)
        formData.append('date',date)
        formData.append('description',description)
        formData.append('writerName',writerName)
        try {
            await API.post("/blog")
            message.success("blog added successfully")
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
    return (

        <div className={styles.BlogContent} >
            <Form layout="vertical" >
            <Form.Item
            label="Blog Title"
            name="blogTitle"
            rules={[{
                required:true,
                message:"Enter the blog title"
            }]}
            
            >
                <Input type="BlogTitle"
                size="large"
                onChange={(e)=>setBlogtitle(e.target.value)}
                value={blogTitle}/>
                </Form.Item>

                <Form.Item
            label="Description"
            name="description"
            rules={[{
                required:true,
                message:"Write the description here"
            }]}
            
            >
               <Input.TextArea type="Description"
                
                rows={10}
                maxLength={350}
                showCount
                size="large"
                
                
                onChange={(e)=>setDescription(e.target.value)}
                value={description}
                
                
                />
                </Form.Item>

                <Form.Item
            label="Date"
            name="date"
            rules={[{
                required:true,
                message:"Enter the date"
            }]}
            
            >
                <Input type="Date"
                size="large"
                onChange={(e)=>setDate(e.target.value)}
                value={date} />
                </Form.Item>

                <Form.Item
            label="Writer Name"
            name="writername"
            rules={[{
                required:true,
                message:"Enter the writer name"
            }]}
            
            >
                <Input type="Writer Name"
                size="large"
                onChange={(e)=>setWriterName(e.target.value)}
                value={writerName} />
                </Form.Item>

                <div>Blog Image </div>
                 <ImageUploading 
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,

          onImageUpdate,
          onImageRemove
        }) => (
          // write your building UI
          <div className="upload__image-wrapper" >
            <button type="button" onClick={()=>onImageUpload()}>Upload Image</button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
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
            <Button type="ghost" htmlType="submit"
            message={"Thank you for submitting"}
            loading={loading}
            className={styles.buttonWrapper}
            >
             Add Blog
             </Button>
            </Form.Item>

               
                </Form>

        
        </div>
    )
}

export default Blog

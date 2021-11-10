import React from 'react'
import { Layout, Menu } from 'antd';
import styles from './sider.module.css';
import {useRouter} from 'next/router';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
  } from '@ant-design/icons';

  const { Header, Sider, Content } = Layout;
function NavbarSider() {
  const router =useRouter();
    return (
        
        <Sider>
          <div className={styles.navbarSider} >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
            <Menu.Item key="1" icon={<UserOutlined />} onClick={()=>router.push('/event')}>
               Event
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />} onClick={()=>router.push('/contact')}>
              Contact List
            </Menu.Item>

            
            <Menu.Item key="3" icon={<UserOutlined />} onClick={()=>router.push('/blog')}>
              Blog
            </Menu.Item>

            <Menu.Item key="4" icon={<UserOutlined />} onClick={()=>router.push('/register')}>
              Register Details
            </Menu.Item>
           
            
          </Menu>
          </div>
        </Sider>
        
    )
}

export default NavbarSider

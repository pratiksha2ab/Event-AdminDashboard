import '../styles/globals.css'
import MainHeader from '../Components/Header'
import NavbarSider from '../Components/Sider'
import { Layout } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return  (<Layout> <NavbarSider/>
   <Layout> <MainHeader/>
     <Component {...pageProps} />
     </Layout> 
    </Layout>)
  
}


export default MyApp

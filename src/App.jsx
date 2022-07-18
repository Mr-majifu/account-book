

import { useRoutes } from "react-router-dom";
import routes from "@/routes";
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import 'zarm/dist/zarm.css';

import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";

const App = () => {
  // 路由
  const element = useRoutes(routes)
  const [showNav, setShowNav] = useState(false) // 是否展示 Nav
  const needNav = ['/', '/data', '/user'] // 底部导航栏的路径
  const pathname = location.pathname

  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname])

  return (
    <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
      <div>
        {element}
        <NavBar showNav={showNav}>
        </NavBar>
      </div>
    </ConfigProvider>
  )
}

export default App;
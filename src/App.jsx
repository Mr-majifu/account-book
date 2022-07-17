

import { useRoutes } from "react-router-dom";
import routes from "@/routes";
import { ConfigProvider, Button } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import 'zarm/dist/zarm.css';

const App = () => {
  const element = useRoutes(routes)
  return (
    <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
      {element}
    </ConfigProvider>
   
  )
}

export default App;
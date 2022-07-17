
import { Button } from "zarm";

import s from "./style.module.less";

const Index = () => {
  return (
    <div className={s.index}>
      <span>index</span>
      <Button theme="primary">按钮</Button>
    </div>
  )
}

export default Index;
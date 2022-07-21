


import { forwardRef, useState, useEffect } from "react"
import { Popup, Icon } from "zarm"
import cx from 'classnames'
import PropTypes from 'prop-types'
import { get } from '@/utils'

import s from './style.module.less'



const PopupType = forwardRef(({ onSelect }, ref ) => {

  const [show, setShow] = useState(false) // 组件的现实或隐藏
  const [active, setActive] = useState('all') // 激活的 type
  const [expense, setExpense] = useState([]) // 支出类型标签
  const [income, setIncome] = useState([]) // 收入类型标签

  useEffect(async () => {
    // 请求标签接口放在弹窗内，这个弹窗可能会被复用，所以请求如果放在外面，会造成代码冗余。
    const { data: { list } } = await get('/api/type/list')
    setExpense(list.filter(i => i.type == 1))
    setIncome(list.filter(i => i.type == 2))
  }, [])

  // 将控制组件显示与隐藏的方法抛给外部
  if (ref) {
    ref.current = {
      show: () => {
        setShow(true)
      },
      close: () => {
        setShow(false)
      }
    }
  }

  const choseType = (item) => {
    setActive(item.id)
    setShow(false)
    // 父组件传入的 onSelect
    onSelect(item)
  }


  return (
    <Popup
      visible={show} // 是否显示
      direction='buttom' // 弹出方向
      onMaskClick={() => setShow(false)} // 点击遮罩层时触发的回调函数
      destroy={false} // 弹层关闭后是否移除节点
      mountContainer={() => document.body} // 指定 Popup 挂载的 HTML 节点
    >
      <div className={s.popupType}>
        <div className={s.header}>
          请选择类型
          <Icon
            type="wrong"
            className={s.cross}
            onClick={() => setShow(false)}
          />
        </div>
        <div className={s.content}>
          <div
            className={cx({ [s.all]: true, [s.active]: active == 'all' })}
            onClick={() => choseType({ id: 'all' })}
          >
            全部类型
          </div>
          <div className={s.title}>支出</div>
          <div className={s.expenseWrap}>
            {
              expense.map((item, index) => <p className={cx({[s.active]: active == item.id})} key={index} onClick={() => choseType(item)}>{item.name}</p>)
            }
          </div>
          <div className={s.title}>收入</div>
          <div className={s.incomeWrap}>
            {
              income.map((item, index) => <p className={cx({[s.active]: active == item.id})} key={index} onClick={() => choseType(item)}>{item.name}</p>)
            }
          </div>
        </div>
      </div>
    </Popup>
  )
})

PopupType.propTypes = {
  onSelect: PropTypes.func
}

export default PopupType;
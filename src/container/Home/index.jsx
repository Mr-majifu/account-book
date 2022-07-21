

import s from "./style.module.less";
import { Icon, Pull } from 'zarm'
import { useEffect, useRef, useState } from 'react'
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils'
import dayjs from "dayjs";
import BillItem from '@/components/BillItem'
import PopupType from '@/components/PopupType'


const Home = () => {
  const [list, setList] = useState([])
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM'))
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.nomal) // 下拉刷新状态
  const [loading, setLoading] = useState(REFRESH_STATE.nomal) // 上拉加载状态
  const [currentSelect, setCurrentSelect] = useState({}) // 当前筛选类型
  const typeRef = useRef() // 账单类型 ref

  useEffect(() => {
    getBillList() // 初始化
  }, [page, currentSelect])

  // 获取账单的方法
  const getBillList = async () => {
    const { data } = await get(`/api/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${currentSelect.id || 'all'}`)
    // 下拉刷新，重置数据
    if (page == 1) {
      setList(data.list)
    } else {
      setList(list.concat(data.list))
    }
    setTotalPage(data.totalPage)
    setLoading(LOAD_STATE.success)
    setRefreshing(REFRESH_STATE.success)
  }

  // 请求列表数据
  const refreshData = () => {
    setRefreshing(REFRESH_STATE.loading)
    if (page != 1) {
      setPage(1)
    } else {
      getBillList()
    }
  }

  const loadData = () => {
    if (page < totalPage) {
      setLoading(LOAD_STATE.loading)
      setPage(page + 1)
    }
  }

  // 类型弹窗
  const toggle = () => {
    typeRef.current && typeRef.current.show()
  }

  const select = (item) => {
    setRefreshing(REFRESH_STATE.loading)
    setPage(1)
    setCurrentSelect(item)
  }

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.dataWrap}>
          <span className={s.expense}></span>
          <span className={s.income}></span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left} onClick={toggle}>
            <span className={s.title}>{currentSelect.name || '全部类型'}<Icon className={s.arrow} type="arrow-bottom" /></span>
          </div>
          <div className={s.right}>
            <span className={s.time}>2022-06<Icon className={s.arrow} type="arrow-bottom" /></span>
          </div>
        </div>
      </div>
      <div className={s.contentWrap}>
        {
          list.length ?
            <Pull
              animationDuration={200}
              stayTime={400}
              refresh={{
                state: refreshing,
                handler: refreshData
              }}
              load={{
                state: loading,
                distance: 200,
                handler: loadData
              }}
            >
              {
                list.map((item, index) => <BillItem
                  key={index}
                  bill={item}
                />)
              }
            </Pull> : null
        }
      </div>
      <PopupType ref={typeRef} onSelect={select} />
    </div>
  )
}

export default Home
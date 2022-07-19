

import s from "./style.module.less";
import {Icon, Pull} from 'zarm'
import {useEffect, useState} from 'react'
import BillItem from '@/components/BillItem'
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils'
import dayjs from "dayjs";

const Home = () => {
  const [list, setList] = useState([])
  const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM'))
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [refreshing, setRefreshing] = useState(REFRESH_STATE.nomal) // 下拉刷新状态
  const [loading, setLoading] = useState(REFRESH_STATE.nomal) // 上拉加载状态

  useEffect(() => {
    getBillList() // 初始化
  }, [page])

  // 获取账单的方法
  const getBillList = async () => {
    const { data } = get(`/api/bill/list?page=${page}&page_size=5&date=${currentTime}`)
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
    if(page < totalPage) {
      setLoading(LOAD_STATE.loading)
      setPage(page + 1)
    }
  }

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.dataWrap}>
          <span className={s.expense}></span>
          <span className={s.income}></span>
        </div>
        <div className={s.typeWrap}>
          <div className={s.left}>
            <span className={s.title}>类型<Icon className={s.arrow} type="arrow-bottom" /></span>
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
              list.map((item, index) => <BillItem key={index} bill={item} />)
            }
           </Pull> : null
        }
      </div>
    </div>
  )
}

export default Home
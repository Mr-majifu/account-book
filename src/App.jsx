import { useEffect, useState } from 'react'
// import './App.css'
import useApi from "./useApi";

const App = () => {
  const [{data},setQuery] = useApi()

  return (
    <div className='App'>
      {
        data.map((item, index) => <span key={index}>{item}</span>)
      }
      <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="请输入搜索值" />
    </div>
  )
}

export default App

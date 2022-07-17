
// useState , useEffect , 自定义 hook

// import useApi from "./useApi";

// const App = () => {
//   const [{data},setQuery] = useApi()

//   return (
//     <div className='App'>
//       {
//         data.map((item, index) => <span key={index}>{item}</span>)
//       }
//       <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="请输入搜索值" />
//     </div>
//   )
// }

// export default App






// import { useEffect, useMemo, useState } from "react";

// const Child = ({data}) => {
//   useEffect(() => {
//     console.log("查询条件", data);
//   },[data])

//   return <div>子组件</div>
// }

// const App = () => {
//   const [name, setName] = useState("")
//   const [phone, setPhone] = useState("")
//   const [kw, setKw] = useState("")

//   const data = useMemo(() => ({
//     name,
//     phone
//   }), [name, phone])

//   return (
//     <div className="App">
//       <input type="text" onChange={(e) => setName(e.target.value)} placeholder="请输入姓名" />
//       <input type="text" onChange={(e) => setPhone(e.target.value)} placeholder="请输入电话" />
//       <input type="text" onChange={(e) => setKw(e.target.value)} placeholder="请输入关键词" />
//       <Child data={data} />
//     </div>
//   )
// }

// export default App;






import { useCallback, useEffect, useMemo, useState } from "react";

const Child = ({callback}) => {
  useEffect(() => {
    callback()
  },[callback])

  return <div>子组件</div>
}

const App = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [kw, setKw] = useState("")

  const callback = useCallback(() => {
    console.log("我是callback");
  },[name])

  return (
    <div className="App">
      <input type="text" onChange={(e) => setName(e.target.value)} placeholder="请输入姓名" />
      <input type="text" onChange={(e) => setPhone(e.target.value)} placeholder="请输入电话" />
      <input type="text" onChange={(e) => setKw(e.target.value)} placeholder="请输入关键词" />
      <Child callback={callback} />
    </div>
  )
}

export default App;
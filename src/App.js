import logo from './logo.svg';
import './App.css';
import Content from './Content';

import { useState } from 'react'
import { getElementError } from '@testing-library/react';

const oders = [100, 200, 500];

function App() {

  //---------------------------ueState()----------
  //---------VD1---------------
  const [counter, setCounter] = useState(() => {
    const total = oders.reduce((total, cur) => total + cur);
    return total;
  });//counter là đếm số

  const handleIncrease = () => {// xử lý tăng
    setCounter((prevState) => (prevState + 100))
  }

  //--------VD2----------------
  const [info, setInfo] = useState({
    name: 'Nguyen Van A',
    age: 22, 
    adress: 'Thai Nguyen'
  })

  const handleUpdate = () => {// xử lý tăng
    setInfo((prev) => {
      //logic

      return {
        ...prev, 
        SoThich: 'Yeu mau xanh'
      }
    })
  }


  //-----------VD3--------
  const gifts = ['CPU i9', 'RAM 32G RG', 'RG Keybroad']
  const [gift, setGift] = useState();

  const randomGift = () => {
    const index = Math.floor(Math.random() * gifts.length)
    setGift(gifts[index]);
  }

  
  //-----------VD4--------Lấy gtri của form
  const [namee, setNamee] = useState('');
  //console.log(namee)

  const [email, setEmail] = useState('');

  const inputName = (e)=>{
    const str = e.target.value;
    setNamee(str);
  }

  const inputEmail = (e)=>{
    const str = e.target.value;
    setEmail(str);
  }

  const submitHandler = () =>{
    console.log({
      name: namee,
      email: email
    })
  }

  
  //-----------VD5--------Lấy gtri của radio
  const courses = [
    {
      id: 1,
      name: 'Javascript'
    },
    {
      id: 2,
      name: 'CSS'
    },
    {
      id: 3,
      name: 'HTML'
    }
  ]

  const registerHandler = () => {
    console.log({id: checked})
  }

  const [checked, setChecked] = useState(1)


//-----------VD6--------Lấy gtri của checkbox
  const [checked1, setChecked1] = useState([])

  const registerHandler1 = () => {
    console.log({id: checked1})
  }

  const handleChecked = (id) => {
    
    setChecked1((prev) => {
      const isChecked = checked1.includes(id);
      if(isChecked) {
        return checked1.filter(item => item !== id)
      }
      else{
        return [...prev, id]
      }
    })
  }

  //-----------VD7--------
  const storageJobs = JSON.parse(localStorage.getItem('jobs'))

  const [job, setJob] = useState('');
  const [jobs, setJobs] = useState(storageJobs ?? []);

  const addHandle = () => {
    setJobs(pre => {
      const newJobs = [...pre, job]

      //chuyen vền chuoi json
      const jsonJobs = JSON.stringify(newJobs)

      //luu vao local
      localStorage.setItem('jobs', jsonJobs)

      return newJobs
    });

    setJob('')
  }
  
  const listHandle = (e) => {
    setJob(e.target.value);
  }


  //-----------VD8: Ẩn hiện component--------
  const [show, setShow] = useState(false);


  return (
    <div className="App" style={{padding: 20}}>
      {/* VD1 */}
      <div>
        <h1>{counter}</h1>
        <button onClick={handleIncrease}>Increase</button>
      </div>

      {/* VD2 */}
      <div>
        <h1>{JSON.stringify(info)}</h1>
        <button onClick={handleUpdate}>Update</button>
      </div>

       {/* VD3 */}
      <div>
        <h1>{gift || 'Chưa có phần thưởng'}</h1>
        <button onClick={randomGift}>Lấy thưởng</button>
      </div>

      {/* VD4 */}
      <div>
        <input value={namee} onChange={inputName}/>
        <input value={email} onChange={inputEmail}/>
        <button onClick={submitHandler}>change</button>
        <p>{namee}</p>
      </div>

      {/* VD5 */}
      {courses.map(course => (
        <div key={course.id}>
          <input type="radio" 
                 onChange={() => setChecked(course.id)}
                 checked = {checked === course.id}/>
          {course.name}
        </div>
      ))}

      <button onClick={registerHandler}>registerRadio</button>

       {/* VD6 */}
       {courses.map(course => (
        <div key={course.id}>
          <input type="checkbox" 
                 onChange={() => handleChecked(course.id)}
                 checked = {checked1.includes(course.id)}/>
          {course.name}
        </div>
      ))}

      <button onClick={registerHandler1}>registerChebox</button>
      
      {/* VD7 */}
      <div>
        <input onChange = {listHandle} value={job}/>
        <button onClick={addHandle}>ADD</button>

        <ul>
          {
            jobs.map((job, index) => {
              return <li key={index}>{job}</li>;
            })
          }
        </ul>
      </div>

      {/* VD8: ẩn hiện 1 component */}
      <div>
        <button onClick = {() => {return setShow(!show);}}>Show</button>
        {show && <Content/>}
      </div>

    </div>
  );
}

export default App;

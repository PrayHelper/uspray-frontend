import React, { useEffect, useState } from "react";
import LockerHeader from "../Locker_components/L_Header";
import PrayChecker from "../Locker_components/L_PrayChecker";
import Sample from "../Locker_components/L_AllSelector";
import axios from "axios";
const data = [
  {id:1, checked: "unchecked", name: "이종우", prayer: '내일 지각하도록 내일 늦잠자도록 ', dday: 'D-3'},
  {id:2, checked: "unchecked", name: "배서현", prayer: '안녕을 기도하고 또 하세요.', dday: 'D-5'},
  {id:3, checked: "unchecked", name: "김동하", prayer: '안녕하세요 전 동하에요~', dday: 'D-9'},
  {id:4, checked: "unchecked", name: "김동하", prayer: '학점이 3.5를 넘도록', dday: 'D-21'},
  {id:5, checked: "unchecked", name: "김동하", prayer: '좀 공부좀 하도록', dday: 'D-30'}
]
const Locker = () => {
  // const getSharedPrayList = async () => {
  //   const api = '/api/share';
  //   try {
  //     const res = await axios.get(api);
  //     if (res.status === 200) {
  //       console.log(res.data);
  //     } 
  //   } catch (e) {
  //     console.log(e.response);
  //   }
  // };
  return (
  <div 
  style={{ 
      backgroundColor: "#d0e8cb",
      width : "430px",
      height : "100%"
      }}>
    <LockerHeader/>
    {/* <Sample/> */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "27px",
        padding: "20px 27px",
      }}
    >
      <div>
        {data.map((item) => (
          <PrayChecker key={item.id} checked={item.checked} name={item.name} prayer={item.prayer} dday={item.dday}/>
        ))}
      </div>
      {/* <button onClick={getSharedPrayList}>test</button> */}
    </div>
  </div>
);
};

export default Locker;
import "./chart.scss";
import { useState,useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", Total: 200 },
  { name: "February", Total: 100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

const ItemChart = ({ aspect, title , id }) => {

  const [ isDataLoaded , setIsDataLoaded] = useState(false);

  const [ dataArray , setDataArray] = useState();

  useEffect(()=>{
    axios.get(`http://localhost:5000/itemviewed/${id}`).then((resp,errp)=>{
          if(resp){
            processData(resp.data);
          }
        })
  },[id]);

  const processData = (data) =>{

    var today_date = new Date();

    var prev_date_1 = new Date();
    prev_date_1.setDate(prev_date_1.getDate() - 1);

    var prev_date_2 = new Date();
    prev_date_2.setDate(prev_date_2.getDate() - 2);

    var prev_date_3 = new Date();
    prev_date_3.setDate(prev_date_3.getDate() - 3);

    var prev_date_4 = new Date();
    prev_date_4.setDate(prev_date_4.getDate() - 4);

    var prev_date_5 = new Date();
    prev_date_5.setDate(prev_date_5.getDate() - 5);

    let da = [
        {
            "count": 0,
            "date": prev_date_4.toISOString().slice(2, 10).toString()
        },
        {
            "count": 0,
            "date": prev_date_3.toISOString().slice(2, 10).toString()
        },
        {
            "count": 0,
            "date": prev_date_2.toISOString().slice(2, 10).toString()
        },
        {
            "count": 0,
            "date": prev_date_1.toISOString().slice(2, 10).toString()
        },
        
        {
            "count": 0,
            "date": today_date.toISOString().slice(2, 10).toString()
        }
    ];

    data.forEach(element => {
        da.forEach(e =>{
        if(element.date === e.date){
            e.count = element.count;
        }
       });
    });
    setIsDataLoaded(true);
    setDataArray(da);
  }

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={dataArray}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ItemChart;
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState,useEffect } from "react";
import axios from "axios";

const List = ({catId}) => {

  const [items , setItems] = useState();
  const [isDataLoaded , setIsDataLoaded] = useState(false);

  useEffect(()=>{
    axios.get(`http://localhost:5000/ItemsInCat/${catId}`).then((res,err)=>{
      if(res){
        setItems(res.data);
        setIsDataLoaded(true);
        console.log(res.data)
      }
    })
  },[catId])

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Item ID</TableCell>
            <TableCell className="tableCell">Image</TableCell>
            <TableCell className="tableCell">Item Name</TableCell>
            <TableCell className="tableCell">Sub Category</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isDataLoaded ? items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="tableCell">{item.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={item.imgUrl} alt="" className="image" />
                  {item.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{item.name}</TableCell>
              <TableCell className="tableCell">{item.subCategory}</TableCell>
              <TableCell className="tableCell">{item.price}</TableCell>
              <TableCell className="tableCell">{item.stock}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${item.status}`}>{item.status}</span>
              </TableCell>
            </TableRow>
          )) : ''}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
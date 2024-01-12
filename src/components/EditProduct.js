import React, { useEffect, useState } from 'react'
import { getProductById, saveProduct,updateProduct } from '../app/app';
import { useParams } from 'react-router-dom';

export default function EditProduct() {
  const {id}=useParams();
  const[name,setName]=useState("");
  const[price,setPrice]=useState(0);
  const[checked,setChecked]=useState(false);

  useEffect(()=>{
    handleGetProductById(id);
  },[]);

  let handleGetProductById=(id)=>{
    getProductById(id).then(resp=>{
      let product=resp.data;
      setName(product.name);
      setPrice(product.price);
      setChecked(product.checked);
    });

  };
  const handleUpdateProduct=(event)=>{
    event.preventDefault();
    let product={id,name,price,checked};
    updateProduct(product).then(resp=>{
      alert(JSON.stringify(resp.data));
      
    })
  }


  return (
    <div className='row p-1'>
      <div className='col-md-6'>
        <div className='card'>
            <div className='card-body'>
              <form onSubmit={handleUpdateProduct}>
                <div className='mb-3'>
            <label className="form-label"> Name:</label>
                <input onChange={(e)=>setName(e.target.value)} 
                value={name}
                className='form-control'></input>
                </div>
                <div className='mb-3'>
            <label className="form-label"> Price :</label>
                <input onChange={(e)=>setPrice(e.target.value)} 
                value={price} 
                className='form-control'></input>
                </div>
                <div className="form-check">
  <input className="form-check-input" type="checkbox" />
  <label 
  onChange={(e)=>setChecked(e.target.value)}
  checked={checked}
  className="form-check-label" htmlFor="flexCheckChecked">
    Checked 
  </label>
</div>
<button className='btn btn-success'>Update</button>

              </form>
            </div>
        </div>
      </div>
      
      </div>
  )
}

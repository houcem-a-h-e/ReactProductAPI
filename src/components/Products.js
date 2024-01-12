import { faCheckCircle, faCircle, faTrash,faSearch, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AppContext, checkProduct, deleteProduct, deleteProducts, getProducts } from '../app/app';
import { useNavigate, useParams } from 'react-router-dom';
import SearchForm from './SearchForm';


export default function Products() {

  const [query,setQuery]=useState("");

  const navigate=useNavigate();
 const [state,setState]=useContext(AppContext);
 useEffect(()=>{
  handleGetProducts(state.keyword,state.currentPage,state.pageSize);
 },[]);
 
 const handleGetProducts=(keyword,page,size)=>{
  getProducts(keyword,page,size).then(resp=>{
    let totalElements=resp.headers['x-total-count'];
    let totalPages=Math.floor(totalElements/size) ;
    if(totalElements%size!=0) ++totalPages;
    setState({products:resp.data,keyword:keyword, currentPage:page,pageSize:size,
    totalPages:totalPages});
  }).catch(err=>{
    console.log(err);
  })
 }



  const handleDeleteProduct=(product)=>{
    deleteProduct(product).then(p=>{
      const newProducts=state.products.filter(e=>e.id!=product.id);
    setState({...state,products:newProducts});
    }).catch(err=>{

    })


    
  }
  const handleCheckProduct=(product)=>{

      checkProduct(product).then(resp=>{
        const newProducts=state.products.map(p=>{
          if(p.id===product.id){
            p.checked=!p.checked;
          }
          return p;
    
        })
        setState({...state,product:newProducts});

      })
  }

  let handleSearch=(event)=>{
    event.preventDefault();
    handleGetProducts(query,1,state.pageSize);
  }
  const handleGoToPage=(page)=>{handleGetProducts(state.keyword,page,state.pageSize);}
  return (
<div className='p-1 m-1'>
<div className='row'>
    <div className='col-md-6'>
      <div className='card m-1'>
      <div className='card-body'> 
      <SearchForm handleSearch={handleSearch} setQuery={setQuery} query={query}></SearchForm>
      </div>
      </div>
    <div className='card m-1'>
     
        <div className='card-body'>
          
            <table className='table'>
              <thead>
               <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>checked</th>
               </tr>
              </thead>
              <tbody>
                  {
                    state.products.map(e=>(
                      <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.price}</td>
                        <td>
                          <button onClick={()=>handleCheckProduct(e)} className='btn btn-outline-success'>
                            <FontAwesomeIcon icon={e.checked? faCheckCircle : faCircle}></FontAwesomeIcon>
                          </button>
                        </td>
                        <td>
                          <button onClick={()=>handleDeleteProduct(e)} className='btn btn-outline-danger'>
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                          </button>
                        </td>
                        <td>
                          <button onClick={()=>navigate(`/editProduct/${e.id}`)}
                          className='btn btn-outline-success'>
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                  </tbody>
            </table>
            <ul className='nav nav-pills'>
                  {(new Array(state.totalPages).fill(0)).map((v,index)=>{
                   return <li key={index+1}>
                    <button onClick={()=>handleGoToPage(index +1)}
                    className={(index+1)==state.currentPage?
                    'btn btn-info ms-1'
                    :'btn btn-outline-info ms-1'}>{index+1}</button>
                  </li>
                  }
                    
                  )}
                  
            </ul>
        </div>
    </div>
    </div>
</div>

    </div>  )
}

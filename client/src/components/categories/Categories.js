
import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {MDBDataTable} from 'mdbreact'
import {Button,Modal,Row,Col} from 'antd'
import {DeleteOutlined,EditOutlined ,PlusCircleOutlined} from '@ant-design/icons';
import { startGetCategory, startRemoveCategory } from '../../actions/categoryAction'
import {findCategory} from '../../selectors/categorySelector'
import Swal from 'sweetalert2'
function Categories(props){
    
      const [visible,setvisible]=useState(false)
      const [confirmLoading,setLoading]=useState(false)
      const [modalvalue,setvalue]=useState('')

     
      const showModal = (value) => {
        setvisible(true)
        setvalue(value)
      };
    
      const handleOk = () => {
       setLoading(true)
        
        setTimeout(() => {
          setvisible(false)
          setLoading(false)
        }, 500);
    }
      
    
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setvisible(false)
      };
        useEffect(()=>{
            if(props.categories.length==0){
                props.dispatch(startGetCategory())
            }
        },[])
        const handleRemove=(id)=>{
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    props.dispatch(startRemoveCategory(id))
                  swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                } else if (
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  )
                }
              })  
        }
        const findModal=modalvalue &&findCategory(props.categories,modalvalue&&modalvalue)
        const data = {
            columns: [
                {
                    label: 'Id',
                    field: 'id',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc',
                    width: 150
                },
               
               
                {
                    label: 'Action',
                    field: 'action',
                    
                },
               
                {
                    label: 'Remove',
                    field: 'remove',
                   
                },
                {
                    label:'Show',
                    field:'show'
                }
            ],
            rows: props.categories.map((ele,i) => {
                return {
                    id: ++i, 
                    title: ele.title,
                    action: <Button type='primary'><Link to={`/categories/edit/${ele._id}`}><EditOutlined /></Link></Button>, 
                    remove: <Button type='danger' onClick={()=>handleRemove(ele._id)}><DeleteOutlined /></Button>,
                    show:<Button type="primary" onClick={()=>showModal(ele._id)}>Show Category Details</Button>
                }
            })  
        }
    return (
        <div>
        <div className='container'>
            <div style={{padding:'40px 0 0'}}>
            <h1>Categories-{props.categories.length}</h1>
            <Link to='/categories/new'>AddCategories</Link>
           <div style={{marginTop:'20px'}}><MDBDataTable
                striped
                bordered
                hover
                data={data}
            /></div> 
            <Modal
                title="Title"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
               
                            <div className='container'>
                                <Row>
                                    <Col lg={12}><label>Title</label></Col>
                                    <Col lg={12}>{findModal?.title}</Col>
                                </Row>
                                <Row>
                                    <Col lg={12}><label>Description</label></Col>
                                    <Col lg={12}>{findModal?.description}</Col>
                                </Row>
                            </div>
            </Modal>
           
            </div>
        </div>
        </div>
    )
}
           /* <div className='container'>
                <h1>categories-{props.categories.length}</h1>
                <table border='1'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>show</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.categories.map((ele,i)=>{
                                return(
                                <tr key={ele._id}>
                                    <td>{++i}</td>
                                    <td>{ele.title}</td>
                                    <td>{ele.description}</td>
                                    <td><button><Link to={`/categories/edit/${ele._id}`}>edit</Link></button></td>
                                    <td><button onClick={()=>handleRemove(ele._id)}>remove</button></td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <Link to='/categories/new'>AddCategories</Link>
            </div>*/
        
    

    const mapStateToProps=(state)=>{
        return{
            categories:state.categories
        }
    }


export default connect(mapStateToProps)(Categories)
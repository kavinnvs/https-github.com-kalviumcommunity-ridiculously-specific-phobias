import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { AiOutlinePlusCircle } from 'react-icons/ai';

function Productform() {
const [name, setName] = useState('');
const [price, setPrice] = useState('');
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [stock, setStock] = useState('');
const [tags, setTags] = useState('');
const [email, setEmail] = useState('');

const [preview, setPreview] = useState([]);
const [image, setImage] = useState([]);

const handleImage = (e) => {
    const file = Array.from(e.target.files)
    setImage((pre)=>pre.concat(file))
    const img = file.map((file) => URL.createObjectURL(file))
    setPreview((pre) => pre.concat(img))
}

const handlesubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('stock', stock)
    formData.append('tags', tags)
    formData.append('email', email)
    image.forEach((img) => {
        formData.append('image', img)
    })

    console.log(formData)
    const res = await axios.post('http://localhost:5000/product', formData, {headers: {'content-type': 'multipart/form-data'}})

    if (res.status === 200) {
        setEmail('')
        setName('')
        setTags('')
        setCategory('')
        setStock('')
        setPrice('')
        setDescription('')
        setImage([])
        setPreview([])
    }
}


  return (
    <div>
        <form onSubmit={handlesubmit}>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required placeholder='Enter your email' />
            </div>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" onChange={(e)=>setName(e.target.value)} value={name} required placeholder='Enter your name' />
            </div>
            <div>
                <label htmlFor="">Tag</label>
                <input type="text" onChange={(e)=>setTags(e.target.value)} value={tags} required placeholder='Enter tag' />
            </div>
            <div>
                <label htmlFor="">Category</label>
                <input type="text" onChange={(e)=>setCategory(e.target.value)} value={category} required placeholder='Enter category' />    
            </div>
            <div>
                <label htmlFor="">Stock</label>
                <input type="number" onChange={(e)=>setStock(e.target.value)} value={stock} required placeholder='Enter stock' />
            </div>
            <div>
                <label htmlFor="">Price</label>
                <input type="number" onChange={(e)=>setPrice(e.target.value)} value={price} required placeholder='Enter price' />
            </div>
            <div>
                <label htmlFor="">Description</label>
                <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description} required placeholder='Enter description' />
            </div>
            <div>
                <label htmlFor="">Image</label>
                <input type="file" onChange={(e)=>handleImage(e)} required multiple id='upload' />
            </div>
            <div>
                <AiOutlinePlusCircle htmlFor="upload"/>
            </div>
            <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Button
            </button>
            </div>
            <div>
                {preview.map((img, index) => {
                    return <img src={img} key={index} alt='' />
                })}
            </div>
        </form>
    </div>
  )
}

export default Productform
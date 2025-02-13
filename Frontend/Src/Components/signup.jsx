import { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Avatar from 'react-avatar';
import axios from 'axios'
import { MdAccountCircle } from "react-icons/md";

export const Signup = () => {
  const [sign, setSign] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });

  const [visible, setVisible] = useState(false);
  const [agree,setAgree] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSign(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handlefilesubmit = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);

    if (file) {
      const filepath = URL.createObjectURL(file);
      setAvatar(file);
      console.log("File path:", filepath);
    } else {
      console.error("No file selected");
    }
  }

  const handlesubmit = async (e) => {
  
    e.preventDefault();
    if (!avatar) {
      console.error("No avatar file selected");
      return;
    }

    const formData = new FormData();

    formData.append('Name', sign.Name);
    formData.append('Email', sign.Email);
    formData.append('Password', sign.Password);
    formData.append('avatar', avatar);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    try {
      const response = await axios.post('http://localhost:3000/create-user', formData, config);
      console.log('User created:', response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign Up!
        </h1>
        <form className="space-y-6 bg-white p-6 rounded-lg shadow-lg" onSubmit={handlesubmit}>
          <div className="relative">
            <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="Name"
              value={sign.Name}
              onChange={handleChange}
              required
              className="bg-gray-200 block w-full rounded-md border-gray-300 px-4 py-2 mt-1 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 sm:text-sm"
            />
          </div>
          <div className="relative">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="Email"
              value={sign.Email}
              onChange={handleChange}
              required
              className="bg-gray-200 block w-full rounded-md border-gray-300 px-4 py-2 mt-1 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 sm:text-sm"
            />
          </div>
          <div className="relative">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={visible ? "text" : "password"}
              name="Password"
              value={sign.Password}
              onChange={handleChange}
              required
              className=" bg-gray-200 block w-full rounded-md border-gray-300 px-4 py-2 mt-1 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 sm:text-sm"
            />
            {visible ? (
              <AiOutlineEyeInvisible
                className="absolute top-8 right-3 text-gray-500 cursor-pointer"
                onClick={() => setVisible(false)}
                size={24}
              />
            ) : (
              <AiOutlineEye
                className="absolute top-8 right-3 text-gray-500 cursor-pointer"
                onClick={() => setVisible(true)}
                size={24}
              />
            )}
          </div>
          <div className="relative">
            <label htmlFor="ConfirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={visible ? "text" : "password"}
              name="ConfirmPassword"
              value={sign.ConfirmPassword}
              onChange={handleChange}
              required
              className="bg-gray-200 block w-full rounded-md border-gray-300 px-4 py-2 mt-1 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="avatar" className='block text-sm font-medium text-gray-700'></label>
            <div className='mt-2 flex items-center'>
              <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                {avatar?(<img src={URL.createObjectURL(avatar)}/>):(<MdAccountCircle className="h-8 w-8"/>)}
              </span>
              <label htmlFor="file-input" className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                <span>Upload your photo</span>
                <input type="file" name='avatar' id='file-input' accept='.jpg,.png,.jpeg' 
                onChange={(e)=>handlefilesubmit(e)}
                className='sr-only' />
              </label>
            </div>
          </div>

          <div>
            <input type="checkbox" value={agree} onChange={()=>setAgree(prev=>!prev)} />
            <label htmlFor="terms" className="text-sm text-gray-600">I agree to the terms and conditions</label>
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            Submit
          </button>
          <p>already a member? <a href="" style={{color: 'blue'}}>Log in</a></p>
        </form>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'


// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const schema = Yup.object().shape({
'fullName' : Yup
.string()
.required('Full name is required')
.trim()
.min(3 , validationErrors.fullNameTooShort)
.max(20 , validationErrors.fullNameTooLong),

'size' : Yup
.string()
.required('Size is required')
.oneOf(['S','M','L'], validationErrors.sizeIncorrect)
.trim(),

'toppings' : Yup
.array()
.of(Yup.string())

})

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]
const getInitialValues = () => ({
  fullName: '', 
  size: '', 
  toppings: []
})
const getInitialErrors = () =>({
  fullName:   '', 
  size: ''
})
export default function Form() {
  
  const [values, setValues] = useState(getInitialValues())
  const [enabled, setEnabled] = useState(false)
  const [errors, setErrors] = useState(getInitialErrors())
  const [serverSuccess, setServerSuccess] = useState()
  const [serverFailure, setServerFailure] = useState()
   // value = type === 'checkbox' ? checked : value
 const handleChange = (evt) => {
    const { name, value, checked, type } = evt.target;
    
      if (type === "checkbox") {
        setValues({
            ...values,
            toppings: checked
                ? [...values.toppings, value]
                : values.toppings.filter((topping) => topping !== value)})
      
        } else if (name === 'fullName' || name === 'size'){
          Yup.reach(schema, name)
          .validate(value)
          .then(() => {
              setErrors({ ...errors, [name]: "" });
             
            })
            .catch((err) => {
              
              setErrors({ ...errors, [name]: err.errors[0] });
            });
      
          setValues({
          ...values, [name] : value
        })
      
    } 
  }
  
    
    
  
 
  
 const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Sending out your order...', values)
    const newValues = {
      fullName: values.fullName,
      size: values.size,
      toppings: [false , false , false , false , false].filter(top => !!values.toppings[top])
    }
      formPost(newValues) 
  }

  const formPost = () =>{
    axios.post('http://localhost:9009/api/order', values)
    .then(res => {
      setValues(getInitialValues)
      setServerSuccess(res.data.message)
      setServerFailure()
    })
    .catch(err =>{
      setServerFailure(err.response.data.message)
      setServerSuccess()
    })
  } 
  
  useEffect(() => {
    schema.isValid(values).then(setEnabled)}, [values]);
 

  
  return (
    <form onSubmit= {handleSubmit}>
      <h2>Order Your Pizza</h2>
    
      {serverSuccess && <div className='success'>{serverSuccess}</div>} 
      {serverFailure && <div className='failure'>{serverFailure}</div>} 

      <div className="input-group">
        <div>
          <label htmlFor='fullName'>Full Name</label><br />
          <input   
            id= 'fullName'
            type="text"
            name='fullName'
            placeholder="Type Full Name"
            onChange={handleChange}
            value={values.fullName}/>
        </div>
        {errors.fullName && <div className='error'>{errors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select id="size" onChange={handleChange} value= {values.size} name= 'size'>
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            {/* Fill out the missing options */}
          </select>
        </div>
        {errors.size && <div className='error'>{errors.size}</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        {
        
        toppings.map(topping => <label key= {topping.topping_id}>
            <input
            name={topping.text}
            type="checkbox"
            value= {topping.topping_id}
            onChange={handleChange}
            checked= {values.toppings.includes(topping.topping_id)}
          />
          {topping.text}<br />

        </label>)
        }
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input disabled= {!enabled} type="submit"/>
    </form>
  )
}

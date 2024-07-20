import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const schema = Yup.object().shape({
fullName : Yup.string().required().min(3 , validationErrors.fullNameTooShort).max(20 , validationErrors.fullNameTooLong),
size : Yup.string().oneOf(['S','M','L'], validationErrors.sizeIncorrect).required(),
toppings: Yup.string().oneOf(['1','2','3','4','5'])
})

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]
export default function Form() {
  
  const [values, setValues] = useState({fullName: '', size: '', toppings: ''})
  const [enabled, setEnabled] = useState(false)
  const [errors, setErrors] = useState({fullName: '', size: '', toppings: ''}
)
  
  useEffect(() => {
    schema.isValid(values).then((isValid) => {
      setEnabled(isValid);
    });
  }, [values]);
 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Sending out your order...', values)

  }
  
  const handleChange = (evt) => {
    let { type, name, value } = evt.target;
    if (type === "checkbox") value = value;
    setValues({ ...values, [name]: value });
    Yup.reach(schema, name).validate(value).then(() => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((err) => {
        
        setErrors({ ...errors, [name]: err.errors[0] });
      });
  };
  return (
    <form onSubmit= {handleSubmit}>
      <h2>Order Your Pizza</h2>
      {true && <div className='success'>Thank you for your order!</div>}
      {true && <div className='failure'>Something went wrong</div>}
      

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input   
            type="text"
            name="fullName"
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
        {toppings.map(topping => <label key= {topping.topping_id}>
            <input
            name= 'toppings'
            type="checkbox"
            onChange={handleChange}
            value= {topping.topping_id}
          />
          {topping.text}<br />

        </label>)}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input disabled= {!enabled} type="submit"/>
    </form>
  )
}

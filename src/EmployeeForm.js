import React from 'react'

const EmployeeForm = (props) => {
    const {employee, index} = props
    return (
        <div className="employeeform"> 
            <div className="inputdiv row">
                <div className="col-md-4">
                    <label className="labels">Name <span style={{color: 'red'}}>*</span></label>
                </div>
                <div className="col-md-8">
                    <input type='text' name="name" placeholder='name' value={employee.name} onChange={e => props.handleEmployee(e, index)}></input>
                    {employee.errors.name && <p style={{color: 'red', marginBottom: '0'}}>Required</p>}
                </div>
            </div>
            <div className="inputdiv row">
            <div className="col-md-4">
            <label className="labels">Designation <span style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-md-8">
                <input type='text' name="designation" placeholder='designation' value={employee.designation} onChange={e => props.handleEmployee(e, index)}></input>
                {employee.errors.designation && <p style={{color: 'red', marginBottom: '0'}}>Required</p>}
            </div>
            </div>
            <div className="inputdiv row">
            <div className="col-md-4">
                <label className="labels">Contact Details<span style={{color: 'red'}}>*</span></label>
            </div>
            <div className="col-md-8">
                {employee.contacts.map((contact, contactIndex) => (
                    <React.Fragment key={contactIndex}>
                        <div className='row'>
                            <div className='col-md-4'>
                            <select name="contactType" value={contact.type} onChange={e => props.handleEmployee(e, index, contactIndex)} style={{marginRight: '20px', marginBottom: '5px', padding:'5px'}}>
                                <option value="">type</option>
                                <option value="primary">primary</option>
                                <option value='emergency'>emergency</option>
                            </select>
                            {employee.errors.contacts[contactIndex].type && <p style={{color: 'red', marginBottom: '0'}}>Required</p>}
                            </div>
                            <div className='col-md-6' style={{padding: '0'}}>
                                <input type='text' name="contactPhone" placeholder='phone number' onChange={e => props.handleEmployee(e, index, contactIndex)} value={contact.phone}></input>
                                {employee.contacts.length > 1 && <i style={{padding: '5px 10px', marginLeft: '5px'}} onClick={(e) => props.deleteContactOrSkill(e,index, contactIndex, 'contact')} className="fa fa-trash" aria-hidden="true"></i>}
                                {employee.errors.contacts[contactIndex].numberReq && <p style={{color: 'red', marginBottom: '0'}}>Required</p>}
                                {!employee.errors.contacts[contactIndex].numberReq && employee.errors.contacts[contactIndex].phone === 'empty' && <p style={{color: 'red', marginBottom: '0'}}>Required</p>}
                                {employee.errors.contacts[contactIndex].phone === 'invalid' && <p style={{color: 'red', marginBottom: '0'}}>phone should be number type</p>}
                                {employee.errors.contacts[contactIndex].phone === 'invalidLength' && <p style={{color: 'red', marginBottom: '0'}}>phone length should be 10</p>}
                            </div>
                            {employee.contacts.length < 4 && contactIndex === employee.contacts.length-1 && <button className='btn' style={{padding: '5px 10px', marginLeft: '5px'}} onClick={(e) => props.addContactOrSkill(e,index, 'contact')}>add</button>}              
                        </div>                      
                    </React.Fragment>
                ))}
                </div>
            </div>
            <div className="inputdiv row">
                <div className="col-md-4">
                    <label className="labels">Skills</label>
                </div>
                <div className="col-md-8">
                    {employee.skills.map((skill, skillIndex) => (
                        <div className='col-md-4' key={skillIndex} style={{paddingLeft: '0'}}>
                            <input type='text' name="skills" placeholder='skills' value={skill} style={{width: '80%', marginBottom:'5px'}} onChange={e => props.handleEmployee(e, index, skillIndex)}></input>
                            {skill !== ""  && <i style={{marginLeft:'5px', cursor:'pointer'}} onClick={(e) => props.deleteContactOrSkill(e,index, skillIndex, 'skill')} className="fa fa-trash" aria-hidden="true"></i>}
                        </div>
                    ))}
                <button className='btn' style={{padding: '5px 10px'}} onClick={(e) => props.addContactOrSkill(e,index, 'skill')}>add</button>             
                </div>
            </div>
            <div className="inputdiv row">
            <div className="col-md-4">
                <label className="labels">Date of birth</label>
            </div>
            <div className="col-md-8">
                <input type='date' name="dob" value={employee.dob} onChange={e => props.handleEmployee(e, index)}></input>
            </div>
            </div>
        </div>
    )
}

export default EmployeeForm

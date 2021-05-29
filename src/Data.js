import React from 'react'

const Data = (props) => {
    const {employee} = props
    return (
        <div style={{marginBottom: '40px'}}>
           <p>Employee #{props.index+1}</p>
           <div className="row">
                <div className="col-md-4">
                    <label className="labels">Name: </label>
                </div>
                <div className="col-md-8">
                    {employee.name}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <label className="labels">Designation: </label>
                </div>
                <div className="col-md-8">
                    {employee.designation}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <label className="labels">Contact: </label>
                </div>
                <div className="col-md-8">
                    {employee.contacts.map((contact,i) => (
                     contact.type !== '' && contact.phone !== '' &&  <p style={{marginBottom: '0'}} key={i}>{contact.type}-{contact.phone}</p>
                    ))}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <label className="labels">Skills: </label>
                </div>
                <div className="col-md-8">
                    {employee.skills.join()}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <label className="labels">Date of birth: </label>
                </div>
                <div className="col-md-8">
                    {employee.dob}
                </div>
            </div>
        </div>
    )
}

export default Data

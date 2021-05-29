import React, {useState} from 'react'
import Data from './Data'
import EmployeeForm from './EmployeeForm'

const Form = () => {
    const [employees, setEmployees] = useState([{
        name: "",
        designation: "",
        contacts: [{type: '', phone: ''}],
        skills: [""],
        dob:'',
        errors: {
            name: false,
            designation:false,
            contacts: [{type: false, phone: '', numberReq: false}]
        }
    }])
    const [showData, setShowData] = useState(false)

    const addEmployee = () => {
        let currentEmployees = [...employees]
        currentEmployees.push({ name: "",
        designation: "",
        contacts: [{type: '', phone: ''}],
        skills: [""],
        dob:'',
        errors: {
            name: false,
            designation: false,
            contacts: [{type: false, phone: '', numberReq: false}],
        }})
        setEmployees(currentEmployees)
    }

    const removeEmployee = (index) => {
        let currentEmployees = [...employees]
        currentEmployees.splice(index, 1)
        setEmployees(currentEmployees)
    }

    const handleEmployee = (e, index, childIndex) => {
        let currentEmployees = [...employees]
        const {name, value} = e.target
        if(['contactType', 'contactPhone'].includes(e.target.name)){
            currentEmployees[index]['contacts'][childIndex][e.target.name === 'contactType'? 'type': 'phone'] = e.target.value
            currentEmployees[index]['errors']['contacts'][childIndex]['numberReq'] = (currentEmployees[index]['contacts'][childIndex]['type'] !== '') && currentEmployees[index]['contacts'][childIndex]['phone'] === '' && currentEmployees[index]['errors']['contacts'][childIndex]['phone'] === '' ? true : false;
            if(childIndex !== 0){
                if( currentEmployees[index]['contacts'][childIndex]['type'] === ''){
                    currentEmployees[index]['errors']['contacts'][childIndex]['type'] = currentEmployees[index]['contacts'][childIndex]['phone'] ==='' ? false : true
                    currentEmployees[index]['errors']['contacts'][childIndex]['phone'] = currentEmployees[index]['contacts'][childIndex]['phone'] !==''  && currentEmployees[index]['contacts'][childIndex]['phone'].match(/^[A-Za-z]+$/)? 'invalid' : currentEmployees[index]['contacts'][childIndex]['phone'] !=='' && currentEmployees[index]['contacts'][childIndex]['phone'].length !== 10? 'invalidLength' : ''
                }
                else{
                    currentEmployees[index]['errors']['contacts'][childIndex]['type'] = false;
                    currentEmployees[index]['errors']['contacts'][childIndex]['phone'] = 
                    currentEmployees[index]['contacts'][childIndex]['type'] !== '' && !currentEmployees[index]['contacts'][childIndex]['phone'].match('^[0-9]*$') ?  'invalid' 
                        : currentEmployees[index]['contacts'][childIndex]['type'] !== '' && currentEmployees[index]['contacts'][childIndex]['phone'] === ''? 'empty' 
                        : currentEmployees[index]['contacts'][childIndex]['phone'] !=='' && currentEmployees[index]['contacts'][childIndex]['phone'].length !== 10? 'invalidLength' 
                        : ''
                }
            }
            else{
                currentEmployees[index]['errors']['contacts'][0]['type'] = currentEmployees[index]['contacts'][0]['type'] === ''? true : false; 
                currentEmployees[index]['errors']['contacts'][0]['numberReq'] = !currentEmployees[index]['errors']['contacts'][0]['type'] && currentEmployees[index]['contacts'][0]['phone'] === ''? true : false; 
                currentEmployees[index]['errors']['contacts'][0]['phone'] = 
                !currentEmployees[index]['contacts'][0]['phone'].match('^[0-9]*$') ?  'invalid' : 
                currentEmployees[index]['contacts'][childIndex]['phone'] === ''? 'empty' 
                : currentEmployees[index]['contacts'][childIndex]['phone'] !=='' && currentEmployees[index]['contacts'][childIndex]['phone'].length !== 10? 'invalidLength' 
                : ''
            }
        } 
        else if(e.target.name === 'skills'){
            currentEmployees[index]['skills'][childIndex] = e.target.value
        }
        else{
            if(['name', 'designation'].includes(name)){
                currentEmployees[index]['errors'][name] = value === '' ? true : false
            }
            currentEmployees[index][e.target.name] = e.target.value
        }
        setEmployees(currentEmployees)
    }

    const addContactOrSkill = (e,index, type) => {
        e.preventDefault()
        let currentEmployees = [...employees]
        if(type === 'skill'){
            currentEmployees[index]['skills'].push("")
        }
        if(type === 'contact'){
            currentEmployees[index]['contacts'].push({type: '', phone: ''})
            currentEmployees[index]['errors']['contacts'].push({type: false, phone: '', numberReq: false})
        }
        setEmployees(currentEmployees)
    }

    const deleteContactOrSkill = (e, index, childIndex, type) => {
        e.preventDefault()
        let currentEmployees = [...employees]
        if(type === 'contact'){
            currentEmployees[index]['contacts'].splice(childIndex, 1)
        }
        if(type === 'skill'){
            if(childIndex === 0 && currentEmployees[index]['skills'].length === 1){
                currentEmployees[index]['skills'][0] = ""
            }
            else{
                currentEmployees[index]['skills'].splice(childIndex, 1)
            }
        }
        setEmployees(currentEmployees)
    }

    const isDataInvalid = () => {
        let currentEmployees = [...employees]
        let flag = false
        for(let i=0 ; i< currentEmployees.length; i++){
            if(currentEmployees[i].name === ''){
                currentEmployees[i].errors.name = true
                flag = true
            }
            if (currentEmployees[i].designation === ''){
                currentEmployees[i].errors.designation = true
                flag = true
            }
            for(let index=0; index < currentEmployees[i]?.contacts.length; index++){
                let contact = currentEmployees[i].contacts[index]
                if(index === 0 && contact.type === ''){
                    currentEmployees[i]['errors']['contacts'][index]['type'] = true
                    flag = true
                }
                else if(index === 0 && contact.phone === ''){
                    currentEmployees[i]['errors']['contacts'][index]['phone'] = 'empty'
                    flag = true
                }
                else if(index !== 0 && contact.type !=='' && contact.phone === ''){
                    currentEmployees[i]['errors']['contacts'][index]['phone'] = 'empty'
                    flag = true
                }
            }
        }
        setEmployees(currentEmployees)
        return flag
    }

    const downloadFile = async(e) => {
        e.preventDefault()
        let allEmployees = JSON.parse(JSON.stringify(employees))
        allEmployees[0]['name'] = 'ayush'
        for(let i=0; i<allEmployees.length; i++){
            delete allEmployees[i]['errors']
            if(allEmployees[i]['skills'][0] === '') allEmployees[i]['skills'] = []
        }
        const fileName = "dynamic";
        const json = JSON.stringify(allEmployees);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      const handleView = () => {
          if(isDataInvalid()){
              alert('Please fill all mendatory fields')
              return
          }
          else{
              setShowData(!showData)
          }
      }

    return (
        <div>
            {employees.map((employee, index) => (
                <React.Fragment key={index}>
                    <EmployeeForm employee={employee} index={index} handleEmployee={handleEmployee} addContactOrSkill={addContactOrSkill} deleteContactOrSkill={deleteContactOrSkill}/>
                    {employees.length > 1 && <button className='btn' style={{display: 'block', marginBottom: '10px'}}  onClick={() => removeEmployee(index)}>Remove</button>}
                </React.Fragment>
            ))}
            <button className="btn" style={{display: 'block'}} onClick={addEmployee}>Add employee</button>
            <button className="btn" style={{display: 'block', marginTop: '10px'}} onClick={() => handleView()}>View Data</button>
            
            {showData && 
            <>
            <div className="employeeform"> 
                {employees.map((employee, index) => (
                    <Data employee={employee} key={index} index={index}/>
                ))} 
            </div>
             <button
                className="btn"
                style={{display: 'block', marginTop: '10px', marginBottom:'20px'}} 
                onClick={(e) => downloadFile(e)}
            >
                Download Json
            </button>
       </>
       }
           
        </div>
    )
}

export default Form

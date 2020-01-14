import React , {useContext,useEffect,useRef} from 'react'
import ContactContext from '../../context/contact/ContactContext'

const ContactFilter = () => {

    const contactcontext = useContext(ContactContext)
    const {filterContacts,filtered,clearFilter} = contactcontext ; 


    const text = useRef('');

    useEffect(() => {
        if(filtered === null){
            text.current.value = ''
        }  
      })


    const onChange = (e) =>{
        if(text.current.value !== ''){
            filterContacts(e.target.value);
        } else{
           clearFilter()
        }
    }

    return (
        <form>
            <input type="text" ref={text} placeholder="Filter Contacts..." onChange={onChange}/>
        </form>
    )
}

export default ContactFilter

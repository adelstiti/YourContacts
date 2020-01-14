import React,{useReducer} from 'react';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import axios from "axios";
import {
    ADD_CONTACT,DELETE_CONTACT,SET_CURRENT,CLEAR_CURRENT,UPDATE_CONTACT,FILTER_CONTACTS,CLEAR_FILTER,CONTACT_ERROR,
    GET_CONTACTS,CLEAR_CONTACTS
} from '../types';


const ContactState = props => {
    const initialState = {
        contacts : null,
        current : null,
        filtered : null,
        error : null
    };

    const  [state,dispatch] = useReducer(ContactReducer,initialState);

    // Get Contacts
    const getContacts = async () => {
        try {
         const res = await axios.get('/api/contacts');
         dispatch({
             type : GET_CONTACTS,
             payload : res.data
         });
     } catch (err) {
         dispatch({
             type : CONTACT_ERROR,
             payload : err.response.data.msg
         });
     }
    }

    // Add Contact
   const addContact = async contact => {
       const config = {
        headers : {
            'Content-type' : 'application/json'
             }
        };

       try {
        const res = await axios.post('/api/contacts', contact, config);
        dispatch({
            type : ADD_CONTACT,
            payload : res.data
        });

    } catch (err) {
        dispatch({
            type : CONTACT_ERROR,
            payload : err.response.data.msg
        });
    }

}
    
    // Delete Contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            
            dispatch({
                type : DELETE_CONTACT,
                payload : id
            });
    
        } catch (err) {
            dispatch({
                type : CONTACT_ERROR,
                payload : err.response.data.msg
            });
        }
    }
    
    // Set Current Contact
    const setCurrent = contact => {
        dispatch({type:SET_CURRENT ,payload:contact});
    }
    // CLEAR Current Contact
    const clearCurrent = () => {
        dispatch({type:CLEAR_CURRENT});
    }

    //Update Contact
    const updateContact = async contact => {
        const config = {
            headers : {
                'Content-type' : 'application/json'
                 }
            };
    
           try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
            dispatch({
                type : UPDATE_CONTACT,
                payload : res.data
            });
    
        } catch (err) {
            dispatch({
                type : CONTACT_ERROR,
                payload : err.response.msg
            });
        }
    }
    
    //Filter Contacts
    const filterContacts = text => {
        dispatch({type:FILTER_CONTACTS ,payload:text});
    }

    // CLEAR Filter
    const clearFilter= () => {
        dispatch({type:CLEAR_FILTER});
    }

    // CLEAR Contacts
    const clearContacts = () => {
        dispatch({type:CLEAR_CONTACTS});
    }

    return (<ContactContext.Provider 
                value={{ contacts : state.contacts,
                        error : state.error,
                        current : state.current,
                        deleteContact,
                        addContact,
                        setCurrent,
                        clearCurrent,
                        updateContact,
                        filtered : state.filtered,
                        filterContacts,
                        clearFilter,
                        getContacts,
                        clearContacts}}> 
            {props.children}
        </ContactContext.Provider>)
}



export default ContactState;



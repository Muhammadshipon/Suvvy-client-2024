import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {  useEffect, useState } from "react";
import axios from "axios";

import Swal from "sweetalert2";
import { ScrollRestoration, useNavigate } from "react-router-dom";

import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useLoggedUser from "../hooks/useLoggedUser";



const CheckoutForm = () => {
  const axiosPublic = useAxiosPublic();
  const [loggedUser] = useLoggedUser();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error,setError] = useState('');
  const [clientSecret,setClientSecret] = useState('');
  const [transactionId,setTransactionId] = useState('');
  const {user} = useAuth();

  const {data:taka={},isSuccess} = useQuery({
    queryKey:['taka'],
    enabled:!!user?.email,
    queryFn: async()=>{
      const {data} = await axiosPublic.get(`/payment?email=${user?.email}`);
      return data; 
    }
  })
  console.log(taka);

  useEffect(()=>{
    if(isSuccess){
     axiosPublic.post('/create-payment-intent',{price:taka.amount})
     .then(res=>{
       console.log(res.data.clientSecret);
       setClientSecret(res.data.clientSecret);
     })
    }
   },[axiosPublic,taka])

   console.log(clientSecret);
  const handleSubmit= async(e)=>{
    e.preventDefault();

    if (!stripe || !elements) {
     
      return;
    }

  
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // payment method 
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('stripe error is ', error);
      setError(error);
    } else {
      console.log('PaymentMethod is', paymentMethod);
      setError('');
    }



    const {paymentIntent, error:confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName||'anonymous',
            email: user?.email||'anonymous'
          },
        },
      },
    );
    if(confirmError){
      console.log(confirmError);
    }
    else{
      console.log('paymentIntent',paymentIntent);
      if(paymentIntent.status ==='succeeded'){
        console.log(paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const paymentInf = {
           
            transactionId: paymentIntent.id,
            date: new Date(),
           

        }
        const {data} = await axiosPublic.patch(`/payment/${taka._id}`,paymentInf)
        console.log('payment save database ',data);

         if(data.modifiedCount>0){

          if(taka?.amount==500||taka?.amount==1000){

            const {data} = await axiosPublic.patch(`/pro-user/${loggedUser?._id}`,{role:'surveyor'})
            console.log(data);

            if(data.modifiedCount>0){
               Swal.fire({
              title: "Payment successfully",
              
              icon: "success"
            });
            navigate(`/`)
            }
          }
            else{
              const {data} = await axiosPublic.patch(`/pro-user/${loggedUser?._id}`,{role:'prouser'})
          console.log(data);
          if(data.modifiedCount>0){
             Swal.fire({
            title: "Payment successfully",
            
            icon: "success"
          });
          navigate(`/`)
          }
            }
          
         }
       
      }
    }
  }
  return (
    <div className="md:mx-24 my-14  text-center">
      <ScrollRestoration></ScrollRestoration>
    <form onSubmit={handleSubmit}>
   <CardElement
   className="bg-gray-100 px-10 py-5 rounded-xl w-full md:w-1/2  mx-auto"
     options={{
       style: {
        
         base: {
          
          
           fontSize: '16px',
          
        
           color: '#424770',
           
           '::placeholder': {
             color: '#aab7c4',
           },
         },
         invalid: {
           color: '#9e2146',
         },
       },
     }}
   />
   <button  disabled={!stripe ||!clientSecret} className="btn bg-cyan-600 text-white font-bold px-20 pb-1 my-10 text-3xl" type="submit" >
     Pay
   </button>
   <p className="text-red-600 mb-10 ">{error.message}</p>
 </form>
 </div>
  );
};

export default CheckoutForm;
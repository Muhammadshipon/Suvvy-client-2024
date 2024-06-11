import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Components/CheckoutForm";



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
const Payment = () => {
  
  return (
    <div className="py-28">
    
      <Elements  stripe={stripePromise}>
      <CheckoutForm></CheckoutForm>
    </Elements>
    </div>
  );
};

export default Payment;
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCurrentOrder } from "../order/orderSlice";
import { Grid } from "react-loader-spinner";

const PUBLISHABLE_KEY =
  "pk_test_51Og7VzSCE2iN9w48Us35i8dsk6m8rumBlc5ZsRP3Wp1d8YsIXf1vWRwOdk6SAlWkDZ8D2YStlfujVExmpUHERcCJ00FOEjk9aH";

function StripeCheckout() {
  const currentOrder = useSelector(selectCurrentOrder);

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(PUBLISHABLE_KEY);

      const session = await axios.post(
        "http://localhost:8000/stripe/create-session",
        currentOrder,
        {
          withCredentials: true,
        }
      );

      console.log(session.data.data);
      console.log(session.data.data.id);

      const result = stripe.redirectToCheckout({
        sessionId: session.data.data.id,
      });

      if (result.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    makePayment();
  }, []);
  return (
    <>
      <Grid
        height="80"
        width="80"
        color="rgb(79, 70, 229) "
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
}

export default StripeCheckout;

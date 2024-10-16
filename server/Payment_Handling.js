"use server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
let instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
async function InitiatePayment(PaymentAmount) {
  let Initialization = await instance.orders.create({
    amount: parseInt(PaymentAmount) * 100,
    currency: "INR",
  });
  return Initialization;
}

async function PaymentInitiate(PaymentAmount) {
  try {
    let Initialization = await InitiatePayment(PaymentAmount);
    return Initialization;
  } catch (error) {
    return { Error: "Internal Server Error" };
  }
}
async function ValidatePayment(PID, OID, SIG) {
  try {
    const Validation = validatePaymentVerification(
      { order_id: OID, payment_id: PID },
      SIG,
      process.env.RAZORPAY_SECRET
    );
    console.log(Validation);
    return { Validation };
  } catch (error) {
    return { Error: "Payment Validation Error" };
  }
}

async function SavePayment(
  email,
  OID,
  PaymentAmount,
  PaymentMessage,
  PaymentPerson
) {
  try {
    let SavePayment = new Payment({
      email,
      OID,
      PaymentAmount,
      PaymentMessage,
      PaymentPerson,
    });
    SavePayment = await SavePayment.save();
    return JSON.parse(JSON.stringify(SavePayment));
  } catch (error) {
    return {
      Error: "Internal Server Error",
    };
  }
}

async function GetPayments(email) {
  try {
    let Payments = await Payment.find({
      email,
    });
    return JSON.parse(JSON.stringify(Payments));
  } catch (error) {
    return {
      Error: "Internal Server Error",
    };
  }
}

export { PaymentInitiate, ValidatePayment, SavePayment, GetPayments };

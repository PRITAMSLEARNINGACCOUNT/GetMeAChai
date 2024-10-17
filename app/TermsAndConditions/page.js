import Head from "next/head";

const page = () => {
  return (
    <div className="md:h-[90vh] md:p-20 p-3">
      <Head>
        <title>GetMeAChai - Terms And Conditions</title>
      </Head>
      <div className=" h-full border-blue-800 border rounded-lg backdrop-blur-md md:p-10 p-5">
        <h1 className="text-3xl font-bold text-center">Terms And Condition</h1>
        <div className="text-lg my-5">
          <h2 className="text-center font-bold text-2xl">Service Fee</h2>
          <p className="text-center text-xl my-3">
            {" "}
            A platform fee of 10% will be applied to every payment processed
            through our platform. This fee is calculated based on the total
            payment amount and is retained by GetMeAChai for the maintenance and
            operation of the platform.
          </p>
          <h2 className="text-center font-bold text-2xl">Payment Processing</h2>
          <p className="text-center text-xl my-3">
            The platform fee will be deducted before the payment is credited to
            the payee. Payments made through the platform will be credited to
            the payee&apos;s account within 10 working days following the
            transaction.
          </p>
          <h2 className="text-center font-bold text-2xl"> Delays</h2>
          <p className="text-center text-xl my-3">
            While we strive to ensure timely processing, there may be delays due
            to factors beyond our control, such as bank processing times or
            technical issues.
          </p>
          <h2 className="text-center font-bold text-2xl">Refunds</h2>
          <p className="text-center  text-xl my-3">
            Wrong UPI Address: In the event that a payment is made to an
            incorrect UPI address, GetMeAChai will initiate a refund for the
            transaction. The refund process will be completed within 10 working
            days from the date we confirm the incorrect payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;

import { toast } from "sonner";


export const verifyPayment = async (reference) => {

    const result = await window.axios.post(route("advert.verify"), {
        reference,
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    if(result.data.success) {
        toast.success("Payment made successfully");
        return true;
    }
    else {
       toast.error("Payment verification failed. If your payment has been deducted, please contact Myadmo support for assistance.")
       return false;
    }

}

export const paymentProps = ({user, cost, currency, onSuccess = verifyPayment, onClose = () => toast.error("Payment unsuccessful. Please click the 'Pay' button and try again.")}) => {
    return {

        email: user.email,
    
        amount: cost * 100,
    
        currency: currency ?? "GHS",
    
        metadata: {
    
          name: user.first_name + " " + user.last_name ,
    
          phone: user.contact,
    
        },
    
        publicKey: "pk_test_9c36a8f1629bab4339b8fced7c3f999d4456e5ac",
    
        text: "Make Payment",
    
        onSuccess,
    
        onClose,
    
    }
}
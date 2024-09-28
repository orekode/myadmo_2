import { Toaster, toast } from 'sonner';

const RootLayout = ({ children, ...props}) => {
  return (
    <div {...props}>
        <Toaster richColors closeButton position="top-center"/>
        {children}
    </div>
  )
}

export default RootLayout
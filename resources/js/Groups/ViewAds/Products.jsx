import { Btn, Scroller } from '@/Components';
import { ShoppingCart } from 'lucide-react';


const Products = ({ }) => {
    return (
        <div className=" p-3 mt-3">
            <div className="font-semibold flex gap-1.5 mb-2">
                <ShoppingCart size={20} />
                Products
            </div>
            <div className="products">
                <Scroller>
                    {Array.from({length: 10}, (item, index) => 
                        <div className="product h-[150px] w-[110px] rounded-lg bg-gray-50 overflow-hidden relative">
                            <img src="/images/bag.png" alt="product" className='h-full w-full object-contain' />
                            <div className="absolute bottom-0 left-0 w-full p-1.5 scale-75">
                                <Btn.Xs extra={'w-full text-center'}>
                                    <span className='text-xs font-black'>Buy Now</span>
                                    {/* <ShoppingCart size={15} strokeWidth={3}/> */}
                                </Btn.Xs>
                            </div>
                        </div>
                    )}
                </Scroller>
            </div>
        </div>
    );
}

export default Products;
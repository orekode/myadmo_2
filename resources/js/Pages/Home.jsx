
import { Btn, Nav } from '@/Components'
import { useEffect, useState, useRef } from 'react'

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomPositions = (numDots, parentWidth, parentHeight) => {
    const positions = [];
    const minDistance = 50; // Minimum distance between dots

    for (let i = 0; i < numDots; i++) {
        let validPosition = false;
        let x, y, size;

        while (!validPosition) {
            size = getRandomInt(95, 120); //Random size between 95px and 110px
            x = getRandomInt(size, parentWidth - size);
            y = getRandomInt(size, parentHeight - size);

            validPosition = positions.every(pos => {
                const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
                return distance >= minDistance;
            });
        }

        positions.push({ x, y, size });
    }

    return positions;
};

const DotsOverlay = ({ numDots = 10 }) => {
    const [positions, setPositions] = useState([]);
    const parentRef = useRef(null);

    useEffect(() => {
        if (parentRef.current) {
            const parentWidth = parentRef.current.offsetWidth;
            const parentHeight = parentRef.current.offsetHeight;
            const newPositions = getRandomPositions(numDots, parentWidth, parentHeight);
            setPositions(newPositions);
        }
    }, [numDots]);

    return (
        <div ref={parentRef} className="absolute top-0 left-0 h-full w-full">
            <div className={` absolute -top-[15vh] -left-[13vw] h-[59vh] w-[57vw]`}>
                <img src={`/images/Assets/guard.png`} alt="" className="object-contain h-full w-full" />
            </div>

            <div className={` absolute top-[8vh] right-[3vw] h-[12vh] w-[12vw]`}>
                <img src={`/images/Assets/facebook.png`} alt="" className="object-contain" />
            </div>

            <div className={` absolute bottom-[27vh] left-[13vw] h-[12vh] w-[12vw]`}>
                <img src={`/images/Assets/youtube.png`} alt="" className="object-contain" />
            </div>

            <div className={`absolute bottom-[27vh] right-[8vw]  h-[19vh] w-[27vw]`}>
                <img src={`/images/Assets/sphere.png`} alt="" className="object-contain" />
            </div>
        </div>
    );
};

const Home = () => {
    const cards = [
        {
            title: "It's Free",
            content: "Get started. Sign up for myAdmo app and chrome extension today.",
            imgSrc: "/images/Assets/platonic.png",
        },
        {
            title: "Browse Securely",
            content: "Get into the money zone, Choose to block all trackers and ads with myAdmo app and extension.",
            imgSrc: "/images/Assets/sphere.png",
        },
        {
            title: "Earn Points",
            content: "Buy items from myAdmo Marketplace or convert points to cash in your wallet.",
            imgSrc: "/images/Assets/tubes.png",
        },
        {
            title: "Advertise Products",
            content: "With MyAdmo you can Sign up to advertise and sell your products starting from GHS 1.00.",
            imgSrc: "/images/Assets/blob.png",
        },
    ];

    return (
        <div>
            <Nav />

            <header className="relative bg-blue-50 bg-opacity-30 z-0">
                <div className=" relative z-10  bg-opacity-80 content-spacing">
                    <div className="left h-[500px] flex flex-col items-center justify-center max-w-[800px] mx-auto text-center">
                        <div className="short-text"></div>
                        <div className="large-text text-5xl font-bold capitalize leading-tight ">
                            stop all trackers and ads and <span className="text-blue-600">earn more from</span> your <span className="text-blue-600">browsing</span>
                        </div>
                        <p className="max-w-[480px] mx-auto text-sm my-3">
                            Everyone is earning from your data. Stop all trackers and ads and begin to make more with MyAdmo. Begin your journey with us and do more with your earned points.
                        </p>

                        <Btn.Md extra={'mx-auto'}>Download Myadmo</Btn.Md>
                    </div>
                </div>

                <div className="absolute z-0 top-0 left-0 h-full w-full opacity-10">
                    <img src="/images/pattern.jpg" className='h-full w-full object-cover' />
                </div>

                <DotsOverlay />


            </header>

            <div className="relative  ">
                <div className="relative z-10 h-[500px] w-[700px] mx-auto bg-white overflow-hidden rounded-3xl -mt-24">
                    <img src="/images/dashboard.png" className="h-full w-full object-cover" />
                </div>
                {/* <div className="wave absolute top-0 left-0 h-full w-full from-transparent to-blue-600  bg-gradient-to-b"></div> */}
            </div>

            <div className="h-24"></div>

            <div className="min-h-[250px]">
                <div className="grid grid-cols-12 gap-3 content-spacing">
                    {cards.map( ({title, imgSrc, content}) => 
                        <div className="col-span-3  bg-blue-50 p-6 rounded-2xl">
                            <div className="top flex items-center justify-between relative">
                                <div className="font-bold text-2xl text-blue-700">{title}</div>
                                <div className="image h-[100px] w-[100px] absolute -top-20 -right-8">
                                    <img src={imgSrc} alt="" className="object-contain h-full w-full" />
                                </div>
                            </div>
                            <p className="content my-1.5 opacity-80">{content}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className=" my-24 content-spacing">
                <div className="grid grid-cols-2 bg-gray-50 min-h-[400px] rounded-3xl">
                    <div className="left h-[600px] w-[600px] relative -my-64">
                        <img src="/images/user.png" className="h-full w-full object-contain relative z-10" />
                        <div className="bg-blue-200 rounded-3xl absolute w-[70%] h-[300px] bottom-0 left-1/2 transform -translate-x-1/2 z-0"></div>
                    </div>
                    <div className="right flex flex-col justify-center">
                        <div className="font-bold text-6xl">
                        <span className="text-blue-600">Earn</span> points <span className="text-blue-600">daily</span> when you view ads
                        </div>
                        <p className="my-3">
                        Discover a revolutionary browsing experience that rewards you for doing what you love - surfing the web! Earn points daily just for viewing ads, and redeem them for the things you want from our exclusive marketplace.
                        </p>

                        <Btn.Md extra={'w-[180px]'}>Get Started</Btn.Md>

                    </div>
                </div>
            </div>

            <div className=" content-spacing ">
                <div className="grid grid-cols-2">
                    <div className="left flex flex-col justify-center">
                        <div className="font-bold text-6xl">
                            <span className="text-blue-600">Earn</span> points <span className="text-blue-600">daily</span> when you view ads
                        </div>
                        <p className="my-3">
                            Begin advertisement with as little as GHS 1.00. Connect with over 100,000 buyers and marketers. Buy, advertise, and sell products. Experience business growth with myAdmo.
                        </p>
                        <p className="my-3">
                            We focus on user experience and promote advertising from a business point of view. We are giving users the chance to experience internet surfing like never before.
                        </p>
                        <Btn.Md extra={'w-[180px]'}>Get Started</Btn.Md>
                    </div>
                    <div className="right"></div>
                </div>
            </div>

        </div>
    )
}

export default Home
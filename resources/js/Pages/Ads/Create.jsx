import { useState } from 'react'

import Choose       from "@/Pages/Profile/Choose";
import Upload       from '@/Groups/Ads/Upload';
import Ratio        from '@/Groups/Ads/Ratio';
import AdMeta       from '@/Groups/Ads/AdMeta';
import Target       from '@/Groups/Ads/Target';
import MakePayment  from '@/Groups/Ads/MakePayment';


const Create = ({ profiles }) => {

    const [ profile, setProfile ] = useState();
    const [ advert,  setAdvert  ] = useState();
    const [ adMeta,  setAdMeta  ] = useState();
    const [ ratio,   setRatio   ] = useState();
    const [ tab,     setTab     ] = useState("");
    const [ target,  setTarget  ] = useState();

    if(tab == "") 
        return <Choose 
                    profiles={profiles} 
                    callback={(profile) => {
                        setProfile(profile);
                        setTab("advert");
                    }}
                />;

    if(tab == "advert")
        return <Upload 
                    back={() => setTab("")} 
                    callback={({ url, file }) => {
                        setAdvert(file);
                        setTab("ratio");
                    }} 
                    next={advert ? () => setTab("ratio") : null}
                />;

    if(tab == "ratio") 
        return <Ratio 
                    image={advert}
                    back={() => setTab("advert")} 
                    next={() => setTab("info")} 
                    callback={(ratio) => {
                        setRatio(ratio);
                        setTab("info");
                    }} 
                />

    if(tab == "info")
        return <AdMeta 
                    meta={adMeta}
                    back={() => setTab("ratio")}
                    next={() => setTab("target")}
                    callback={(meta) => {
                        setAdMeta(meta)
                    }}
                />

    if(tab == "target")
        return <Target
                    target={target}
                    back={() => setTab("info")}
                    callback={(target) => {
                        setTarget(target);
                        setTab("payment")

                    }}
                />
    
    if(tab == "payment")
        return <MakePayment 
                    advert={{...profile, profileId: profile.id, file: advert, ...adMeta, ratio, ...target, startAge: target.age_group[0], endAge: target.age_group[1]}}
                    back={() => setTab("target")}
                    next={() => setTab("proccessing")}
                    callback={(target) => {
                        setTarget(target);
                        console.log(target);
                    }}
                />

    return (
        <div className='p-12'>
            <div className="w-[500px] border rounded-xl mx-auto">
                I am here
            </div>
        </div>
    );
}

export default Create
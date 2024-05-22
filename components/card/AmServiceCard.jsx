import React, {useEffect, useState} from "react";
import TextInputAmService from "@/components/amservice/TextInputAmService";
import GetButton from "@/components/amservice/GetButtonAmService";
import Image from "next/image";

const imageList = [
    '/images/image1.jpeg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpeg',
    '/images/image5.jpeg',
    '/images/image6.jpeg'
];

function AmServiceCard({ router }){
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setSelectedImage(imageList[Math.floor(Math.random() * imageList.length)]);
    }, []);

    if (!selectedImage) {
        return null;
    }

    return (
        <div className="card card-compact w-72 h-96 bg-neutral shadow-xl ">
            <figure className="min-h-[229px]">
                <Image width={300} height={229} src={selectedImage} alt="Movie" className="responsive-image" />
            </figure>
            <div className="min-h-[152px]">
                <div className="card-body">
                <h2 className="card-title">AM Log</h2>
                    <p>Controllo log dei distributori e dei frigo, verifica parametri </p>
                    <div className="card-actions justify-end">
                        <div className="card-actions justify-end">
                            <div className="join">
                                <TextInputAmService className="input input-sm input-bordered w-32 mr-0 join-item"/>
                                <GetButton router={router} className="btn btn-sm btn-info join-item"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AmServiceCard;
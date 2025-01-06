import React from 'react';
import { IoIosBed } from "react-icons/io";
import { MdBathroom } from "react-icons/md";
import { PiResizeFill } from "react-icons/pi";
import { PiHouseFill } from "react-icons/pi";

function Overview({ property }) {
    if (!property) return <p>No property data available</p>;

    return (
        <>
            <p className="text-justify">{property.description2}</p>
            <hr />
            <div className='d-flex flex-column flex-md-row justify-content-between'>
                <div className='Info'>
                    <div className='d-flex justify-content-between'>
                        <p className='fs-6'><i className="bi bi-geo-alt-fill" /> {`${property.location.no}, ${property.location.road}, ${property.location.city} ${property.location.postalcode}`}</p>
                    </div>
                    <div className="d-flex gap-1">
                        <h3 className="fw-bold">Rs. {property.price.toLocaleString()}</h3>
                        <span
                            className="material-symbols-outlined text-success"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Knowing the purchase price means you can work out the total cost of buying the property."
                            style={{ paddingTop: '0.15rem', cursor: 'pointer' }}
                        >
                            info
                        </span>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <p className='fw-bold text-success' style={{ fontSize: '0.85rem' }}>Monthly mortgage payment</p>
                        <p className='fw-bold text-muted' style={{ fontSize: '0.8rem' }}>Added on {`${property.added.day} ${property.added.month} ${property.added.year}`}</p>
                    </div>
                    <hr />
                    <div className='d-flex flex-wrap justify-content-between gap-3'>
                        {/* Property Type */}
                        <div className='d-flex flex-column'>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Property Type</p>
                            <div className='d-flex gap-2'>
                                <PiHouseFill size='1.5em' />
                                <p className='fs-6'>{property.type}</p>
                            </div>
                        </div>
                        {/* Bedrooms */}
                        <div className='d-flex flex-column'>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Bedrooms</p>
                            <div className='d-flex gap-2'>
                                <IoIosBed size='1.5em' />
                                <p className='fs-6'>{property.bedrooms}</p>
                            </div>
                        </div>
                        {/* Bathrooms */}
                        <div className='d-flex flex-column'>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Bathroom</p>
                            <div className='d-flex gap-2'>
                                <MdBathroom size='1.5em' />
                                <p className='fs-6'>{property.bathrooms}</p>
                            </div>
                        </div>
                        {/* Tenure */}
                        <div className='d-flex flex-column'>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Tenure</p>
                            <div className='d-flex gap-2'>
                                <p className='fs-6'>{property.tenure}</p>
                            </div>
                        </div>
                        {/* Size */}
                        <div className='d-flex flex-column'>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Size</p>
                            <div className='d-flex gap-2'>
                                <PiResizeFill size='1.5em' />
                                <p className='fs-6'>{property.landSize}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map mt-4 mt-md-0">
                    {property.address ? (
                        <iframe
                            src={`https://www.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`}
                            title="Google Map"
                            className="w-100"
                            style={{ borderRadius: 5, height: '230px' }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    ) : (
                        <p>Map not available</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Overview;

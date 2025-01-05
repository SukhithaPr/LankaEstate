import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IoIosBed } from "react-icons/io";
import { MdBathroom } from "react-icons/md";
import { PiResizeFill } from "react-icons/pi";
import { PiHouseFill } from "react-icons/pi";

// Custom hook for fetching data
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

// Custom TabPanel component
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function PropertyDetails() {
    const { id } = useParams();
    const { data: properties, loading, error } = useFetch('/properties.json');
    const [property, setProperty] = useState(null);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => setValue(newValue);

    useEffect(() => {
        if (properties) {
            const propertiesArray = Array.isArray(properties) ? properties : properties.properties;
            const selectedProperty = propertiesArray.find((item) => String(item.id) === String(id));
            setProperty(selectedProperty || null);
        }
    }, [properties, id]);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="fs-4">Loading property details, please wait...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5">
                <p className="text-danger fs-4">Oops! {error}</p>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="text-center py-5">
                <p className="text-danger fs-4">Property not found.</p>
                <button className="btn btn-primary" onClick={() => window.history.back()}>
                    Go Back
                </button>
            </div>
        );
    }

    const overview = () => (
        <div className='container p-4 rounded-3'>
            <p>{property.description2}</p>
            <hr />
            <div className='d-flex justify-content-between'>
                <div>
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
                        <p className='fw-bold text-success' style={{ fontSize: '0.85rem' }} >Monthly mortgage payment</p>
                        <p className='fw-bold text-muted' style={{ fontSize: '0.8rem' }} >Added on {`${property.added.day} ${property.added.month} ${property.added.year}`}</p>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between gap-4'>
                        <div className='d-flex flex-column'>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Property Type</p>
                            <div className='d-flex gap-2'>
                                <PiHouseFill size='1.5em' />
                                <p className='fs-6'>{property.type}</p>
                            </div>
                        </div>
                        <div className='d-flex flex-column'>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Bedrooms</p>
                            <div className='d-flex gap-2'>
                                <IoIosBed size='1.5em' />
                                <p className='fs-6'>{property.bedrooms}</p>
                            </div>
                        </div>
                        <div className='d-flex flex-column'>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Bathroom</p>
                            <div className='d-flex gap-2'>
                                <MdBathroom size='1.5em' />
                                <p className='fs-6'>{property.bathrooms}</p>
                            </div>
                        </div>
                        <div className='d-flex flex-column'>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Tenure</p>
                            <div className='d-flex gap-2'>
                                <p className='fs-6'>{property.tenure}</p>
                            </div>
                        </div>
                        <div className='d-flex flex-column'>
                            <p className="text-muted" style={{ fontSize: '0.8rem' }}>Size</p>
                            <div className='d-flex gap-2'>
                                <PiResizeFill size='1.5em' />
                                <p className='fs-6'>{property.landSize}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(property.address)}, ${encodeURIComponent(
                            property.address
                        )}&output=embed`}
                        title="Google Map"
                        width="550px"
                        height="100%"
                        style={{ borderRadius: 5 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
            <hr />
            <div>
                <img src={property.floorPlan} alt="floorPlan" />
            </div>
        </div>
    );

    return (
        <>
            <section className="container p-4 rounded-3">
                <div className="position-relative text-white rounded-3"
                    style={{
                        backgroundImage: `url(${property.picture?.main || '/placeholder.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '60vh',
                    }}
                >
                    <div
                        className="position-absolute w-100 h-100 rounded-3"
                        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
                    ></div>
                    <div className="position-absolute top-50 start-50 translate-middle text-center">
                        <h2 className="fw-bold display-6">{property.title}</h2>
                    </div>
                </div>
                <br />

                <div className="d-flex justify-content-center flex-wrap gap-2">
                    {Object.values(property.picture?.other || {}).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Property image ${index + 1}`}
                            className="rounded"
                            style={{ width: '265.6px', height: '215.6px', objectFit: 'cover' }}
                        />
                    ))}
                </div>

            </section>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 0 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="property details tabs"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                        backgroundColor: '#f8f8f8',
                        '& .MuiTab-root': { color: '#555' },
                        '& .MuiTab-root.Mui-selected': { color: '#188754', fontWeight: 'bold' },
                        '& .MuiTabs-indicator': { backgroundColor: '#188754' },
                    }}
                    centered
                >
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="Details" {...a11yProps(1)} />
                    <Tab label="Location" {...a11yProps(2)} />
                    <Tab label="Reserve" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div className="card-body">
                    {overview()}
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div className="card-body">
                    <h5 className="card-title text-center fs-3">Details</h5>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Typography variant="body1" align="justify">
                    This property is located in one of the most desirable areas. Explore the neighborhood and its amenities.
                </Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <Typography variant="body1" align="justify">
                    Secure your spot today by reserving this property. Get in touch for further steps.
                </Typography>
            </CustomTabPanel>
        </>
    );
}

export default PropertyDetails;
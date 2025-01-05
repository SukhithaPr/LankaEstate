import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoIosBed } from "react-icons/io";
import { MdBathroom } from "react-icons/md";
import { PiResizeFill } from "react-icons/pi";
import { PiHouseFill } from "react-icons/pi";
import { Details } from '@mui/icons-material';

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
    const [open, setOpen] = useState(false);

    const handleChange = (event, newValue) => setValue(newValue);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const content = () => (
        <div className='container p-4 rounded-3'>
            <p>{property.description2}</p>
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
                <div className="mt-4 mt-md-0">
                    {property.address ? (
                        <iframe
                            src={`https://www.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`}
                            title="Google Map"
                            width="600"
                            height="230"
                            style={{ borderRadius: 5 }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    ) : (
                        <p>Map not available</p>
                    )}
                </div>
            </div>
            <hr />
            <div className="d-flex flex-column flex-md-row justify-content-between gap-4 mt-4">
                <div>
                    <img
                        src={property.floorPlan}
                        alt="Floor Plan"
                        className="img-fluid rounded shadow"
                        onClick={handleOpen}
                        style={{ cursor: 'pointer' }}
                        loading="lazy"
                    />
                </div>
                <div>
                    <h5 className="fw-bold">Property Features</h5>
                    <ul className="list-unstyled">
                        {property.keyFeatures?.map((feature, index) => (
                            <li key={index} className="mb-2 d-flex align-items-center">
                                <i className="bi bi-check-circle-fill text-success me-2"></i>
                                {feature}
                            </li>
                        )) || <li className="text-muted">No features available</li>}
                    </ul>
                    <p>{property.floorPlanDescription || "Floor plan details are not available."}</p>
                </div>
            </div>
            <Modal open={open} onClose={handleClose} aria-labelledby="floorplan-modal-title" aria-describedby="floorplan-modal-description">
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 800,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2
                    }}
                >
                    <Typography id="floorplan-modal-title" variant="h6" component="h2">
                        Floor Plan
                    </Typography>
                    <img
                        src={property.floorPlan}
                        alt="Expanded Floor Plan"
                        style={{ width: '100%', height: 'auto', borderRadius: 5 }}
                    />
                </Box>
            </Modal>
            <hr />
            <div className="d-flex justify-content-center flex-wrap gap-2">
                {Object.values(property.picture?.other || {}).map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Property image ${index + 1}`}
                        className="rounded"
                        style={{ width: '100%', maxWidth: '200px', height: 'auto', objectFit: 'cover' }}
                    />
                ))}
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
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="overview" {...a11yProps(0)} />
                    <Tab label="Details" {...a11yProps(1)} />
                    <Tab label="Contact" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div className="card-body">
                    {content()}
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            <div className="card-body">
                    {content()}
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            <div className="card-body">
                    {content()}
                </div>
            </CustomTabPanel>
        </>
    );
}

export default PropertyDetails;
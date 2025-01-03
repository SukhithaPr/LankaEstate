import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
            <ul className="list-unstyled">
                <li><h3 className='fw-bold'>{property.title}</h3></li>
                <br />
                <li>{property.description2}</li>
                <br />
                <div className="d-flex justify-content-center flex-wrap gap-2">
                    {Object.values(property.picture?.other || {}).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Property image ${index + 1}`}
                            className="rounded"
                            style={{ width: '200px', height: '150px', objectFit: 'cover' }}
                        />
                    ))}
                </div>
            </ul>
            <br />
            <h3 className='fw-bold'>Property highlights</h3>        
            <div className="row rounded-3 min-vh-60 shadow" style={{ backgroundColor: '#f4f8f9' }}>
                <div className="col-md-6 d-flex flex-column justify-content-center p-2 gap-3">
                    <ul className="list-unstyled">
                        <li>{property.bedrooms}</li>
                        <li>{property.bathrooms}</li>
                        <li>{property.landSize}</li>
                    </ul>
                </div>
            </div>
        </div>
    );

    const renderDetails = () => (
        <ul className="list-unstyled">
            <li><strong>Type:</strong> {property.type}</li>
            <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
            <li><strong>Price:</strong> Rs.{property.price.toLocaleString()}</li>
            <li><strong>Tenure:</strong> {property.tenure}</li>
            <li><strong>Added:</strong> {`${property.added.day} ${property.added.month} ${property.added.year}`}</li>
            <li><strong>Location:</strong> {property.location}</li>
        </ul>
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
            </section>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 0 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="property details tabs"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                        backgroundColor: '#f9f9f9',
                        '& .MuiTab-root': { color: '#555' },
                        '& .MuiTab-root.Mui-selected': { color: '#198754', fontWeight: 'bold' },
                        '& .MuiTabs-indicator': { backgroundColor: '#198754' },
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
                    {renderDetails()}
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
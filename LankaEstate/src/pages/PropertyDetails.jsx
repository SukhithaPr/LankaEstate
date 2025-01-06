import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Overview from '../components/Overview';
import Details from '../components/Details';
import PropertyContact from '../components/PropertyContact';

// Custom hook to fetch data from a given URL
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

// Custom component for tab panels
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

// Function to generate accessibility props for tabs
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function PropertyDetails() {
    const { id } = useParams(); // Get property ID from URL parameters
    const { data: properties, loading, error } = useFetch('/properties.json'); // Fetch properties data
    const [property, setProperty] = useState(null); // State to store selected property
    const [value, setValue] = useState(0); // State to manage active tab
    const [open, setOpen] = useState(false); // State to manage modal open/close

    const handleChange = (event, newValue) => setValue(newValue); // Handle tab change
    const handleOpen = () => setOpen(true); // Open modal
    const handleClose = () => setOpen(false); // Close modal

    useEffect(() => {
        if (properties) {
            const propertiesArray = Array.isArray(properties) ? properties : properties.properties;
            const selectedProperty = propertiesArray.find((item) => String(item.id) === String(id));
            setProperty(selectedProperty || null); // Set selected property based on ID
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

    return (
        <>
            <section className="container rounded-3">
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
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    marginTop: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%', // Adjust width as needed
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    // Remove variant="scrollable" or replace it with 'standard'
                    sx={{
                        '& .MuiTab-root': { color: '#555' },
                        '& .MuiTab-root.Mui-selected': { color: '#188754', fontWeight: 'bold' },
                        '& .MuiTabs-indicator': { backgroundColor: '#188754' },
                    }}
                >

                    {/* Tab labels */}
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="Details" {...a11yProps(1)} />
                    <Tab label="Contact" {...a11yProps(2)} />
                </Tabs>

                <CustomTabPanel value={value} index={0}>
                    <div className='container p-4'>
                        <Overview property={property} />
                    </div >
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className='container p-4'>
                        <Details property={property} />
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div className='container p-4'>
                        <PropertyContact property={property} />
                    </div>
                </CustomTabPanel>
            </Box>

        </>
    );
}

export default PropertyDetails;
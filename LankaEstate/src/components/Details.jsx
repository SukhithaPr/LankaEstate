import React, { useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function Details({ property }) {
    if (!property) return <p>Property details are not available.</p>;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const features = property.keyFeatures || [];

    return (
        <>
            <div className="d-flex flex-column flex-md-row justify-content-between gap-4 mt-4">
                <div>
                    {property.floorPlan ? (
                        <img
                            src={property.floorPlan}
                            alt="Floor Plan"
                            className="img-fluid rounded shadow"
                            onClick={handleOpen}
                            style={{ cursor: 'pointer' }}
                            loading="lazy"
                        />
                    ) : (
                        <p>No floor plan available</p>
                    )}
                </div>
                <div>
                    <h5 className="fw-bold">Property Features</h5>
                    <ul className="list-unstyled">
                        {features.length > 0 ? (
                            features.map((feature, index) => (
                                <li key={index} className="mb-2 d-flex align-items-center">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    {feature}
                                </li>
                            ))
                        ) : (
                            <li className="text-muted">No features available</li>
                        )}
                    </ul>
                    <p>{property.floorPlanDescription || "Floor plan details are not available."}</p>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="floorplan-modal-title"
                aria-describedby="floorplan-modal-description"
            >
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
                {property.picture?.other && Object.values(property.picture.other).length > 0 ? (
                    Object.values(property.picture.other).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Property image ${index + 1}`}
                            className="rounded"
                            style={{
                                width: '100%',
                                maxWidth: '200px',
                                height: 'auto',
                                objectFit: 'cover',
                            }}
                            loading="lazy"
                        />
                    ))
                ) : (
                    <p className="text-muted">No additional images available</p>
                )}
            </div>
        </>
    );
}

export default Details;

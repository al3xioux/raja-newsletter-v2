// src/components/CTAForm.jsx
import React from "react";

export default function CTAForm({ data, onChange, onRemove, onMoveUp, onMoveDown }) {
    const handleImageChange = (e) => {
        onChange({ ...data, ctaImage: e.target.value });
    };
    const handleLinkChange = (e) => {
        onChange({ ...data, ctaLinkText: e.target.value });
    };
    const handleAltTitleChange = (e) => {
        onChange({ ...data, ctaAltTitle: e.target.value });
    };

    return (
        <section className="form-cta">
                <div style={{ display: 'flex', gap: '5px', marginRight: '10px' }}>
                    <button type="button" className="move-btn" onClick={onMoveUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-up"></i></button>
                    <button type="button" className="move-btn" onClick={onMoveDown} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-down"></i></button>
                    <button type="button" className="delete-btn" onClick={onRemove} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-delete-left"></i></button>
                </div>
                <br></br>

            <label htmlFor="cta-image" className="form-label">CTA Image</label>
            <br></br>
            <input
                type="text"
                id="cta-image"
                value={data.ctaImage || ""}
                onChange={handleImageChange}
            />
            <br></br>

            <label htmlFor="cta-link" className="form-label">CTA Link</label>
            <br></br>
            <input
                type="text"
                id="cta-link"
                value={data.ctaLinkText || ""}
                onChange={handleLinkChange}
            />
            <br></br>
            <label htmlFor="cta-alt/title" className="form-label">CTA Alt/Title</label>
            <br></br>
            <input
                type="text"
                id="cta-alt/title"
                value={data.ctaAltTitle || ""}
                onChange={handleAltTitleChange}
            />
        </section>
    );
}

// src/components/CTAForm.jsx
import React from "react";

export default function CTAForm({ data, onChange, onRemove }) {
    const handleImageChange = (e) => {
        onChange({ ...data, ctaImage: e.target.value });
    };
    const handleLinkChange = (e) => {
        onChange({ ...data, ctaLinkText: e.target.value });
    };

    return (
        <section className="form-cta">
            <button type="button" className="delete-btn" onClick={onRemove}>
                X
            </button>

            <label htmlFor="cta-image">CTA Image</label>
            <input
                type="text"
                id="cta-image"
                value={data.ctaImage || ""}
                onChange={handleImageChange}
            />

            <label htmlFor="cta-link">CTA Link</label>
            <input
                type="text"
                id="cta-link"
                value={data.ctaLinkText || ""}
                onChange={handleLinkChange}
            />
        </section>
    );
}

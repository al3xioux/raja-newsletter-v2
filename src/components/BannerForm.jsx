// src/components/BannerForm.jsx
import React from "react";

export default function BannerForm({ data, onChange, onRemove }) {
    // Mise à jour des champs
    const handleImageChange = (e) => {
        onChange({ ...data, bannerImage: e.target.value });
    };
    const handleLinkChange = (e) => {
        onChange({ ...data, bannerLinkText: e.target.value });
    };

    return (
        <section className="form-banner">
            <button type="button" className="delete-btn" onClick={onRemove}>
                X
            </button>
            <label htmlFor="banner-image">Banner Image</label>
            <input
                type="text"
                id="banner-image"
                value={data.bannerImage || ""}
                onChange={handleImageChange}
            />

            <label htmlFor="banner-link">Banner Link</label>
            <input
                type="text"
                id="banner-link"
                value={data.bannerLinkText || ""}
                onChange={handleLinkChange}
            />
        </section>
    );
}

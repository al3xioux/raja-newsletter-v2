// src/components/BannerForm.jsx
import React from "react";

export default function BannerForm({ data, onChange, onRemove, onMoveUp, onMoveDown }) {
    // Mise à jour des champs
    const handleImageChange = (e) => {
        onChange({ ...data, bannerImage: e.target.value });
    };
    const handleLinkChange = (e) => {
        onChange({ ...data, bannerLinkText: e.target.value });
    };
    const handleAltTitleChange = (e) => {
        onChange({ ...data, bannerAltTitle: e.target.value });
    };

    return (
        <section className="form-banner">
                <div style={{ display: 'flex', gap: '5px', marginRight: '10px' }}>
                    <button type="button" className="move-btn" onClick={onMoveUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-up"></i></button>
                    <button type="button" className="move-btn" onClick={onMoveDown} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-arrow-down"></i></button>
                    <button type="button" className="delete-btn" onClick={onRemove} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-delete-left"></i></button>
                </div>
                <br></br>

            <label htmlFor="banner-image" className="form-label">Banner Image </label>
            <br></br>
            <input
                type="text"
                id="banner-image"
                value={data.bannerImage || ""}
                onChange={handleImageChange}
            />
            <br></br>

            <label htmlFor="banner-link" className="form-label">Banner Link</label>
            <br></br>
            <input
                type="text"
                id="banner-link"
                value={data.bannerLinkText || ""}
                onChange={handleLinkChange}
            />
            <br></br>

            <label htmlFor="banner-alt/title" className="form-label">Banner Alt/Title</label>
            <br></br>
            <input
                type="text"
                id="banner-alt/title"
                value={data.bannerAltTitle || ""}
                onChange={handleAltTitleChange}
            />
        </section>
    );
}

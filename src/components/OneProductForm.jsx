// src/components/OneProductForm.jsx
import React from "react";

export default function OneProductForm({ data, onChange, onRemove }) {
    // Helper pour mettre à jour un champ
    const updateField = (field) => (e) => {
        onChange({ ...data, [field]: e.target.value });
    };

    return (
        <section className="product-group">
            <form className="form-product">
                <button type="button" className="delete-btn" onClick={onRemove}>
                    X
                </button>

                <section className="product-line">
                    <label htmlFor="one_productLink">Product Link</label>
                    <input
                        type="text"
                        id="one_productLink"
                        value={data.one_productLink || ""}
                        onChange={updateField("one_productLink")}
                    />

                    <label htmlFor="one_image">Image</label>
                    <input
                        type="text"
                        id="one_image"
                        value={data.one_image || ""}
                        onChange={updateField("one_image")}
                    />

                    <label htmlFor="one_ecolabel">Eco-Label</label>
                    <input
                        type="text"
                        id="one_ecolabel"
                        value={data.one_ecolabel || ""}
                        onChange={updateField("one_ecolabel")}
                    />

                    <label htmlFor="one_title">Title</label>
                    <input
                        type="text"
                        id="one_title"
                        value={data.one_title || ""}
                        onChange={updateField("one_title")}
                    />

                    <label htmlFor="one_text">Text</label>
                    <input
                        type="text"
                        id="one_text"
                        value={data.one_text || ""}
                        onChange={updateField("one_text")}
                    />

                    <label htmlFor="one_label">Label</label>
                    <input
                        type="text"
                        id="one_label"
                        value={data.one_label || ""}
                        onChange={updateField("one_label")}
                    />

                    <label>From ?</label>
                    <div role="radiogroup">
                        <label htmlFor="fromYes">Yes</label>
                        <input
                            type="radio"
                            id="fromYes"
                            name="one_from"
                            value="From"
                            checked={data.one_from === "From"}
                            onChange={updateField("one_from")}
                        />
                        <label htmlFor="fromNo">No</label>
                        <input
                            type="radio"
                            id="fromNo"
                            name="one_from"
                            value=""
                            checked={data.one_from === ""}
                            onChange={updateField("one_from")}
                        />
                    </div>

                    <label htmlFor="one_price">Price</label>
                    <input
                        type="text"
                        id="one_price"
                        value={data.one_price || ""}
                        onChange={updateField("one_price")}
                    />

                    <label htmlFor="one_unit">Unit</label>
                    <input
                        type="text"
                        id="one_unit"
                        value={data.one_unit || ""}
                        onChange={updateField("one_unit")}
                    />
                </section>
            </form>
        </section>
    );
}

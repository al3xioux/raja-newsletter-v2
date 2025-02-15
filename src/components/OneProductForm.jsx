// src/components/OneProductForm.jsx
import React, { useEffect, useRef } from "react";

export default function OneProductForm({ data, onChange, onRemove }) {
    const titleInputRef = useRef(null);
    const textInputRef = useRef(null);

    function addMaxLengthListener(inputElement) {
        inputElement.addEventListener('input', () => {
            if (inputElement.value.length >= inputElement.maxLength) {
                inputElement.style.borderColor = 'red';
                inputElement.style.borderWidth = '2px';
            } else {
                inputElement.style.borderColor = ''; // Reset to default
                inputElement.style.borderWidth = '1px';
            }
        });
    }

    useEffect(() => {
        if (titleInputRef.current) {
            addMaxLengthListener(titleInputRef.current);
        }
        if (textInputRef.current) {
            addMaxLengthListener(textInputRef.current);
        }
    }, []);

    // Helper pour mettre à jour un champ
    const updateField = (field) => (e) => {
        onChange({ ...data, [field]: e.target.value });
    };

    // Vérifie si l'URL de l'ecolabel est valide (commence par http)
    const hasEcoLabelPreview =
        data.one_ecolabel &&
        (data.one_ecolabel.startsWith("http://") || data.one_ecolabel.startsWith("https://"));

    const hasLabelPreview =
        data.one_label &&
        (data.one_label.startsWith("http://") || data.one_label.startsWith("https://"));


    return (
        <section className="product-group">
            <form className="form-product">
                <button type="button" className="delete-btn" onClick={onRemove}></button>

                <section className="product-line">
                    <label htmlFor="one_productLink" className="form-label">Product Link</label>
                    <input
                        type="text"
                        id="one_productLink"
                        value={data.one_productLink || ""}
                        onChange={updateField("one_productLink")}
                    />

                    <label htmlFor="one_image" className="form-label">Image</label>
                    <input
                        type="text"
                        id="one_image"
                        value={data.one_image || ""}
                        onChange={updateField("one_image")}
                    />

                    <label htmlFor="one_ecolabel" className="form-label">Eco-Label</label>
                    <input
                        type="text"
                        id="one_ecolabel"
                        value={data.one_ecolabel || ""}
                        onChange={updateField("one_ecolabel")}
                    />
                    {hasEcoLabelPreview && (
                        <img
                            src={data.one_ecolabel}
                            alt="Eco-label preview"
                            style={{ maxWidth: "200px", margin: "8px 0" }}
                        />
                    )}
                    <button
                        type="button"
                        onClick={() =>
                            window.open(
                                "https://imgnews.raja-group.com/00-structure/crit-green/_crit-green-all-pays.html",
                                "_blank"
                            )
                        }
                    >
                        Crit Green
                    </button>

                    <label htmlFor="one_title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="one_title"
                        ref={titleInputRef}
                        value={data.one_title || ""}
                        onChange={updateField("one_title")}
                        maxLength={66}
                    />

                    <label htmlFor="one_text" className="form-label">Text</label>
                    <input
                        type="text"
                        id="one_text"
                        ref={textInputRef}
                        value={data.one_text || ""}
                        onChange={updateField("one_text")}
                        maxLength={85}
                    />

                    <label htmlFor="one_label" className="form-label">Label</label>
                    <input
                        type="text"
                        id="one_label"
                        value={data.one_label || ""}
                        onChange={updateField("one_label")}
                    />
                    {hasLabelPreview && (
                        <img
                            src={data.one_label}
                            alt="Label preview"
                            style={{ maxWidth: "200px", margin: "8px 0" }}
                        />
                    )}
                    <button
                        type="button"
                        onClick={() =>
                            window.open(
                                "https://imgnews.raja-group.com/00-structure/label/_label-all-pays.html",
                                "_blank"
                            )
                        }
                    >
                        Label
                    </button>

                    <label className="form-label">From ?</label>
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

                    <label htmlFor="one_from-price" className="form-label">From Price</label>
                    <select
                        id="one_from-price"
                        value={data.one_fromPrice || ""}
                        onChange={updateField("one_fromPrice")}
                    >
                        <option value="">---Please choose an option---</option>
                        <option value="Ab">Ab</option>
                        <option value="Dès">Dès</option>
                        <option value="Již">Již</option>
                        <option value="Fra">Fra</option>
                        <option value="Już">Już</option>
                        <option value="Desde">Desde</option>
                        <option value="Från">Från</option>
                        <option value="Už">Už</option>
                        <option value="From">From</option>
                        <option value="A partir de">A partir de</option>
                    </select>

                    <label htmlFor="one_crossed-out-price" className="form-label">Crossed Out Price</label>
                    <input
                        type="text"
                        id="one_crossed-out-price"
                        value={data.one_crossedOutPrice || ""}
                        onChange={updateField("one_crossedOutPrice")}
                    />

                    <label htmlFor="one_price" className="form-label">Price</label>
                    <input
                        type="text"
                        id="one_price"
                        value={data.one_price || ""}
                        onChange={updateField("one_price")}
                    />

                    <label htmlFor="one_unit" className="form-label">Unit</label>
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

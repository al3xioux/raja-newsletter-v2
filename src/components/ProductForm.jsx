// src/components/ProductForm.jsx
import React, { useEffect, useRef } from "react";

export default function ProductForm({ data, onChange, onRemove }) {
    const title1InputRef = useRef(null);
    const text1InputRef = useRef(null);
    const title2InputRef = useRef(null);
    const text2InputRef = useRef(null);

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
        if (title1InputRef.current) {
            addMaxLengthListener(title1InputRef.current);
        }
        if (text1InputRef.current) {
            addMaxLengthListener(text1InputRef.current);
        }
        if (title2InputRef.current) {
            addMaxLengthListener(title2InputRef.current);
        }
        if (text2InputRef.current) {
            addMaxLengthListener(text2InputRef.current);
        }
    }, []);

    const updateField = (field) => (e) => {
        onChange({ ...data, [field]: e.target.value });
    };

    const hasEcoLabel1Preview =
        data.ecolabel1 &&
        (data.ecolabel1.startsWith("http://") || data.ecolabel1.startsWith("https://"));

    const hasLabel1Preview =
        data.label1 &&
        (data.label1.startsWith("http://") || data.label1.startsWith("https://"));

    const hasEcoLabel2Preview =
        data.ecolabel2 &&
        (data.ecolabel2.startsWith("http://") || data.ecolabel2.startsWith("https://"));

    const hasLabel2Preview =
        data.label2 &&
        (data.label2.startsWith("http://") || data.label2.startsWith("https://"));

    return (
        <section className="product-group">
            <form className="form-product">
                <button type="button" className="delete-btn" onClick={onRemove}></button>

                <section className="product-line">
                    <label className="form-label">Product Link 1</label>
                    <input
                        type="text"
                        value={data.productLink1 || ""}
                        onChange={updateField("productLink1")}
                    />

                    <label className="form-label">Image 1</label>
                    <input
                        type="text"
                        value={data.image1 || ""}
                        onChange={updateField("image1")}
                    />

                    <label className="form-label">Eco-Label 1</label>
                    <input
                        type="text"
                        value={data.ecolabel1 || ""}
                        onChange={updateField("ecolabel1")}
                    />
                    {hasEcoLabel1Preview && (
                        <img
                            src={data.ecolabel1}
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

                    <label className="form-label">Title 1</label>
                    <input
                        type="text"
                        ref={title1InputRef}
                        value={data.title1 || ""}
                        onChange={updateField("title1")}
                        maxLength={66}
                    />

                    <label className="form-label">Text 1</label>
                    <input
                        type="text"
                        ref={text1InputRef}
                        value={data.text1 || ""}
                        onChange={updateField("text1")}
                        maxLength={85}
                    />

                    <label className="form-label">Label 1</label>
                    <input
                        type="text"
                        value={data.label1 || ""}
                        onChange={updateField("label1")}
                    />
                    {hasLabel1Preview && (
                        <img
                            src={data.label1}
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

                    <label className="form-label">From 1 ?</label>
                    <div role="radiogroup">
                        <label htmlFor="fromYes1">Yes</label>
                        <input
                            type="radio"
                            id="fromYes1"
                            name="from1"
                            value="From"
                            checked={data.from1 === "From"}
                            onChange={updateField("from1")}
                        />
                        <label htmlFor="fromNo1">No</label>
                        <input
                            type="radio"
                            id="fromNo1"
                            name="from1"
                            value=""
                            checked={data.from1 === ""}
                            onChange={updateField("from1")}
                        />
                    </div>

                    <label htmlFor="from-price1" className="form-label">From Price 1</label>
                    <select
                        id="from-price1"
                        value={data.fromPrice1 || ""}
                        onChange={updateField("fromPrice1")}
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

                    <label htmlFor="crossed-out-price1" className="form-label">Crossed Out Price 1</label>
                    <input
                        type="text"
                        id="crossed-out-price1"
                        value={data.crossedOutPrice1 || ""}
                        onChange={updateField("crossedOutPrice1")}
                    />
                    
                    <label className="form-label">Price 1</label>
                    <input
                        type="text"
                        value={data.price1 || ""}
                        onChange={updateField("price1")}
                    />

                    <label className="form-label">Unit 1</label>
                    <input
                        type="text"
                        value={data.unit1 || ""}
                        onChange={updateField("unit1")}
                    />
                </section>

                <section className="product-line">
                    <label className="form-label">Product Link 2</label>
                    <input
                        type="text"
                        value={data.productLink2 || ""}
                        onChange={updateField("productLink2")}
                    />

                    <label className="form-label">Image 2</label>
                    <input
                        type="text"
                        value={data.image2 || ""}
                        onChange={updateField("image2")}
                    />

                    <label className="form-label">Eco-Label 2</label>
                    <input
                        type="text"
                        value={data.ecolabel2 || ""}
                        onChange={updateField("ecolabel2")}
                    />
                    {hasEcoLabel2Preview && (
                        <img
                            src={data.ecolabel2}
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

                    <label className="form-label">Title 2</label>
                    <input
                        type="text"
                        ref={title2InputRef}
                        value={data.title2 || ""}
                        onChange={updateField("title2")}
                        maxLength={66}
                    />

                    <label className="form-label">Text 2</label>
                    <input
                        type="text"
                        ref={text2InputRef}
                        value={data.text2 || ""}
                        onChange={updateField("text2")}
                        maxLength={85}
                    />

                    <label className="form-label">Label 2</label>
                    <input
                        type="text"
                        value={data.label2 || ""}
                        onChange={updateField("label2")}
                    />
                    {hasLabel2Preview && (
                        <img
                            src={data.label2}
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

                    <label className="form-label">From 2 ?</label>
                    <div role="radiogroup">
                        <label htmlFor="fromYes2">Yes</label>
                        <input
                            type="radio"
                            id="fromYes2"
                            name="from2"
                            value="From"
                            checked={data.from2 === "From"}
                            onChange={updateField("from2")}
                        />
                        <label htmlFor="fromNo2">No</label>
                        <input
                            type="radio"
                            id="fromNo2"
                            name="from2"
                            value=""
                            checked={data.from2 === ""}
                            onChange={updateField("from2")}
                        />
                    </div>

                    <label htmlFor="from-price2" className="form-label">From Price 2</label>
                    <select
                        id="from-price2"
                        value={data.fromPrice2 || ""}
                        onChange={updateField("fromPrice2")}
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

                    <label htmlFor="crossed-out-price2" className="form-label">Crossed Out Price 2</label>
                    <input
                        type="text"
                        id="crossed-out-price2"
                        value={data.crossedOutPrice2 || ""}
                        onChange={updateField("crossedOutPrice2")}
                    />

                    <label className="form-label">Price 2</label>
                    <input
                        type="text"
                        value={data.price2 || ""}
                        onChange={updateField("price2")}
                    />

                    <label className="form-label">Unit 2</label>
                    <input
                        type="text"
                        value={data.unit2 || ""}
                        onChange={updateField("unit2")}
                    />
                </section>
            </form>
        </section>
    );
}

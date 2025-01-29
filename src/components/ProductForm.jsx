// src/components/ProductForm.jsx
import React from "react";

export default function ProductForm({ data, onChange, onRemove }) {
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
                    <label>Product Link 1</label>
                    <input
                        type="text"
                        value={data.productLink1 || ""}
                        onChange={updateField("productLink1")}
                    />

                    <label>Image 1</label>
                    <input
                        type="text"
                        value={data.image1 || ""}
                        onChange={updateField("image1")}
                    />

                    <label>Eco-Label 1</label>
                    <input
                        type="text"
                        value={data.ecolabel1 || ""}
                        onChange={updateField("ecolabel1")}
                    />

                    <label>Title 1</label>
                    <input
                        type="text"
                        value={data.title1 || ""}
                        onChange={updateField("title1")}
                    />

                    <label>Text 1</label>
                    <input
                        type="text"
                        value={data.text1 || ""}
                        onChange={updateField("text1")}
                    />

                    <label>Label 1</label>
                    <input
                        type="text"
                        value={data.label1 || ""}
                        onChange={updateField("label1")}
                    />

                    <label>From 1 ?</label>
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

                    <label>Price 1</label>
                    <input
                        type="text"
                        value={data.price1 || ""}
                        onChange={updateField("price1")}
                    />

                    <label>Unit 1</label>
                    <input
                        type="text"
                        value={data.unit1 || ""}
                        onChange={updateField("unit1")}
                    />
                </section>

                <section className="product-line">
                    <label>Product Link 2</label>
                    <input
                        type="text"
                        value={data.productLink2 || ""}
                        onChange={updateField("productLink2")}
                    />

                    <label>Image 2</label>
                    <input
                        type="text"
                        value={data.image2 || ""}
                        onChange={updateField("image2")}
                    />

                    <label>Eco-Label 2</label>
                    <input
                        type="text"
                        value={data.ecolabel2 || ""}
                        onChange={updateField("ecolabel2")}
                    />

                    <label>Title 2</label>
                    <input
                        type="text"
                        value={data.title2 || ""}
                        onChange={updateField("title2")}
                    />

                    <label>Text 2</label>
                    <input
                        type="text"
                        value={data.text2 || ""}
                        onChange={updateField("text2")}
                    />

                    <label>Label 2</label>
                    <input
                        type="text"
                        value={data.label2 || ""}
                        onChange={updateField("label2")}
                    />

                    <label>From 2 ?</label>
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

                    <label>Price 2</label>
                    <input
                        type="text"
                        value={data.price2 || ""}
                        onChange={updateField("price2")}
                    />

                    <label>Unit 2</label>
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

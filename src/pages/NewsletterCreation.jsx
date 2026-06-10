import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TitleForm from "../components/TitleForm";
import BannerForm from "../components/BannerForm";
import OneProductForm from "../components/OneProductForm";
import ProductForm from "../components/ProductForm";
import CTAForm from "../components/CTAForm";
import LegalNotice from "../components/LegalNotice";

import generateHtml from "../utils/generateHtml";
import { HEADERS, FOOTERS } from "../data/var";

// Wrapper pour compatibilité React 18 + react-beautiful-dnd
const StrictModeDroppable = ({ children, ...props }) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));
        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) return null;
    return <Droppable {...props}>{children}</Droppable>;
};

const FORM_TYPE_LABELS = {
    banner: "Banner",
    title: "Title",
    oneProduct: "1 Product",
    product: "2 Products",
    cta: "CTA",
    legalNotice: "Legal Notice",
};

export default function NewsletterCreation() {
    const [renderedForms, setRenderedForms] = useState([]);
    const [language, setLanguage] = useState("fr");
    const [documentTitle, setDocumentTitle] = useState("");
    const [headerTexte, setHeaderTexte] = useState("");
    const [activeFormId, setActiveFormId] = useState(null);
    const [completedForms, setCompletedForms] = useState({});

    const formsContainerRef = useRef(null);

    const scrollToForm = (formId) => {
        const formElement = document.getElementById(`form-${formId}`);
        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveFormId(formId);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (formsContainerRef.current) {
                const forms = formsContainerRef.current.getElementsByClassName("form-wrapper");
                for (let form of forms) {
                    const rect = form.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 200) {
                        setActiveFormId(form.id.replace("form-", ""));
                        break;
                    }
                }
            }
        };

        const container = formsContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const checkFormCompletion = (form) => {
        switch (form.type) {
            case "banner":
                return !!(form.data.bannerImage && form.data.bannerLinkText && form.data.bannerAltTitle);
            case "title":
                return !!(form.data.bigTitle);
            case "oneProduct":
                return !!(form.data.one_productLink && form.data.one_image && form.data.one_title &&
                    form.data.one_text && form.data.one_price);
            case "product":
                return !!(form.data.productLink1 && form.data.image1 && form.data.title1 &&
                    form.data.text1 && form.data.price1 && form.data.productLink2 &&
                    form.data.image2 && form.data.title2 && form.data.text2 && form.data.price2);
            case "cta":
                return !!(form.data.ctaImage && form.data.ctaLinkText && form.data.ctaAltTitle);
            case "legalNotice":
                return !!(form.data.legalNotice);
            default:
                return false;
        }
    };

    const updateFormData = (formId, newData) => {
        setRenderedForms((prev) => {
            const newForms = prev.map((item) =>
                item.id === formId ? { ...item, data: newData } : item
            );
            const updatedForm = newForms.find((form) => form.id === formId);
            if (updatedForm) {
                setCompletedForms((prev) => ({
                    ...prev,
                    [formId]: checkFormCompletion(updatedForm),
                }));
            }
            return newForms;
        });
    };

    const addForm = (type) => {
        const newId = Date.now();
        setRenderedForms((prev) => [...prev, { id: newId, type, data: {} }]);
        setCompletedForms((prev) => ({ ...prev, [newId]: false }));
    };

    const removeForm = (formId) => {
        if (window.confirm("Are you sure you want to delete this block?")) {
            setRenderedForms((prev) => prev.filter((x) => x.id !== formId));
            setCompletedForms((prev) => {
                const next = { ...prev };
                delete next[formId];
                return next;
            });
        }
    };

    const toggleCompletion = (e, formId) => {
        e.stopPropagation();
        setCompletedForms((prev) => ({ ...prev, [formId]: !prev[formId] }));
    };

    const moveFormUp = (formId) => {
        setRenderedForms((prev) => {
            const index = prev.findIndex((f) => f.id === formId);
            if (index <= 0) return prev;
            const next = [...prev];
            [next[index - 1], next[index]] = [next[index], next[index - 1]];
            return next;
        });
    };

    const moveFormDown = (formId) => {
        setRenderedForms((prev) => {
            const index = prev.findIndex((f) => f.id === formId);
            if (index === -1 || index === prev.length - 1) return prev;
            const next = [...prev];
            [next[index], next[index + 1]] = [next[index + 1], next[index]];
            return next;
        });
    };

    const handleLanguageChange = (e) => setLanguage(e.target.value);
    const handleDocumentTitleChange = (e) => setDocumentTitle(e.target.value);
    const handleHeaderTexteChange = (e) => setHeaderTexte(e.target.value);

    const handleGenerateHTML = () => {
        const header = HEADERS[language] || "";
        const footer = FOOTERS[language] || "";
        const html = generateHtml(renderedForms, header, footer, documentTitle, headerTexte, language);
        const fileName = documentTitle.trim() || "newsletter";
        const blob = new Blob([html], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName + ".html";
        link.click();
    };

    const handleReset = () => {
        if (window.confirm("Reset all blocks?")) {
            setRenderedForms([]);
            setLanguage("fr");
            setDocumentTitle("");
            setHeaderTexte("");
            setCompletedForms({});
        }
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(renderedForms);
        const [reordered] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reordered);
        setRenderedForms(items);
    };

    return (
        <>
            {/* Header */}
            <header className="app-header">
                <img src="/raja_logo.jpeg" alt="RAJA" className="app-header-logo" />
                <span className="app-header-title">Newsletter Creation</span>
            </header>

            <div className="page-layout">

                {/* Barre de configuration globale */}
                <div id="formglobal">
                    <div className="form-field">
                        <label htmlFor="documentTitle">Subject</label>
                        <input
                            type="text"
                            id="documentTitle"
                            value={documentTitle}
                            onChange={handleDocumentTitleChange}
                            placeholder="Newsletter subject…"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="headerTexte">Header Text</label>
                        <input
                            type="text"
                            id="headerTexte"
                            value={headerTexte}
                            onChange={handleHeaderTexteChange}
                            placeholder="Header text…"
                        />
                    </div>

                    <div className="form-field form-field-narrow">
                        <label htmlFor="language">Country</label>
                        <select id="language" value={language} onChange={handleLanguageChange}>
                            <option value="fr">🇫🇷 FR</option>
                            <option value="uk">🇬🇧 UK</option>
                            <option value="es">🇪🇸 ES</option>
                            <option value="de">🇩🇪 DE</option>
                            <option value="at">🇦🇹 AT</option>
                            <option value="bfl">🇧🇪 BFL</option>
                            <option value="bfr">🇧🇪 BFR</option>
                            <option value="cde">🇨🇭 CDE</option>
                            <option value="cfr">🇨🇭 CFR</option>
                            <option value="cz">🇨🇿 CZ</option>
                            <option value="dk">🇩🇰 DK</option>
                            <option value="hu">🇭🇺 HU</option>
                            <option value="it">🇮🇹 IT</option>
                            <option value="nl">🇳🇱 NL</option>
                            <option value="no">🇳🇴 NO</option>
                            <option value="pl">🇵🇱 PL</option>
                            <option value="pt">🇵🇹 PT</option>
                            <option value="se">🇸🇪 SE</option>
                            <option value="sk">🇸🇰 SK</option>
                        </select>
                    </div>
                </div>

                {/* Zone principale : navigation + formulaires + boutons ajout */}
                <div id="main-container">

                    {/* Sidebar navigation */}
                    <div id="navigation-card">
                        <h3>Structure</h3>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <StrictModeDroppable droppableId="droppable-list">
                                {(provided) => (
                                    <div
                                        id="navigation-items"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {renderedForms.map((form, index) => {
                                            const isCompleted = completedForms[form.id];
                                            const completionClass = isCompleted ? "completed" : "incomplete";

                                            return (
                                                <Draggable
                                                    key={form.id}
                                                    draggableId={form.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`nav-item ${snapshot.isDragging ? "dragging" : ""} ${activeFormId === form.id ? "active" : ""} ${completionClass}`}
                                                            onClick={() => scrollToForm(form.id)}
                                                        >
                                                            <span className="nav-number">{index + 1}</span>
                                                            <span className="nav-type">{FORM_TYPE_LABELS[form.type] || form.type}</span>
                                                            <input
                                                                type="checkbox"
                                                                className="completion-checkbox"
                                                                checked={isCompleted}
                                                                onChange={(e) => toggleCompletion(e, form.id)}
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                        {renderedForms.length === 0 && (
                                            <div className="nav-empty">
                                                <i className="fa-solid fa-layer-group"></i>
                                                <div>Add blocks<br />to get started</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </StrictModeDroppable>
                        </DragDropContext>
                    </div>

                    {/* Zone des formulaires */}
                    <div id="corps" ref={formsContainerRef}>
                        {renderedForms.length === 0 && (
                            <div className="corps-empty">
                                <i className="fa-solid fa-envelope-open corps-empty-icon"></i>
                                <div>Start by adding a block<br />from the right panel.</div>
                            </div>
                        )}
                        {renderedForms.map((form) => {
                            const { id, type, data } = form;
                            const onChange = (d) => updateFormData(id, d);
                            const onRemove = () => removeForm(id);
                            const onMoveUp = () => moveFormUp(id);
                            const onMoveDown = () => moveFormDown(id);

                            const formProps = { data, onChange, onRemove, onMoveUp, onMoveDown };

                            const FormComponent = (() => {
                                switch (type) {
                                    case "title":     return <TitleForm key={id} {...formProps} />;
                                    case "banner":    return <BannerForm key={id} {...formProps} />;
                                    case "oneProduct":return <OneProductForm key={id} {...formProps} language={language} />;
                                    case "product":   return <ProductForm key={id} {...formProps} language={language} />;
                                    case "cta":       return <CTAForm key={id} {...formProps} />;
                                    case "legalNotice":return <LegalNotice key={id} {...formProps} />;
                                    default:          return null;
                                }
                            })();

                            return (
                                <div key={id} id={`form-${id}`} className="form-wrapper">
                                    {FormComponent}
                                </div>
                            );
                        })}
                    </div>

                    {/* Panneau ajout de blocs */}
                    <div id="create-button">
                        <div className="add-panel-label">Add a block</div>
                        <button type="button" className="add-btn" onClick={() => addForm("banner")}>
                            <i className="fa-solid fa-image"></i> Banner
                        </button>
                        <button type="button" className="add-btn" onClick={() => addForm("title")}>
                            <i className="fa-solid fa-heading"></i> Title
                        </button>
                        <button type="button" className="add-btn" onClick={() => addForm("oneProduct")}>
                            <i className="fa-solid fa-box"></i> 1 Product
                        </button>
                        <button type="button" className="add-btn" onClick={() => addForm("product")}>
                            <i className="fa-solid fa-boxes-stacked"></i> 2 Products
                        </button>
                        <button type="button" className="add-btn" onClick={() => addForm("cta")}>
                            <i className="fa-solid fa-arrow-pointer"></i> CTA
                        </button>
                        <button type="button" className="add-btn" onClick={() => addForm("legalNotice")}>
                            <i className="fa-solid fa-file-lines"></i> Legal Notice
                        </button>
                    </div>
                </div>

                {/* Actions finales */}
                <div id="button-container">
                    <button type="button" className="btn-primary" onClick={handleGenerateHTML}>
                        <i className="fa-solid fa-download"></i> Generate HTML
                    </button>
                    <button type="button" className="btn-secondary" onClick={handleReset}>
                        <i className="fa-solid fa-rotate-left"></i> Reset
                    </button>
                </div>

            </div>
        </>
    );
}

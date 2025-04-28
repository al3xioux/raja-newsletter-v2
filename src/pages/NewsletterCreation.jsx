import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TitleForm from "../components/TitleForm";
import BannerForm from "../components/BannerForm";
import OneProductForm from "../components/OneProductForm";
import ProductForm from "../components/ProductForm";
import CTAForm from "../components/CTAForm";
import LegalNotice from "../components/LegalNotice";

import generateHtml from "../utils/generateHtml";
import { HEADERS, FOOTERS } from "../data/var"; // par exemple si vous avez un objet HEADERS, FOOTERS

// Wrapper pour résoudre le problème de compatibilité avec React 18
const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);
  
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  
  if (!enabled) {
    return null;
  }
  
  return <Droppable {...props}>{children}</Droppable>;
};

export default function NewsletterCreation() {
    const [renderedForms, setRenderedForms] = useState([]);
    const [language, setLanguage] = useState("fr");
    const [documentTitle, setDocumentTitle] = useState("");
    const [headerTexte, setHeaderTexte] = useState("");
    const [activeFormId, setActiveFormId] = useState(null);
    const [completedForms, setCompletedForms] = useState({});

    // Référence pour le conteneur des formulaires
    const formsContainerRef = useRef(null);

    // Fonction pour faire défiler jusqu'au formulaire
    const scrollToForm = (formId) => {
        const formElement = document.getElementById(`form-${formId}`);
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveFormId(formId);
        }
    };

    // Réinitialiser le formulaire actif quand on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (formsContainerRef.current) {
                const forms = formsContainerRef.current.getElementsByClassName('form-wrapper');
                for (let form of forms) {
                    const rect = form.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 200) {
                        setActiveFormId(form.id.replace('form-', ''));
                        break;
                    }
                }
            }
        };

        const container = formsContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Fonction pour vérifier si un formulaire est complet
    const checkFormCompletion = (form) => {
        switch(form.type) {
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

    // Mise à jour de l'état de complétion lors de la modification d'un formulaire
    const updateFormData = (formId, newData) => {
        setRenderedForms((prev) => {
            const newForms = prev.map((item) => 
                item.id === formId ? { ...item, data: newData } : item
            );
            
            // Mettre à jour l'état de complétion
            const updatedForm = newForms.find(form => form.id === formId);
            if (updatedForm) {
                setCompletedForms(prev => ({
                    ...prev,
                    [formId]: checkFormCompletion(updatedForm)
                }));
            }
            
            return newForms;
        });
    };

    // Ajoute un bloc avec état de complétion initial
    const addForm = (type) => {
        const newId = Date.now();
        setRenderedForms((prev) => [...prev, { id: newId, type, data: {} }]);
        setCompletedForms(prev => ({ ...prev, [newId]: false }));
    };

    // Enlève un bloc et son état de complétion
    const removeForm = (formId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce bloc ?")) {
            setRenderedForms((prev) => prev.filter((x) => x.id !== formId));
            setCompletedForms(prev => {
                const newState = { ...prev };
                delete newState[formId];
                return newState;
            });
        }
    };

    // Toggle manuel de l'état de complétion
    const toggleCompletion = (e, formId) => {
        e.stopPropagation(); // Empêche le déclenchement du clic sur le nav-item
        setCompletedForms(prev => ({
            ...prev,
            [formId]: !prev[formId]
        }));
    };

    // Déplace un formulaire vers le haut
    const moveFormUp = (formId) => {
        setRenderedForms((prev) => {
            const index = prev.findIndex((form) => form.id === formId);
            if (index <= 0) return prev;
            
            const newForms = [...prev];
            [newForms[index - 1], newForms[index]] = [newForms[index], newForms[index - 1]];
            return newForms;
        });
    };

    // Déplace un formulaire vers le bas
    const moveFormDown = (formId) => {
        setRenderedForms((prev) => {
            const index = prev.findIndex((form) => form.id === formId);
            if (index === -1 || index === prev.length - 1) return prev;
            
            const newForms = [...prev];
            [newForms[index], newForms[index + 1]] = [newForms[index + 1], newForms[index]];
            return newForms;
        });
    };

    // Gère la sélection du pays
    const [showSelect, setShowSelect] = useState(false);
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    // Gère la saisie du Subject
    const handleDocumentTitleChange = (e) => {
        setDocumentTitle(e.target.value);
    };

    const handleHeaderTexteChange = (e) => {
        setHeaderTexte(e.target.value);
    };

    // Génération du HTML
    const handleGenerateHTML = () => {
        // Choix du header/footer
        const header = HEADERS[language] || "";
        const footer = FOOTERS[language] || "";

        // On appelle generateHtml en passant le titre, le headerTexte et la langue
        const html = generateHtml(renderedForms, header, footer, documentTitle, headerTexte, language);

        // Nom de fichier : si user n'a rien saisi, on met "newsletter".
        const fileName = documentTitle.trim() ? documentTitle.trim() : "newsletter";

        // Téléchargement
        const blob = new Blob([html], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName + ".html";
        link.click();
    };

    // Reset
    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset?")) {
            setRenderedForms([]);
            setLanguage("");
            setDocumentTitle("");
            setHeaderTexte("");
        }
    };

    // Gestionnaire de fin de drag and drop
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(renderedForms);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setRenderedForms(items);
    };

    return (
        <div>
            <h1>RAJA Newsletter Creation</h1>

            {/* LIGNE 1 : Subject + Country */}
            <form id="formglobal">
                <label htmlFor="documentTitle">Subject :</label>
                <input
                    type="text"
                    id="documentTitle"
                    value={documentTitle}
                    onChange={handleDocumentTitleChange}
                />

                <label htmlFor="headerTexte">Header Text :</label>
                    <input
                        type="text"
                        id="headerTexte"
                        value={headerTexte}
                        onChange={handleHeaderTexteChange}
                    />
                
                <label htmlFor="language">
                    <button
                        type="button"
                        onClick={() => setShowSelect(!showSelect)}
                        className="country-select-button">
                            <i class="fa-solid fa-flag" style={{color: "white"}}></i>
                    </button>
                </label>

                {showSelect && (
                    <select
                        id="language"
                        value={language}
                        onChange={handleLanguageChange}
                        style={{ 
                            display: "block", 
                            marginTop: "0",
                            width: "100px" 
                        }}
                    >
                        <option value="fr">fr</option>
                        <option value="uk">uk</option>
                        <option value="es">es</option>
                        <option value="de">de</option>
                        <option value="at">at</option>
                        <option value="bfl">bfl</option>
                        <option value="bfr">bfr</option>
                        <option value="cde">cde</option>
                        <option value="cfr">cfr</option>
                        <option value="cz">cz</option>
                        <option value="dk">dk</option>
                        <option value="hu">hu</option>
                        <option value="it">it</option>
                        <option value="nl">nl</option>
                        <option value="no">no</option>
                        <option value="pl">pl</option>
                        <option value="pt">pt</option>
                        <option value="se">se</option>
                        <option value="sk">sk</option>
                    </select>
                )}
            </form>

            {/* LIGNE 2 : #main-container (2 colonnes) */}
            <div id="main-container">
                <div id="navigation-card">
                    <h3>Newsletter Structure</h3>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <StrictModeDroppable droppableId="droppable-list">
                            {(provided) => (
                                <div
                                    id="navigation-items"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {renderedForms.map((form, index) => {
                                        const getFormTypeName = (type) => {
                                            switch(type) {
                                                case "banner": return "Banner";
                                                case "title": return "Title";
                                                case "oneProduct": return "1 Product";
                                                case "product": return "2 Products";
                                                case "cta": return "CTA";
                                                case "legalNotice": return "Legal Notice";
                                                default: return type;
                                            }
                                        };

                                        const isCompleted = completedForms[form.id];
                                        const completionClass = isCompleted ? 'completed' : 'incomplete';

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
                                                        className={`nav-item ${snapshot.isDragging ? 'dragging' : ''} ${
                                                            activeFormId === form.id ? 'active' : ''
                                                        }`}
                                                        onClick={() => scrollToForm(form.id)}
                                                    >
                                                        <span className="nav-number">{index + 1}</span>
                                                        <span className="nav-type">{getFormTypeName(form.type)}</span>
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
                                        <div style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', padding: '10px' }}>
                                            No items added
                                        </div>
                                    )}
                                </div>
                            )}
                        </StrictModeDroppable>
                    </DragDropContext>
                </div>

                <div id="corps" ref={formsContainerRef}>
                    {renderedForms.map((form) => {
                        const { id, type, data } = form;
                        const onChange = (d) => updateFormData(id, d);
                        const onRemove = () => removeForm(id);
                        const onMoveUp = () => moveFormUp(id);
                        const onMoveDown = () => moveFormDown(id);

                        const formProps = {
                            key: id,
                            data,
                            onChange,
                            onRemove,
                            onMoveUp,
                            onMoveDown
                        };

                        const FormComponent = (() => {
                            switch (type) {
                                case "title":
                                    return <TitleForm {...formProps} />;
                                case "banner":
                                    return <BannerForm {...formProps} />;
                                case "oneProduct":
                                    return <OneProductForm {...formProps} language={language} />;
                                case "product":
                                    return <ProductForm {...formProps} language={language} />;
                                case "cta":
                                    return <CTAForm {...formProps} />;
                                case "legalNotice":
                                    return <LegalNotice {...formProps} />;
                                default:
                                    return null;
                            }
                        })();

                        return (
                            <div key={id} id={`form-${id}`} className="form-wrapper">
                                {FormComponent}
                            </div>
                        );
                    })}
                </div>

                <div id="create-button">
                    <button type="button" onClick={() => addForm("banner")}>Add Banner</button>
                    <button type="button" onClick={() => addForm("title")}>Add Title</button>
                    <button type="button" onClick={() => addForm("oneProduct")}>Add 1 Product</button>
                    <button type="button" onClick={() => addForm("product")}>Add 2 Products</button>
                    <button type="button" onClick={() => addForm("cta")}>Add CTA</button>
                    <button type="button" onClick={() => addForm("legalNotice")}>Add Legal Notice</button>
                </div>
            </div>

            <div id="button-container">
                <button type="button" onClick={handleGenerateHTML}>
                    Generate HTML
                </button>
                <button type="button" onClick={handleReset}>
                    Reset Information
                </button>
            </div>
        </div>
    );
}
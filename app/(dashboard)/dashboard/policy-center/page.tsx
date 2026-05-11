"use client";

import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

const PolicyCenterPage = () => {
    const [activeTab, setActiveTab] = useState("terms");
    const termsEditorRef = useRef<any>(null);
    const privacyEditorRef = useRef<any>(null);

    const config = {
        readonly: false,
        height: 400,
        toolbarButtonSize: "middle",
        toolbarAdaptive: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: "insert_only",
        toolbar: ["bold", "italic", "underline", "strikethrough", "|", "ul", "ol", "|", "outdent", "indent", "|", "font", "fontsize", "brush", "paragraph", "|", "left", "center", "right", "justify", "|", "undo", "redo", "|", "cut", "copy", "paste"],
        disablePlugins: ["image", "file", "video", "media", "uploader", "filebrowser", "drag-and-drop"],
        uploader: {
            insertImageAsBase64URI: false,
            files: false,
            allowDragAndDropFileToEditor: false,
        },
        filebrowser: {
            ajax: {
                url: "",
            },
            disabled: true,
        },
    } as any;

    const handleSaveTerms = () => {
        if (termsEditorRef.current) {
            const content = termsEditorRef.current.value;
            console.log("Saving terms:", content);
            alert("Terms saved!");
        }
    };

    const handleSavePrivacy = () => {
        if (privacyEditorRef.current) {
            const content = privacyEditorRef.current.value;
            console.log("Saving privacy:", content);
            alert("Privacy policy saved!");
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1C1C]">Policy Center</h1>
                    <p className="text-[#78716C] mt-2 max-w-2xl">Manage your terms and conditions and privacy policy.</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-1 p-2 border-b border-[#F5F5F4]">
                    <button onClick={() => setActiveTab("terms")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "terms" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:text-[#1A1C1C] hover:bg-[#F5F5F4]"}`}>
                        Terms and Conditions
                    </button>
                    <button onClick={() => setActiveTab("privacy")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "privacy" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:text-[#1A1C1C] hover:bg-[#F5F5F4]"}`}>
                        Privacy Policy
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === "terms" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-[#1A1C1C]">Terms and Conditions</h2>
                            <div>
                                <JoditEditor ref={termsEditorRef} config={config} />
                            </div>
                            <button className="h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all" onClick={handleSaveTerms}>
                                Save Terms
                            </button>
                        </div>
                    )}

                    {activeTab === "privacy" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-[#1A1C1C]">Privacy Policy</h2>
                            <div>
                                <JoditEditor ref={privacyEditorRef} config={config} />
                            </div>
                            <button className="h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all" onClick={handleSavePrivacy}>
                                Save Privacy Policy
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PolicyCenterPage;

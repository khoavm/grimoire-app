import React, { useState } from 'react';
import type {QuestItem} from "@/type/type.tsx";
// Import interface từ file App
// Import interface từ file App

interface SubmissionModalProps {
    quest: QuestItem;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (content: string) => void;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({ quest, isOpen, onClose, onSubmit }) => {
    const [answer, setAnswer] = useState('');

    if (!isOpen) return null;

    return (
        // Overlay (Lớp nền mờ)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            {/* Modal Box */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fadeIn">

                {/* Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-lg">Nộp bài làm</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="mb-4">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{quest.type}</span>
                        <h2 className="text-xl font-bold text-slate-800 mt-1">{quest.title}</h2>
                        <p className="text-sm text-slate-500 mt-2">{quest.description}</p>
                    </div>

                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Câu trả lời của bạn:
                    </label>
                    <textarea
                        className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-slate-700"
                        placeholder="Ví dụ: Virtual Thread là một light-weight thread được quản lý bởi JVM..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                </div>

                {/* Footer */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={() => onSubmit(answer)}
                        disabled={!answer.trim()} // Disable nếu chưa nhập gì
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Gửi câu trả lời
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubmissionModal;
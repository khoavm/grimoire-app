import React from 'react';

// Định nghĩa kiểu dữ liệu cho Props
interface QuestCardProps {
    type: string;
    title: string;
    description: string;
    reward: string;
    onClick?: () => void; // Dấu '?' nghĩa là prop này không bắt buộc
    actionType: 'input_text' | 'check_in' | 'link';
}

const QuestCard: React.FC<QuestCardProps> = ({
                                                 type,
                                                 title,
                                                 description,
                                                 reward,
                                                 onClick
                                             }) => {

    // Hàm helper định kiểu trả về là string
    const getTypeStyle = (typeStr: string): string => {
        switch (typeStr.toLowerCase()) {
            case 'kiến thức':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'sự kiện':
                return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'chính tuyến':
                return 'bg-orange-50 text-orange-700 border-orange-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div
            onClick={onClick}
            className="
        group relative w-full max-w-sm bg-white
        rounded-xl border border-slate-200 shadow-sm
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 cursor-pointer
        overflow-hidden
      "
        >
            <div className="p-6">
                {/* --- Phần Header: Loại Quest --- */}
                <div className="flex items-center justify-between mb-3">
          <span className={`
            px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border
            ${getTypeStyle(type)}
          `}>
            {type}
          </span>

                    {/* Icon mũi tên (Trang trí) */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {/* --- Phần Body: Tên & Mô tả --- */}
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {description}
                </p>

                {/* --- Đường kẻ phân cách --- */}
                <div className="border-t border-slate-100 mb-4"></div>

                {/* --- Phần Footer: Phần thưởng --- */}
                <div className="flex items-center gap-2 text-emerald-600 font-semibold bg-emerald-50/50 p-2 rounded-lg -mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 5h1v1a1 1 0 01-2 0V7zm5-5a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zm0 5h1v1a1 1 0 01-2 0V7zM6 10a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm5-4a1 1 0 011 1v9a1 1 0 11-2 0V7a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{reward}</span>
                </div>
            </div>
        </div>
    );
};

export default QuestCard;
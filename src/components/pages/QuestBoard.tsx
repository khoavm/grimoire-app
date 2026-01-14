import  {useState} from "react";
import type {QuestItem} from "@/type/type.tsx";
import SubmissionModal from "@/components/ui/submissionmodal.tsx";
import QuestCard from "@/components/ui/questcard.tsx";

const quests: QuestItem[] = [
    {
        id: 1,
        type: "Kiến thức",
        title: "Giải thích Virtual thread",
        description: "Hãy giải thích ngắn gọn Virtual Thread là gì và sự khác biệt so với Platform Thread",
        reward: "10 Xu + 5 EXP",
        actionType: "input_text"
    }
];


export default function QuestBoard() {
    const [selectedQuest, setSelectedQuest] = useState<QuestItem | null>(null);
    // Xử lý khi click vào Card
    const handleQuestClick = (quest: QuestItem) => {
        if (quest.actionType === 'input_text') {
            // Nếu là loại nhập liệu -> Mở Modal
            setSelectedQuest(quest);
        } else {
            // Nếu là loại khác -> Xử lý ngay (ví dụ alert hoặc API call)
            alert(`Đã nhận thưởng check-in: ${quest.title}`);
        }
    };

    // Xử lý khi nhấn nút Gửi trong Modal
    const handleSubmitAnswer = (content: string) => {
        console.log(`Đang gửi câu trả lời cho quest [${selectedQuest?.id}]:`, content);

        // Giả lập call API...
        setTimeout(() => {
            alert("Nộp bài thành công! Phần thưởng đã được gửi.");
            setSelectedQuest(null); // Đóng Modal
        }, 500);
    };
    return <div className="m-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {quests.map((quest) => (
                <QuestCard
                    key={quest.id}
                    type={quest.type}
                    title={quest.title}
                    description={quest.description}
                    reward={quest.reward}
                    actionType={quest.actionType}
                    onClick={() => handleQuestClick(quest)}
                />
            ))}
        </div>
        {selectedQuest && (
            <SubmissionModal
                quest={selectedQuest}
                isOpen={!!selectedQuest}
                onClose={() => setSelectedQuest(null)}
                onSubmit={handleSubmitAnswer}
            />
        )}
    </div>
}
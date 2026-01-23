import  {useState} from "react";
import SubmissionModal from "@/components/ui/submissionmodal.tsx";
import QuestCard from "@/components/ui/questcard.tsx";
import {useQuery} from "@tanstack/react-query";
import {type GetQuestListRequest, type QuestDTO} from "@/api/grimoire_svc";
import {questApi} from "@/lib/api.ts";

// const quests: QuestItem[] = [
//     {
//         id: 1,
//         type: "Kiến thức",
//         title: "Giải thích Virtual thread",
//         description: "Hãy giải thích ngắn gọn Virtual Thread là gì và sự khác biệt so với Platform Thread",
//         reward: "10 Xu + 5 EXP",
//         actionType: "input_text"
//     }
// ];


export default function QuestBoard() {
    const [selectedQuest, setSelectedQuest] = useState<QuestDTO | null>(null);

    const [filters] = useState<GetQuestListRequest>({
        page: 0,
        size: 10,
        query: "",
        type: ""
    });
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["quests", filters],
        queryFn: async () => {
            const response = await questApi.getQuestList(filters)
            return response.data;
        }
    })
    const questList = data?.data?.data || [];

    // Xử lý khi click vào Card
    const handleQuestClick = (quest: QuestDTO) => {
        console.log(quest);
        if (quest.actionType === 'input_text') {
            // Nếu là loại nhập liệu -> Mở Modal
            setSelectedQuest(quest);
        } else {
            // Nếu là loại khác -> Xử lý ngay (ví dụ alert hoặc API call)
            alert(`Đã nhận thưởng check-in: ${quest.title}`);
        }
    };


    return <div className="m-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {questList.map((quest) => (
                <QuestCard
                    key={quest.id}
                    type={quest.type}
                    title={quest.title}
                    description={quest.description}
                        reward={"10 Xu + 5 EXP"}
                    actionType={quest.actionType}
                    onClick={() => handleQuestClick(quest)}
                />
            ))}
            {isError && <p>Errror: {error.message}</p>}
            {isLoading && <p>Loading...</p>}
        </div>
        {selectedQuest && (
            <SubmissionModal
                quest={selectedQuest}
                isOpen={!!selectedQuest}
                onClose={() => setSelectedQuest(null)}
            />
        )}
    </div>
}
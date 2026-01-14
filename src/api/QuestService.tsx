// api/questService.ts

// Định nghĩa kiểu dữ liệu trả về từ Server (ví dụ)
interface SubmitResponse {
    success: boolean;
    message: string;
    newExp: number;
}

export const submitQuestAnswer = async (questId: number, answer: string): Promise<SubmitResponse> => {
    try {
        // Gọi API thực tế
        const response = await fetch('https://api.your-backend.com/quests/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ...token...' // Nếu cần token xác thực
            },
            body: JSON.stringify({
                questId: questId,
                content: answer,
                submittedAt: new Date().toISOString()
            }),
        });

        if (!response.ok) {
            throw new Error('Lỗi server: Không thể nộp bài.');
        }

        return await response.json();
    } catch (error) {
        // Ném lỗi ra để Component bắt được và hiển thị
        console.log("Error when call submitQuestAnswer", error)
        throw error;
    }
};
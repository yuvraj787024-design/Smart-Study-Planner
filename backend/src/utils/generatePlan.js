const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

async function generatePlan({
    examName,
    studyHours,
    examDate,
    subjects
}) {

    try {

        const subjectList = Array.isArray(subjects)
            ? subjects.join(", ")
            : subjects;

        const prompt = `
Create a SHORT and SIMPLE study planner.

Exam: ${examName}
Exam Date: ${examDate}
Study Hours Per Day: ${studyHours}
Subjects: ${subjectList}

Instructions:
- Keep response under 250 words
- Give only important points
- Make weekly schedule
- Use short bullet points
- Avoid long explanations
- Avoid motivational text
- Keep it clean and easy to read

Format:

Week 1:
- Topic
- Topic

Week 2:
- Topic
- Topic

Daily Routine:
- Current Affairs
- Revision
- Mock Test
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
    
        });

        return response.candidates[0].content.parts[0].text;

    } catch (error) {

        console.log("🔥 GOOGLE API ERROR:");
        console.log(error);

        throw new Error(
            error.message || "Error generating study plan"
        );
    }
}

module.exports = generatePlan;
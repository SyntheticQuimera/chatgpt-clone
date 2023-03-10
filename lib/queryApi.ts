import openai from './chatgpt'

const query = async (prompt: string, chatId: string, model: string) => {

    const res = await openai
        .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],

        })
        .then((res) => res.data.choices[0].message?.content)
        .catch((error) => {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
        })
    return res;
}

export default query;
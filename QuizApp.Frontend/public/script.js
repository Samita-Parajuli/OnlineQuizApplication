const loadQuizzes = async () => {
    try {
        const response = await axios.get('http://localhost:5248/quiz');
        const quizzes = response.data;
        displayQuizzes(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
    }
};

const displayQuizzes = (quizzes) => {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    quizzes.forEach((quiz, quizIndex) => {
        const quizElement = document.createElement('div');
        quizElement.innerHTML = `<h3>${quiz.title}</h3>`;

        quiz.questions.forEach((question, questionIndex) => {
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `<p>${questionIndex + 1}. ${question.text}</p>`;

            const optionsElement = document.createElement('div');
            question.options.forEach((option, optionIndex) => {
                const optionInput = document.createElement('input');
                optionInput.type = 'radio';
                optionInput.name = `quiz-${quizIndex}-question-${questionIndex}`;
                optionInput.value = optionIndex;

                const optionLabel = document.createElement('label');
                optionLabel.textContent = option.text;

                optionsElement.appendChild(optionInput);
                optionsElement.appendChild(optionLabel);
                optionsElement.appendChild(document.createElement('br'));
            });

            questionElement.appendChild(optionsElement);
            quizElement.appendChild(questionElement);
        });

        quizContainer.appendChild(quizElement);
    });
};


// Call loadQuizzes when the page loads
//window.onload = loadQuizzes;

document.getElementById('submit-button').addEventListener('click', async () => {
    const quizzes = document.querySelectorAll('#quiz-container > div');
    const responses = [];

    quizzes.forEach((quizElement, quizIndex) => {
        const questions = quizElement.querySelectorAll('div > div');

        questions.forEach((questionElement, questionIndex) => {
            const selectedOption = questionElement.querySelector(`input[name="quiz-${quizIndex}-question-${questionIndex}"]:checked`);
            if (selectedOption) {
                responses.push({
                    quizId: quizIndex,
                    questionId: questionIndex,
                    selectedOption: parseInt(selectedOption.value)
                });
            }
        });
    });

    try {
        const response = await axios.post('http://localhost:5248/quiz/submit', responses);
        console.log(response.data);
        alert('Quiz submitted successfully!');
    } catch (error) {
        console.error('Error submitting quiz:', error);
    }
});

// Call loadQuizzes when the page loads
window.onload = loadQuizzes;




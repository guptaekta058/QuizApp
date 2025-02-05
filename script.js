document.addEventListener("DOMContentLoaded", () => {
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const nextButton = document.getElementById("next");
    const scoreDisplay = document.getElementById("score");
    
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
  
    function fetchQuestions() {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((res) => res.json())
        .then((data) => {
          questions = data.results;
          showQuestion();
        })
        .catch((error) => console.error("Error fetching questions:", error));
    }
  
    function showQuestion() {
      if (currentQuestionIndex >= questions.length) {
        questionContainer.innerHTML = "Quiz Completed!";
        optionsContainer.innerHTML = `Final Score: ${score} / ${questions.length}`;
        nextButton.style.display = "none";
        return;
      }
      
      const { question, correct_answer, incorrect_answers } = questions[currentQuestionIndex];
      const options = [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5);
      
      questionContainer.innerHTML = question;
      optionsContainer.innerHTML = "";
      options.forEach((option) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => handleAnswer(option, correct_answer));
        optionsContainer.appendChild(button);
      });
    }
  
    function handleAnswer(selected, correct) {
      if (selected === correct) {
        score++;
      }
      scoreDisplay.innerText = `Score: ${score}`;
      currentQuestionIndex++;
      showQuestion();
    }
  
    nextButton.addEventListener("click", showQuestion);
    fetchQuestions();
  });
  

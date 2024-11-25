import React, { useRef, useState } from "react";
import "./App.css";
import "./index.css";
import Confetti from "react-confetti";

const tests = [
  {
    id: "verbal",
    title: "SAT verbal",
    color: "#86429A",
    questions: [
      {
        text: "Укажите правильный ответ для вербального задания.",
        options: ["Ответ 1", "Ответ 2", "Ответ 3"],
        correct: 1,
      },
      {
        text: "Какой из вариантов соответствует грамматическому правилу?",
        options: ["Вариант А", "Вариант B", "Вариант C"],
        correct: 2,
        image: "https://via.placeholder.com/400x200",
      },
    ],
    resultDescription: "Вы можете претендовать на поступление в хорошие вузы.",
  },
  {
    id: "math",
    title: "SAT math",
    color: "#FF7F00",
    questions: [
      {
        text: "Чему равно 2 + 2?",
        options: ["3", "4", "5"],
        correct: 1,
      },
      {
        text: "Решите уравнение: x² = 16. Найдите x.",
        options: ["4", "-4", "4 и -4"],
        correct: 2,
        image: "https://via.placeholder.com/400x200",
      },
    ],
    resultDescription:
      "Вы допускаетесь к занятиям по SAT math, но нужно улучшить базу.",
  },
  {
    id: "placement",
    title: "PLACEMENT TEST",
    color: "#00A9CE",
    questions: [
      {
        text: "На каком языке программа 'Hello World'?",
        options: ["JavaScript", "Python", "C++"],
        correct: 1,
        image: "https://via.placeholder.com/400x200",
      },
      {
        text: "Выберите правильный перевод слова 'Placement'.",
        options: ["Расположение", "Место", "Тест"],
        correct: 0,
      },
    ],
    resultDescription:
      "Рекомендуется улучшить знания по грамматике для качественного обучения.",
  },
];

const images = [
  "https://img1.akspic.ru/previews/5/3/0/9/7/179035/179035-voda-gora-gidroresursy-rastenie-oblako-500x.jpg",
  "https://img.freepik.com/premium-vector/beautiful-landscape-nature-background-images-free-download-freepik-vector_1305309-1561.jpg",
  "https://img.freepik.com/fotos-premium/hermosos-paisajes-lagos-hermosos-paisajos-lagos_1234738-411657.jpg?w=1800",
];

function App() {
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const testContainerRef = useRef(null);


  const currentTest = tests[currentTestIndex];
  const currentQuestion = currentTest.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      alert("Выберите ответ перед переходом к следующему вопросу.");
      return;
    }

    const isCorrect = selectedOption === currentQuestion.correct;

    setResults((prev) => [
      ...prev,
      {
        testId: currentTest.id,
        isCorrect,
      },
    ]);

    if (currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentTestIndex < tests.length - 1) {
      setCurrentTestIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setIsCompleted(true);
    }

    setSelectedOption(null);
  };

  const resetTests = () => {
    setCurrentTestIndex(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setResults([]);
    setIsCompleted(false);
  };

  const calculateResults = (testId) => {
    const testResults = results.filter((result) => result.testId === testId);
    return testResults.reduce((acc, curr) => (curr.isCorrect ? acc + 1 : acc), 0);
  };


  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Слайдер */}
      <div className="image-container">
        <div className="slider-container">
          <div className="slider">
            <button className="nav-button prev" onClick={handlePrev}>
              &#8249;
            </button>
            <img
              src={images[currentIndex]}
              alt={`Картинка ${currentIndex + 1}`}
              className="slide-image"
            />
            <button className="nav-button next" onClick={handleNext}>
              &#8250;
            </button>
          </div>
          <div className="pagination">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
        <img src="/images/Фон.png" alt="Фон" className="image" />
      </div>

      {/* Описание */}
      <div className="impact-planner">
        <h1>
          <span className="impact-planner-title">ImpactPlanner</span> - это дорожная карта карьеры!
        </h1>
        <p className="subtitle">
          Примите обоснованное решение о высшем образовании и карьере.
        </p>
        <p className="description">
          Инновационный инструмент сочетает в себе анализ карьерных перспектив,
          финансового планирования и тестирования, чтобы помочь вам сделать
          осознанный выбор.
        </p>
        <p className="description">
          <span className="description-word">Мы создали</span> инновационный инструмент, который объединяет карьерное
          планирование, финансовый анализ оплаты за обучение и затрат на
          проживание, а также тестирование SAT (Verbal и Math), Placement Test,
          что поможет вам сделать осознанный выбор страны обучения и карьеры.
        </p>
        <h2>Из чего состоит:</h2>
        <div className="block">
          <div className="block-item">
            <div className="block-item-elements">
              <h3>Тестирование SAT и Placement Test</h3>
              <ul class="styled-list">
                <li>
                  <b>SAT Verbal</b> – проверьте свои навыки чтения, понимания текста
                  и грамматики.
                </li>
                <li>
                  <b>SAT Math</b> – убедитесь в своей готовности решать
                  математические задачи.
                </li>
                <li>
                  <b>Placement Test</b> – определите свой уровень знаний и получите
                  персональные рекомендации.
                </li>
              </ul>
              <div className="time-wrapper">
                <img src="images/clock_kzujk1gokfss 1.svg" alt="Clock Icon" className="time-icon" />
                <p className="time">от 35 минут</p>
              </div>
            </div>
            <div className="icon">
              <img src="/images/Online-Test-2--Streamline-Free-Illustrations.svg.png" alt="Иконка тестирования" />
            </div>
          </div>
          <div className="block-item-margin">
            <div className="icon">
              <img src="/images/Conversation-Businessman-Customer-1--Streamline-Free-Illustrations.svg.png" alt="Иконка калькулятора" />
            </div>
            <div className="block-item-elements">
              <h3>Финансовый калькулятор*</h3>
              <ul class="styled-list">
                <li>Рассчитайте затраты на обучение.</li>
                <li>Финансовый план расходов.</li>
              </ul>
              <p className="block-item-elements-paragraph">
                <b>Результат:</b> Прогноз стоимости жизни в выбранной стране
                обучения.
              </p>
              <div className="time-wrapper">
                <img src="images/clock_kzujk1gokfss 1.svg" alt="Clock Icon" className="time-icon" />
                <p className="time">мгновенно</p>
              </div>
            </div>
          </div>
          <div className="block-item-margin">
            <div className="block-item-elements">
              <h3>Карьерный калькулятор*</h3>
              <ul class="styled-list">
                <li>Оценка перспектив зарплат по выбранной специальности.</li>
                <li>Прогноз востребованности профессии в выбранной стране.</li>
              </ul>
              <p className="block-item-elements-paragraph">
                <b>Результат:</b> Четкий срок окупаемости инвестиций в образование.
              </p>
              <div className="time-wrapper">
                <img src="images/clock_kzujk1gokfss 1.svg" alt="Clock Icon" className="time-icon" />
                <p className="time">мгновенно</p>
              </div>
            </div>
            <div className="icon">
              <img src="/images/Smart-People-1--Streamline-Free-Illustrations.svg.png" alt="Иконка карьеры" />
            </div>
          </div>
        </div>
        <p className="impact-planner-footer">данные 2024 года*</p>
      </div>

      <div className="impact-container">
        <h1 className="impact-title">
          Как работает <span className="impact-highlight">ImpactPlanner</span>
        </h1>
        <p className="impact-intro">
          Планируете обучение за границей или в другом городе? Наш калькулятор поможет вам рассчитать финансовые затраты на образование и проживание, а также узнать о возможной зарплате выпускников. Воспользуйтесь этой простой формой, чтобы учесть все необходимые расходы и выбрать подходящую профессию.
        </p>

        <div className="impact-steps">
          <div className="impact-step">
            <div className="impact-step-number">01</div>
            <h3 className="impact-step-title">Заполните основные данные</h3>
            <p className="impact-step-description">
              Заполните основные данные о городе и вузе.
              Включайте такие поля как базовые стоимости и пожелания выбранной профессии.
            </p>
          </div>
          <div className="impact-step">
            <div className="impact-step-number">02</div>
            <h3 className="impact-step-title">Рассчитайте расходы</h3>
            <p className="impact-step-description">
              Внесенные данные помогут подготовить финансовый план, включающий расходы
              на обучение, проживание, питание и транспорт.
            </p>
          </div>
          <div className="impact-step">
            <div className="impact-step-number">03</div>
            <h3 className="impact-step-title">Выберите профессию и направление</h3>
            <p className="impact-step-description">
              Выберите направление будущей профессии, чтобы увидеть прогнозы зарплаты
              и востребованности на рынке.
            </p>
          </div>
        </div>

        <p className="impact-footer">
          Мы покажем вам, как легко и быстро рассчитать все необходимые затраты с помощью калькулятора
        </p>
      </div>

      <div className="video-block">
        <p className="video-description">
          Посмотрите, как с помощью <span className="highlight">ImpactPlanner</span> вы сможете рассчитать бюджет, спланировать карьеру и подготовиться к поступлению. Мы расскажем, как в три шага получить персональный план.
        </p>
        <div className="video-container">
          <div className="video-placeholder">
            <button className="play-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="play-icon"
              >
                <polygon points="5 3, 19 12, 5 21, 5 3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="cta-block">
        <div className="cta-content">
          <h2 className="cta-title">Готовы сделать первый шаг к карьере вашей мечты?</h2>
          <p className="cta-description">
            Позвоните в Impact Admission, и наши эксперты индивидуально помогут вам подобрать лучший университет.
          </p>
        </div>
        <div className="cta-button-container">
          <button className="cta-button">Позвонить</button>
        </div>
      </div>

      <div className="test-container" ref={testContainerRef}>
        {/* Конфетти появляется только в области контейнера */}
        {isCompleted && testContainerRef.current && (
          <Confetti
            width={testContainerRef.current.offsetWidth} // Ширина контейнера
            height={testContainerRef.current.offsetHeight} // Высота контейнера
            numberOfPieces={300} // Количество конфетти
            recycle={false} // Отключить перезапуск
          />
        )}
        {!isCompleted ? (
          <div
            className="test-card"
            style={{ borderColor: currentTest.color }}
          >
            <h2 style={{ color: currentTest.color }}>{currentTest.title}</h2>
            <p>
              Вопрос {currentQuestionIndex + 1} из{" "}
              {currentTest.questions.length}
            </p>
            <div className="question">
              <h3>{currentQuestion.text}</h3>
              {currentQuestion.image && (
                <img
                  src={currentQuestion.image}
                  alt="Иллюстрация вопроса"
                  className="question-image"
                />
              )}
            </div>
            <form className="answers">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="option">
                  <input
                    type="radio"
                    name="answer"
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                  />
                  {option}
                </label>
              ))}
            </form>
            <button
              className="next-button"
              style={{ backgroundColor: currentTest.color }}
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < currentTest.questions.length - 1
                ? "Следующий вопрос"
                : currentTestIndex < tests.length - 1
                  ? "Перейти к следующему тесту"
                  : "Завершить тест"}
            </button>
          </div>
        ) : (
          <div className="results-card">
            <h2>Результаты теста</h2>
            {tests.map((test) => (
              <div key={test.id} className="result-block">
                <h3 style={{ color: test.color }}>{test.title}</h3>
                <p>
                  Набрано правильных ответов: {calculateResults(test.id)} из{" "}
                  {test.questions.length}.
                </p>
                <p>{test.resultDescription}</p>
              </div>
            ))}
            <button className="restart-button" onClick={resetTests}>
              Пройти заново
            </button>
          </div>
        )}
      </div>

      <div className="app-container">
        {/* Блок оплаты */}
        <section className="payment-block">
          <h2>Мы стремимся сделать качественное планирование доступным каждому!</h2>
          <p>
            С ImpactPlanner вы получите мгновенный результат <a href="#">всего за $10</a>.
          </p>
          <p>
            Аналогичные услуги консультантов стоят $1000 и требуют до 2 недель работы.
          </p>

          <div className="payment-details">
            <h3>Как оплатить?</h3>
            <ul>
              <li>Заполните ваши имя, email и телефон.</li>
              <li>Выберите способ оплаты и оплатите.</li>
              <li>
                В течение 5 минут на указанный email придет результат.
              </li>
            </ul>
          </div>

          <form className="personal-data-form">
            <input type="text" placeholder="Имя" required />
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Телефон" required />
            <button type="submit" className="pay-button">Оплатить</button>
            <label>
              <input type="checkbox" required />
              Я принимаю пользовательское соглашение.
            </label>
          </form>
        </section>

        {/* Блок планирования бюджета */}
        <section className="budget-planning-block">
          <h2>Планирование образовательного бюджета</h2>

          <div className="financial-calculator">
            <h3>Финансовый калькулятор — ваш гид по затратам на образование.</h3>
            <ul>
              <li>Рассчитайте стоимость обучения и проживания в выбранной стране.</li>
              <li>
                Узнайте прогноз финансовой отдачи в выбранной стране.
              </li>
              <li>
                Подготовьте финансовый план с учетом ваших целей и возможностей.
              </li>
            </ul>

            <div className="financial-form">
              <select>
                <option>Выберите страну поступления</option>
              </select>
              <select>
                <option>Выберите формат обучения</option>
              </select>
              <select>
                <option>Требуется ли финансовая помощь</option>
              </select>
            </div>
          </div>

          <div className="career-calculator">
            <h3>Карьерный калькулятор — ваш инструмент для оценки окупаемости образования.</h3>
            <ul>
              <li>Определите будущую профессию и уровень дохода.</li>
              <li>Узнайте срок окупаемости вложений в образование.</li>
            </ul>

            <div className="career-form">
              <select>
                <option>Выберите профессию для поступления</option>
              </select>
              <select>
                <option>Выберите прогноз дохода</option>
              </select>
            </div>
          </div>

          <button className="generate-button">Генерировать результат</button>
          <p className="footer-text">Осознанный выбор специальности и уверенность в будущем ребёнка.</p>
        </section>
      </div>
    </>
  );
}

export default App;

import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import '../index.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const countries = ["США", "Канада", "Германия", "Великобритания", "Австралия"];
const formats = ["Очное обучение", "Дистанционное обучение", "Смешанное обучение"];
const budgets = ["10,000$", "20,000$", "30,000$", "40,000$"];
const livingCosts = ["1,000$", "1,500$", "2,000$", "2,500$"];

// Направления и связанные профессии
const directionProfessionMapping = {
    Информатика: ["Инженер AI", "Программист", "Системный аналитик"],
    Медицина: ["Хирург", "Терапевт", "Кардиолог"],
    Маркетинг: ["Маркетолог", "Менеджер по рекламе", "Директор по маркетингу"],
    Дизайн: ["Графический дизайнер", "UX/UI дизайнер", "Моушн-дизайнер"],
};

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
    "/images/IP1.png",
    "/images/IP2.png",
    "/images/IP3.png",
];

const MainPage = () => {

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(
        localStorage.getItem("paymentCompleted") === "true"
    );

    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedFormat, setSelectedFormat] = useState("");
    const [selectedBudget, setSelectedBudget] = useState("");
    const [selectedLivingCost, setSelectedLivingCost] = useState("");
    const [selectedDirection, setSelectedDirection] = useState("");
    const [selectedProfession, setSelectedProfession] = useState("");

    // Получение списка профессий на основе выбранного направления
    const professions = selectedDirection
        ? directionProfessionMapping[selectedDirection]
        : [];

    const handleGenerateResult = () => {
        if (
            !selectedCountry ||
            !selectedFormat ||
            !selectedBudget ||
            !selectedLivingCost ||
            !selectedFinancialAid ||
            !selectedDirection ||
            !selectedProfession
        ) {
            alert("Все поля должны быть заполнены!");
            return;
        }

        if (paymentCompleted) {
            // Если оплата уже завершена, переходим на страницу результатов
            navigate("/result", {
                state: {
                    country: selectedCountry,
                    format: selectedFormat,
                    budget: selectedBudget,
                    livingCost: selectedLivingCost,
                    financialAid: selectedFinancialAid,
                    direction: selectedDirection,
                    profession: selectedProfession,
                },
            });
        } else {
            // Иначе открываем модальное окно
            setIsModalOpen(true);
        }
    };


    const [activeFAQ, setActiveFAQ] = useState(null);

    const handleFAQClick = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };

    const [selectedFinancialAid, setSelectedFinancialAid] = useState(""); // Финансовая помощь

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

    const handlePaymentCompletion = async (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        const form = event.target.closest("form");
        const formData = {
            name: form.querySelector('input[placeholder="Имя"]').value.trim(),
            email: form.querySelector('input[placeholder="Email"]').value.trim(),
            phone: form.querySelector('input[placeholder="Телефон"]').value.trim(),
        };

        // Проверяем, что все поля заполнены
        if (!formData.name || !formData.email || !formData.phone) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        try {
            // 1. Регистрация пользователя
            const userResponse = await axios.post("http://80.90.183.87/users/", {
                username: formData.email, // Используем email как имя пользователя
                password: "test", // Фиксированный пароль
                name: formData.name,
                phone: formData.phone,
            });

            console.log("User created:", userResponse.data);

            // 2. Получение токена
            const tokenResponse = await axios.post("http://80.90.183.87/api/token/", {
                username: formData.email,
                password: "test",
            });

            const accessToken = tokenResponse.data.access; // Достаем токен
            console.log("Access Token:", accessToken);

            // 3. Получение payment URL
            const paymentResponse = await axios.get("http://80.90.183.87/payment/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (paymentResponse.status === 200 && paymentResponse.data.payment_url) {
                const paymentUrl = paymentResponse.data.payment_url;
                console.log("Payment URL:", paymentUrl);

                // Обновляем флаг оплаты и сохраняем его
                setPaymentCompleted(true);
                localStorage.setItem("paymentCompleted", "true");

                // Перенаправляем пользователя на страницу оплаты
                window.location.href = paymentUrl;
            } else {
                alert("Ошибка: Не удалось получить ссылку на оплату. Попробуйте позже.");
            }
        } catch (error) {
            // Улучшенная обработка ошибок
            if (error.response) {
                console.error("Ошибка ответа сервера:", error.response.data);
                alert(`Ошибка: ${error.response.data.detail || "Попробуйте снова."}`);
            } else if (error.request) {
                console.error("Ошибка запроса:", error.request);
                alert("Ошибка: Сервер не отвечает. Попробуйте позже.");
            } else {
                console.error("Неизвестная ошибка:", error.message);
                alert("Неизвестная ошибка. Проверьте данные и попробуйте снова.");
            }
        }
    };



    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef(null);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Автоматическое переключение слайдов каждые 3 секунды
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            handleNext();
        }, 3000); // Интервал в миллисекундах

        return () => clearInterval(intervalRef.current); // Очистка интервала при размонтировании
    }, []);

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
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                                &times;
                            </button>
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
                                    <li>В течение 5 минут на указанный email придет результат.</li>
                                </ul>
                            </div>
                            <form className="personal-data-form">
                                <input type="text" placeholder="Имя" required />
                                <input type="email" placeholder="Email" required />
                                <input type="tel" placeholder="Телефон" required />
                                <button
                                    type="button"
                                    className="pay-button"
                                    onClick={handlePaymentCompletion}
                                >
                                    Оплатить
                                </button>
                                <label>
                                    <input type="checkbox" required />
                                    Я принимаю пользовательское соглашение.
                                </label>
                            </form>
                        </div>
                    </div>
                )}


                {/* Блок планирования бюджета */}
                <section className="budget-planning-block">
                    <h2>Планирование образовательного бюджета</h2>

                    <div className="financial-calculator">
                        <h3>Финансовый калькулятор — ваш гид по затратам на образование.</h3>
                        <ul>
                            <li>Рассчитайте стоимость обучения и проживания в выбранной стране.</li>
                            <li>Узнайте прогноз финансовой отдачи в выбранной стране.</li>
                            <li>Подготовьте финансовый план с учетом ваших целей и возможностей.</li>
                        </ul>

                        <div className="financial-form">
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                                <option value="">Выберите страну поступления</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedFormat}
                                onChange={(e) => setSelectedFormat(e.target.value)}
                            >
                                <option value="">Выберите формат обучения</option>
                                {formats.map((format, index) => (
                                    <option key={index} value={format}>
                                        {format}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedBudget}
                                onChange={(e) => setSelectedBudget(e.target.value)}
                            >
                                <option value="">Средний бюджет на обучение</option>
                                {budgets.map((budget, index) => (
                                    <option key={index} value={budget}>
                                        {budget}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedLivingCost}
                                onChange={(e) => setSelectedLivingCost(e.target.value)}
                            >
                                <option value="">Месячные затраты на проживание</option>
                                {livingCosts.map((cost, index) => (
                                    <option key={index} value={cost}>
                                        {cost}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Поле для финансовой помощи */}
                    <div className="financial-aid">
                        <p>Требуется ли финансовая помощь</p>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="financialAid"
                                    value="Грант"
                                    checked={selectedFinancialAid === "Грант"}
                                    onChange={(e) => setSelectedFinancialAid(e.target.value)}
                                />
                                Грант
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="financialAid"
                                    value="Не требуется"
                                    checked={selectedFinancialAid === "Не требуется"}
                                    onChange={(e) => setSelectedFinancialAid(e.target.value)}
                                />
                                Не требуется
                            </label>
                        </div>
                    </div>


                    <div className="career-calculator">
                        <h3>Карьерный калькулятор — ваш инструмент для оценки окупаемости образования.</h3>
                        <ul>
                            <li>Определите направление и профессию для поступления.</li>
                            <li>Узнайте срок окупаемости вложений в образование.</li>
                        </ul>

                        <div className="career-form">
                            <select
                                value={selectedDirection}
                                onChange={(e) => {
                                    setSelectedDirection(e.target.value);
                                    setSelectedProfession(""); // Сброс профессии при смене направления
                                }}
                            >
                                <option value="">Выберите направление</option>
                                {Object.keys(directionProfessionMapping).map((direction, index) => (
                                    <option key={index} value={direction}>
                                        {direction}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={selectedProfession}
                                onChange={(e) => setSelectedProfession(e.target.value)}
                                disabled={!professions.length} // Отключение списка, если нет профессий
                            >
                                <option value="">Выберите профессию</option>
                                {professions.map((profession, index) => (
                                    <option key={index} value={profession}>
                                        {profession}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button className="generate-button" onClick={handleGenerateResult}>
                        Генерировать результат
                    </button>
                    <p className="footer-text">Осознанный выбор специальности и уверенность в будущем ребёнка.</p>
                </section>
            </div>

            <div className="main-container">
                {/* FAQ Section */}
                <section className="faq-section">
                    <h2>FAQ</h2>
                    <div className="faq-list">
                        {[
                            "Сколько это стоит?",
                            "Почему я должен доверять результатам?",
                            "Сколько времени займет тест?",
                            "Могу ли я работать в калькуляторе постоянно?",
                        ].map((question, index) => (
                            <div
                                key={index}
                                className={`faq-item ${activeFAQ === index ? "expanded" : ""}`}
                                onClick={() => handleFAQClick(index)}
                            >
                                <div className="faq-header">
                                    <span className="faq-index">{`0${index + 1}`}</span>{" "}
                                    <span className="faq-question">{question}</span>
                                    <span className="faq-toggle-icon">
                                        {activeFAQ === index ? <FiChevronUp /> : <FiChevronDown />}
                                    </span>
                                </div>
                                {activeFAQ === index && (
                                    <div className="faq-content">
                                        Здесь вы можете добавить развернутый ответ на вопрос "{question}".
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* University Section */}
                <section className="university-section">
                    <h2>Университет вашей мечты ждет вас!</h2>
                    <p className="university-intro">
                        <b>Impact Admission</b> — это команда экспертов, которые уже 5 лет
                        помогают абитуриентам поступать в топовые вузы мира. Мы знаем, как
                        важно правильно спланировать поступление и подготовить сильный
                        профиль.
                    </p>

                    <h3 className="trust-title">Почему доверяют нам?</h3>
                    <div className="trust-points">
                        <div className="trust-point">
                            Мы разработали ImpactPlanner, чтобы сделать процесс подготовки
                            простым и доступным.
                        </div>
                        <div className="trust-point">
                            У нас десятки историй успеха, и ваш ребенок может стать следующим.
                        </div>
                        <div className="trust-point">
                            Мы всегда на связи, чтобы ответить на любые вопросы.
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="cta-section">
                    <h3 className="cta-section-title">
                        Наша команда помогает получить вашему ребенку уверенное будущее в лучших университетах мира!
                    </h3>
                    <p>Получите нашу экспертную поддержку на каждом этапе поступления.</p>
                    <button className="cta-button">Позвонить</button>
                </section>
            </div>

            <footer className="footer">
                <div className="footer-container">
                    {/* Логотип и политика конфиденциальности */}
                    <div className="footer-left">
                        <img src="/images/LOGO.png" alt="Impact Logo" className="footer-logo" />
                        <p className="footer-privacy">Политика конфиденциальности</p>
                    </div>

                    {/* Контактные данные */}
                    <div className="footer-center">
                        <p className="footer-heading">Телефон:</p>
                        <p className="footer-text">+7 (707)622-96-37</p>
                        <p className="footer-text">info@impact-admissions.com</p>
                        <hr className="footer-divider" />
                        <button className="whatsapp-button">Написать в Whatsapp</button>
                    </div>

                    {/* Часы работы */}
                    <div className="footer-right">
                        <p className="footer-heading">Мы работаем:</p>
                        <p className="footer-text">ПН-ПТ 10:00 - 20:00</p>
                        <p className="footer-text">СБ-ВС 11:00 - 20:00</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default MainPage;

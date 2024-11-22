import React, { useState } from "react";
import "./App.css";
import "./index.css";

const images = [
  "https://img1.akspic.ru/previews/5/3/0/9/7/179035/179035-voda-gora-gidroresursy-rastenie-oblako-500x.jpg",
  "https://img.freepik.com/premium-vector/beautiful-landscape-nature-background-images-free-download-freepik-vector_1305309-1561.jpg",
  "https://img.freepik.com/fotos-premium/hermosos-paisajes-lagos-hermosos-paisajos-lagos_1234738-411657.jpg?w=1800",
];

function App() {
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
          Мы создали инновационный инструмент, который объединяет карьерное
          планирование, финансовый анализ оплаты за обучение и затрат на
          проживание, а также тестирование SAT (Verbal и Math), Placement Test,
          что поможет вам сделать осознанный выбор страны обучения и карьеры.
        </p>
        <h2>Из чего состоит:</h2>
        <div className="block">
          <div className="block-item">
            <h3>Тестирование SAT и Placement Test</h3>
            <ul>
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
            <p className="time">от 35 минут</p>
            <div className="icon">
              <img src="test-icon.svg" alt="Иконка тестирования" />
            </div>
          </div>
          <div className="block-item">
            <h3>Финансовый калькулятор*</h3>
            <ul>
              <li>Рассчитайте затраты на обучение.</li>
              <li>Финансовый план расходов.</li>
            </ul>
            <p>
              <b>Результат:</b> Прогноз стоимости жизни в выбранной стране
              обучения.
            </p>
            <div className="icon">
              <img src="finance-icon.svg" alt="Иконка калькулятора" />
            </div>
          </div>
          <div className="block-item">
            <h3>Карьерный калькулятор*</h3>
            <ul>
              <li>Оценка перспектив зарплат по выбранной специальности.</li>
              <li>Прогноз востребованности профессии в выбранной стране.</li>
            </ul>
            <p>
              <b>Результат:</b> Четкий срок окупаемости инвестиций в образование.
            </p>
            <div className="icon">
              <img src="career-icon.svg" alt="Иконка карьеры" />
            </div>
          </div>
        </div>
        <p className="footer">данные 2024 года*</p>
      </div>
    </>
  );
}

export default App;

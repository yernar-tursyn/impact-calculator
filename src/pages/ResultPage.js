import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../index.css"; // Подключаем стили

const ResultPage = () => {
    const location = useLocation();
    const {
        state: {
            country = "Не указано",
            format = "Не указано",
            budget = "Не указано",
            livingCost = "Не указано",
            financialAid = "Не указано",
            direction = "Не указано",
            profession = "Не указано",
        } = {},
    } = location;

    // Прокрутка вверх при загрузке страницы
    useEffect(() => {
        window.scrollTo(0, 0); // Прокрутка к началу страницы
    }, []);

    return (
        <>

            <div className="result-container">
                {/* Картинка */}
                <img src="/images/background_result.png" alt="Background" />

                {/* Контент поверх картинки */}
                <div className="result-content">
                    <div className="result-content-elements">
                        <button className="result-button">Ваши результаты готовы</button>
                        <h2>
                            Изучите нашу аналитику, чтобы лучше понять финансовые перспективы и
                            возможную окупаемость образования
                        </h2>
                        <p>
                            <span className="highlight">Ваша приоритетная страна:</span> {country}
                        </p>
                        <p>
                            <span className="highlight">Ваш формат обучения:</span> {format}
                        </p>
                        <p>
                            <span className="highlight">Ваш приоритетный бюджет на обучение:</span> {budget}
                        </p>
                        <p>
                            <span className="highlight">Ваш бюджет на проживание:</span> {livingCost}
                        </p>
                        <p>
                            <span className="highlight">Требуется ли финансовая помощь:</span> {financialAid}
                        </p>
                        <p>
                            <span className="highlight">Ваше направление:</span> {direction}
                        </p>
                        <p>
                            <span className="highlight">Ваша выбранная профессия:</span> {profession}
                        </p>
                        <p>
                            Теперь вы можете увидеть детальные финансовые расчеты, включая расходы
                            на проживание, среднюю зарплату и возможную окупаемость вложений в
                            образование.
                        </p>
                        <p className="highlight">
                            Внимательно изучите таблицу и планируйте свои шаги к успеху!
                        </p>
                    </div>
                </div>
            </div>

            <div className="budget-analysis-container">
                <h1 className="budget-analysis-title">Ваш персональный расчет бюджета!</h1>

                {/* Блок 01 */}
                <div className="budget-block">
                    <h2 className="block-title">
                        <span>01</span> Финансовый анализ затрат
                    </h2>
                    <div className="block-wrapper">
                        <p className="block-description">
                            Мы подготовили детальный расчет всех расходов на обучение и проживание в выбранной стране.
                            <img
                                src="/images/Designer-Desk-2--Streamline-Free-Illustrations.svg.png"
                                alt="Finance Icon"
                                className="block-image"
                            />
                        </p>
                        <div className="block-content">
                            <div className="block-text">
                                <p>
                                    <strong>Страна:</strong> Великобритания
                                </p>
                                <p>
                                    <strong>Город:</strong> Лондон
                                </p>
                                <p>
                                    <strong>Проживание (USD):</strong> $800
                                </p>
                                <p>
                                    <strong>Питание (USD):</strong>
                                    $600
                                </p>
                                <p>
                                    <strong>Транспорт (USD):</strong> $100
                                </p>
                                <p>
                                    <strong>Учебные материалы (USD):</strong> $300
                                </p>
                                <p>
                                    <strong>Общая сумма за месяц (USD):</strong> $1800
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Блок 02 */}
                <div className="budget-block">
                    <h2 className="block-title">
                        <span>02</span> Оценка уровня зарплаты
                    </h2>
                    <div className="block-wrapper">
                        <p className="block-description">
                            Мы проанализировали средние зарплаты для выбранных профессий в зависимости от уровня квалификации.
                        </p>
                        <div className="block-content">
                            <table className="salary-table">
                                <thead>
                                    <tr>
                                        <th>Город</th>
                                        <th>Зарплата Junior</th>
                                        <th>Зарплата Middle</th>
                                        <th>Зарплата Senior</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Лондон</td>
                                        <td>3000</td>
                                        <td>4000</td>
                                        <td>6000</td>
                                    </tr>
                                    <tr>
                                        <td>Манчестер</td>
                                        <td>2700</td>
                                        <td>3700</td>
                                        <td>5300</td>
                                    </tr>
                                    <tr>
                                        <td>Бирмингем</td>
                                        <td>2500</td>
                                        <td>3500</td>
                                        <td>5000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Блок 03 */}
                <div className="budget-block">
                    <h2 className="block-title">
                        <span>03</span> Срок окупаемости
                    </h2>
                    <div className="block-wrapper">
                        <p className="block-description">
                            Рассчитайте срок окупаемости ваших вложений в образование, учитывая выбранную страну и предполагаемую зарплату.
                        </p>
                        <div className="block-content">
                            <div className="block-text">
                                <p>
                                    <strong>Страна:</strong> Великобритания
                                </p>
                                <p>
                                    <strong>Город:</strong> Лондон
                                </p>
                                <p>
                                    <strong>Общая стоимость обучения (USD):</strong> 25000
                                </p>
                                <p>
                                    <strong>Зарплата (USD):</strong> $5000
                                </p>
                                <p>
                                    <strong>Срок окупаемости:</strong> 5 месяцев
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Блок 04 */}
                <div className="budget-block">
                    <h2 className="block-title">
                        <span>04</span> Востребованность выбранной профессии
                    </h2>
                    <div className="block-wrapper">
                        <p className="block-description">
                            Ознакомьтесь с уровнем востребованности выбранной профессии на рынке труда в выбранной стране.
                        </p>
                        <div className="block-content">
                            <div className="block-text">
                                <p>
                                    <strong>Инженер:</strong> Высокая
                                </p>
                                <p>
                                    <strong>Программист:</strong> Очень высокая
                                </p>
                                <p>
                                    <strong>Дизайнер:</strong> Средняя
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Блок 05 */}
                <div className="budget-block">
                    <h2 className="block-title">
                        <span>05</span> Скорость трудоустройства
                    </h2>
                    <div className="block-wrapper">
                        <p className="block-description">
                            Узнайте, насколько быстро вы сможете найти работу после окончания выбранной программы обучения.
                        </p>
                        <div className="block-content">
                            <div className="block-text">
                                <p>
                                    <strong>Тип программы:</strong> Магистратура
                                </p>
                                <p>
                                    <strong>Среднее время трудоустройства:</strong> 3-4 месяца
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Блок 06 */}
                <div className="budget-block">
                    <h2 className="block-title">
                        <span>06</span> Оцените свою готовность к поступлению
                    </h2>
                    <div className="block-wrapper">
                        <p className="block-description">
                            Пройдите наши тесты SAT Verbal, SAT Math и Placement Test, чтобы узнать свои текущие результаты и уровень подготовки.
                        </p>
                        <div className="block-content">
                            <p>
                                <strong>SAT Verbal Результат:</strong> 6 — Вы можете претендовать на поступление в хорошие вузы.
                            </p>
                            <p>
                                <strong>SAT Math Результат:</strong> 7.9 — Мы рекомендуем улучшить базу для качественной подготовки к экзамену.
                            </p>
                            <p>
                                <strong>Placement Test:</strong> 25 из 30 — Мы рекомендуем укрепить знания по грамматике.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cta-block cta-block-result">
                <div className="cta-content">
                    <h2 className="cta-title">Ваш анализ готов! Вы знаете затраты, зарплаты и сроки окупаемости. Теперь самое время получить профессиональную поддержку и приступить к реализации вашего плана.</h2>
                    <p className="cta-description cta-description-result">
                        Не знаете, с чего начать? Наши эксперты помогут вам сделать первые шаги к поступлению и успешной карьере.
                    </p>
                </div>
                <div className="cta-button-container">
                    <button className="cta-button">Записаться на консультацию</button>
                </div>
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
};

export default ResultPage;

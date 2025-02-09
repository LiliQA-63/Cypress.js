describe('Покупка аватара', function () {                                // название набора тестов
        it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
             cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/

             cy.get(':nth-child(1) > .auth__input').type('diarovalilia@yandex.ru'); // Ввела логин
             cy.get('#password').type('0209m86gDLR'); // Ввела пароль
             cy.get('.auth__button').click(); // Нажала Войти
             cy.get('.header__id-text_type_profile').click(); // Вошла в профиль своего тренера
             cy.get('[href="/shop"] > .history-info').click(); // Нажала кнопку СМЕНА АВАТАРА
             cy.get(':nth-child(2) > .shop__button').click();  // Выбрала новый аватар, нажать кнопку КУПИТЬ
             cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996');  // Ввела номер карты для оплаты
             cy.get(':nth-child(1) > .pay_base-input-v2').type('12/25'); // Ввела срок действия карты
             cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // Ввела код
             cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('LILI'); // Ввела имя
             cy.get('.pay-btn').click();  // Нажала ОПЛАТИТЬ
             cy.get('#cardnumber').type('56456'); // Ввела код из пуша
             cy.get('.payment__submit-button').click();  // Нажала ОТПРАВИТЬ
             cy.get('.payment__font-for-success').contains('Покупка прошла успешно'); // Вижу нужный текст ПОКУПКА ПРОШЛА УСПЕШНО
             cy.get('.payment__font-for-success').should('be.visible'); // Текст виден пользователю
  
         });
     });

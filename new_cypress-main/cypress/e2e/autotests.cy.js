import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
         cy.visit('/'); // Зашла на сайт
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восст.пароль
     });
    afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден пользователю
     });

    it('1.Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login); // Ввела верный логин
         cy.get(main_page.password).type(data.password); // Ввела верный пароль
         cy.get(main_page.login_button).click(); // Нажала Войти         
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу нужный текст
         cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })
  
    it('2.Проверка логики восстановления пароля', function () {
         cy.get(main_page.fogot_pass_btn).click(); // Нажала Забыли пароль?   
         cy.get(recovery_password_page.email).type(data.login); // Ввела адрес эл.почты
         cy.get(recovery_password_page.send_button).click(); // Нажала Отправить код
         cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю, что вижу нужный текст
         cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })
    
    it('3.Негативный кейс (НЕправильный пароль)', function () {
         cy.get(main_page.email).type(data.login); // Ввела верный логин
         cy.get(main_page.password).type('iLoveqastudio123'); // Ввела НЕверный пароль
         cy.get(main_page.login_button).click(); // Нажала Войти         
         cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу нужный текст
         cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })
        
    it('4.Негативный кейс (НЕправильный логин)', function () {
        cy.get(main_page.email).type('german@dolnikov321.ru'); // Ввела НЕверный логин
        cy.get(main_page.password).type(data.password); // Ввела верный пароль
        cy.get(main_page.login_button).click(); // Нажала Войти         
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу нужный текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })

    it('5.Негативный кейс валидации', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввела невалидный логин (без @)
        cy.get(main_page.password).type(data.password); // Ввела верный пароль
        cy.get(main_page.login_button).click(); // Нажала Войти         
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что после авторизации вижу нужный текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })

    it('6.Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввела логин c прописными буквами
        cy.get(main_page.password).type(data.password); // Ввела верный пароль
        cy.get(main_page.login_button).click(); // Нажала Войти         
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу нужный текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })
 })
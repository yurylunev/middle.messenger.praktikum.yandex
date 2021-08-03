const errorPage = new window.Templator(window.errorPageTemplate);

const context = {
    statusCode: 500,
    statusText: `Капец какой-то на сервере`,
};

const root = document.querySelector(`#root`);
root.innerHTML = errorPage.compile(context);

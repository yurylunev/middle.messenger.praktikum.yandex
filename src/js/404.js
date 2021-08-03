const errorPage = new window.Templator(window.errorPageTemplate);

const context = {
    statusCode: 404,
    statusText: `Не нашлось такого`,
};

const root = document.querySelector(`#root`);
root.innerHTML = errorPage.compile(context);

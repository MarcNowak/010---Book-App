{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  function render () {

    // przechodzimy po wszystkich książkach
    for (let eachBook of dataSource.books) {

      // dla każdej książki generujemy HTML na podstawie szablonu
      const generatedHTML = templates.bookTemplate(eachBook);

      // generujemy element DOM
      const elementDOM = utils.createDOMFromHTML(generatedHTML);

      // dodajemy wygenerowany element jako nowe dziecko DOM do listy
      document.querySelector(select.containerOf.booksList).appendChild(elementDOM);

      // opcja z użyciem dodatkowej zmiennej:
      // const bookListContainer = document.querySelector(select.containerOf.booksList);
      // bookListContainer.appendChild(elementDOM);
    }

  }

  render();
}
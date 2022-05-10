{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
      images: '.books-list .book__image',
    },
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  // generujemy listę książek - START
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
  // generujemy listę książek - END

  // dodajemy książki do ulubionych - START
  const favoriteBooks = [];
  
  function initActions () {

    // tworzymy referencję do listy wszystkich elementów .book__image w liście .booksList
    // najpierw budujemy obiekt w 'select'
    const booksImages = document.querySelectorAll(select.containerOf.images);

    for (let bookImage of booksImages) {

      // do każdego elementu dodajemy nasłuchiwacz, który po
      // wykryciu doubleclicka uruchomi funckję
      bookImage.addEventListener('dblclick', function (event) {

        // która zatrzyma domyślne zachowanie przeglądarki
        event.preventDefault();

        // doda do klikniętego elementu klasę
        bookImage.classList.add('favorite');

        // pobierze z jego data-id identyfikator książki
        const bookId = bookImage.getAttribute('data-id');

        // i doda ten identyfikator do favoriteBooks
        favoriteBooks.push(bookId);
      });
    }
  }
  // dodajemy książki do ulubionych - END

  render();
  initActions();
}
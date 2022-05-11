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
  function render() {

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
  
  function initActions() {

    // tworzymy referencję do listy wszystkich elementów .book__image w liście .booksList
    // najpierw budujemy obiekt w 'select'
    const booksImages = document.querySelectorAll(select.containerOf.images);

    // przechodzimy przez wszystkie elementy
    for (let bookImage of booksImages) {

      // i do każdego dodajemy nasłuchiwacz, który po
      // wykryciu doubleclicka uruchomi funckję
      bookImage.addEventListener('dblclick', function (event) {

        // która zatrzyma domyślne zachowanie przeglądarki
        event.preventDefault();

        // następnie pobierze z jego data-id identyfikator książki
        const bookId = event.target.offsetParent.getAttribute('data-id');

        // sprawdzi czy tablica favoriteBook zawiera już ten identyfikator
        if (!favoriteBooks.includes(bookId)) {

          // jeśi nie, to doda go do favoriteBooks
          favoriteBooks.push(bookId);

          // oraz doda do klikniętego elementu klasę favorite
          event.target.offsetParent.classList.add('favorite');

        } else {

          // a jeśli jest już jest na tablicy, to przypisze identyfikator do stałej
          const indexOfbookId = favoriteBooks.indexOf(bookId);

          // usunie go z tablicy favoriteBooks
          favoriteBooks.splice(indexOfbookId, 1);

          // i usunie z klikniętego elementu klasę favorite
          event.target.offsetParent.classList.remove('favorite');
        }
      });
    }
  }
  // dodajemy książki do ulubionych - END

  console.log('favouriteBooks: ', favoriteBooks);

  render();
  initActions();
}
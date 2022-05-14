{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
      // images: '.books-list .book__image',
    },

    filtersOf: {
      form: '.filters',
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

  //  FILTROWANIE: dodajemy pustą tablicę
  const filters = [];

  function initActions() {

    // tworzymy referencję do listy wszystkich elementów .book__image w liście .booksList
    // najpierw budujemy obiekt w 'select'
    // const booksImages = document.querySelectorAll(select.containerOf.images);
    const booksContainer = document.querySelector(select.containerOf.booksList);


    // przechodzimy przez wszystkie elementy
    // for (let bookImage of booksImages) {

    // i do każdego dodajemy nasłuchiwacz, który po
    // wykryciu doubleclicka uruchomi funckję
    // bookImage.addEventListener('dblclick', function (event) {

    // ustawiamy nasłuchiwacz na cały kontener
    booksContainer.addEventListener('dblclick', function (event) {

      // która zatrzyma domyślne zachowanie przeglądarki
      event.preventDefault();

      if (event.target.offsetParent.classList.contains('book__image')) {

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
      }
    });
    // console.log('favouriteBooks: ', favoriteBooks);
    // dodajemy książki do ulubionych - END

    // FILTROWANIE - START

    // przygotowujemy referencję do formularza w .filters
    const filter = document.querySelector(select.filtersOf.form);

    // na formularz ustawiamy nasłuchiwacz
    // który po kliknięciu uruchomi funckję
    filter.addEventListener('click', function (event) {

      // która zatrzyma domyślne zachowanie przeglądarki
      // czyli zaznaczanie checkboxów
      // event.preventDefault();

      // zapisujemy wartość eventu do stałej
      const filterValue = event.target.value;

      // sprawdzi poniższe warunki
      if (
        event.target.tagName == 'INPUT'
        &&
        event.target.type == 'checkbox'
        &&
        event.target.name == 'filter') {

        // jeśli elelemnt jest zaznaczony
        if (event.target.checked == true) {

          // doda go do tablicy filters
          filters.push(filterValue);
          console.log(filters);

          // w przeciwnym wypadku (odznaczony)
        } else {

          // przypisze ten index do stałej
          const indexOfFilter = filters.indexOf(filterValue);

          // i usunie go z tablicy filters
          filters.splice(indexOfFilter, 1);

          // wersja usuwania bez przypisywania do stałych:
          // filters.splice(filters.indexOf(event.target.value), 1);

          console.log(filters);
        }


      }
      filterBooks();
    });
    // FILTROWANIE - END
  }
  // }

  function filterBooks(){

    // przechodzimy po wszystkich elementach dataSource.book
    for(let book of dataSource.books){

      // na podstawie zmiennej shouleBeHidden ustalimy
      // czy trzeba do książki dodać klasę hidden
      let shouldBeHidden = false;

      // w tablicy filter za pomocą pętli sprawdzamy
      for(const filter of filters){

        // czy dana właściwość (filtr)
        // powinna mieć wartość true a jej nie ma
        if(!book.details[filter]){

          // należy zmienić wartość na true
          shouldBeHidden = true;

          // i zakończyć działanie pętki
          break;
        }
      }
      const id = book.id;
      console.log(id);
       
      const item = document.querySelector('.book__image[data-id="'+id+'"]');
    
      if(shouldBeHidden == true){
        item.classList.add('hidden');
      } else if (shouldBeHidden == false){
        item.classList.remove('hidden');
      }
    }
  }

  render();
  initActions();
}
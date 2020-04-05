function searchMovie() {

    $('#movie-list').html('');
    $.ajax({
            url: 'https://omdbapi.com',
            type: 'get',
            datatype: 'json',
            data: {
                'apikey': '365d9f0a',
                's': $('#search-input').val()
            },
            success: function (hasil) {
                if (hasil.Response == "True") {
                    let movies = hasil.Search;

                    $.each(movies, function (i, data) {
                        $('#movie-list').append(`
                            <div class="col-md-4">
                                <div class="card mb-3">
                                    <img src="` + data.Poster + `" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title">` + data.Title + `</h5>
                                    <a href="#" class="card-link detail" data-toggle="modal" data-target="#exampleModal" data-id="` + data.imdbID + `">Lihat Detail</a>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Tahun : `+ data.Year +`</li>
                                    <li class="list-group-item">Type  : `+ data.Type +`</li>
                                    <div class="card-body">
                                    <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Trailer</a>
                                    <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Nonton</a>
                                    </div>
                                </div>
                            </div>
                        `);
                    });

                    $('#search-input').val('');

                } else {
                    $('#movie-list').html(`<h1 class="text-center">Salah Ketik Fucek<h1>`)   
                }
            }
         });

}

$('#search-button').on('click', function(){
    searchMovie();
});

$('#search-input').on('keyup', function (enter){
    if (enter.which === 13) {
        searchMovie();
    }
})

$('#movie-list').on('click', '.detail', function(){
    $.ajax({
        url: 'https://omdbapi.com',
        type: 'get',
        datatype: 'json',
        data: {
            'apikey': '365d9f0a',
            'i': $(this).data('id')
        },
        success: function (film) {
            if (film.Response === "True") {
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src=` + film.Poster + ` class="img-fluid">
                        </div>

                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>` + film.Title + `</h3></li>
                                <li class="list-group-item"><p>` + film.Plot + `</p></li>
                                <li class="list-group-item">Tahun Rilis : ` + film.Released + `</li>
                                <li class="list-group-item">Genre : ` + film.Genre + `</li>
                                <li class="list-group-item">Actors : ` + film.Actors + `</li>
                                <li class="list-group-item">Director : ` + film.Director + `</li>
                                <li class="list-group-item">Negara : ` + film.Country + `</li>
                            </ul>
                        </div>
                
                `)
            }
        }
    });
});
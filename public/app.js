    $(document).ready(function () {
        $('.parallax').parallax();
        $('.collapsible').collapsible();
        updateArticles();
        updateArchive();
    });

    function updateArticles() {
        // Grab the articles as a json
        $.getJSON("/articles", function (data) {
            $("#article_list").empty();
            // For each one
            for (var i = 0; i < data.length; i++) {
                // Display the apropos information on the page
                console.log(data[i]);
                if (!data[i].saved) {
                    var li = $("<li>");
                    var divh = $('<div class="collapsible-header">');
                    var icon = '<i class="material-icons">label</i>';
                    //var icon = $('<i class="material-icons">');
                    var divb = $('<div class="collapsible-body">');
                    var span = $('<p>');
                    var btn = $('<a class="save waves-effect waves-light btn right">');
                    //icon.text("label_outline");
                    //divh.append(icon);
                    divh.html(icon + data[i].title);
                    span.text(data[i].link);
                    btn.text("Save");
                    btn.attr("data-id", data[i]._id);
                    divb.append(span);
                    divb.append(btn);
                    li.append(divh);
                    li.append(divb);
                    $("#article_list").append(li);
                }
                // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
            }
        });
    }
        function updateArchive() {
        // Grab the articles as a json
        $.getJSON("/articles", function (data) {
            $("#archive_list").empty();
            // For each one
            for (var i = 0; i < data.length; i++) {
                // Display the apropos information on the page
                console.log(data[i]);
                if (data[i].saved) {
                    var li = $("<li>");
                    var divh = $('<div class="collapsible-header">');
                    var icon = '<i class="material-icons">label</i>';
                    //var icon = $('<i class="material-icons">');
                    var divb = $('<div class="collapsible-body">');
                    var span = $('<p>');
                    var btnn = $('<a class="note waves-effect waves-light btn right">');
                    var btnd = $('<a class="delete waves-effect waves-light btn right">');
                    //icon.text("label_outline");
                    //divh.append(icon);
                    divh.html(icon + data[i].title);
                    span.text(data[i].link);
                    btnn.text("Note");
                    btnn.attr("data-id", data[i]._id);
                    btnd.text("Delete");
                    btnd.attr("data-id", data[i]._id);
                    divb.append(span);
                    divb.append(btnd);
                    divb.append(btnn);
                    li.append(divh);
                    li.append(divb);
                    $("#archive_list").append(li);
                }
                // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
            }
        });
    }



    // Whenever someone clicks a p tag
    $(document).on("click", "p", function () {

        // Empty the notes from the note section
        $("#notes").empty();
        // Save the id from the p tag
        var thisId = $(this).attr("data-id");

        // Now make an ajax call for the Article
        $.ajax({
                method: "GET",
                url: "/articles/" + thisId
            })
            // With that done, add the note information to the page
            .done(function (data) {
                console.log(data);
                // The title of the article
                $("#notes").append("<h2>" + data.title + "</h2>");
                // An input to enter a new title
                $("#notes").append("<input id='titleinput' name='title' >");
                // A textarea to add a new note body
                $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
                // A button to submit a new note, with the id of the article saved to it
                $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#titleinput").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#bodyinput").val(data.note.body);
                }
            });
    });

    // When you click the savenote button
    $(document).on("click", "#savenote", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
                method: "POST",
                url: "/articles/" + thisId,
                data: {
                    // Value taken from title input
                    title: $("#titleinput").val(),
                    // Value taken from note textarea
                    body: $("#bodyinput").val()
                }
            })
            // With that done
            .done(function (data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                $("#notes").empty();
            });

        // Also, remove the values entered in the input and textarea for note entry
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });

    // save article
    $(document).on("click", ".save", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");
        console.log(thisId);

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
                method: "POST",
                url: "/save/" + thisId,
                data: {
                    // saved = true
                    saved: true
                }
            })
            // With that done
            .done(function (data) {
                // Log the response
                console.log(data);
                updateArticles();
            });

        // // Also, remove the values entered in the input and textarea for note entry
        // $("#titleinput").val("");
        // $("#bodyinput").val("");
    });
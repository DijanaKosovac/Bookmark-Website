// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName,siteUrl)) {
      return false;
  }
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // // Local Storage Test
    // localStorage.setItem('test','Hello World');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));

    if(localStorage.getItem('bookmarks') === null) {
        // Init array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to Local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form

    document.getElementById('myForm').reset();

    fetchBookmarks();

e.preventDefault();
}

// Delete bookmarks

function deleteBookmark(url) {
//    Get bookmark from storage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//   loop through bookmarks
for(var i = 0; i < bookmarks.length; i++) {
 if(bookmarks[i].url == url) {
    //  remove from array
    bookmarks.splice(i,1);
 }
}

localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
// re-fetch bookmarks
fetchBookmarks();


}
 // Fetch bookmarks

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="well">'+
        '<h3>'+name+
        ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
        '</h3>'+
        '</div>';
    }

}

// Validate form
function validateForm(siteName,siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Please fill in the form!');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)) {
    alert('Please use a valid url');
    return false;
  }

  return true;

}
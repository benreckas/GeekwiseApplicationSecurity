// server address
let _baseUrl = "http://localhost";
let _port = "3000";

function getBlog() {
    let list = document.getElementById("blog-list");
    list.innerHTML = "";
    jQuery.get(`${_baseUrl}:3000/api/blog`, function(data) {
        data.data.forEach((blog) => {
            var newElement = document.createElement("li");
            let edit = `<a href='#' data-blogid='${blog.id}' data-blogname='${blog.name}' data-blogcontent='${blog.content}' onclick='editBlog(event)'>edit</a>`;
            let del = `<a href='#' data-blogid='${blog.id}' onclick='delBlog(event)'>delete</a>`;
            newElement.innerHTML = `${blog.id} Name: ${blog.name} ${blog.content} ${edit} | ${del}`;
            list.appendChild(newElement);
        });
    });
}

function addBlog(e) {
    e.preventDefault();
    let name = $("#name");
    let content = $("#content");
    let id = $("#blogid");

    let nameVal = name.val();
    let contentVal = content.val();

    if(nameVal == "" || contentVal == "") {
        alert('You need to have a name and some content.');
        return;
    }

    if (+blogid.val() === 0) {
        jQuery.post(`${_baseUrl}:${_port}/api/blog`, { name: nameVal, content: contentVal }, function(data) {
            getBlog();
        });
    } else {
        $.ajax({
                method: "PUT",
                url: `${_baseUrl}:${_port}/api/blog/${blogid.val()}`,
                data: { name: name.val(), content: content.val() }
            })
            .done(function(msg) {
                getBlog();
            });
    }

    blogid.val(0);
    $("#blog-submit").val('Add Blog');
    user.val("");
    content.val("");
}

function editBlog(e) {
    e.preventDefault();
    let el = $(e.srcElement);
    let user = $("#user");
    let content = $("#content");
    let id = $("#blogid");
    

    let userVal = el.data("blogname");
    let contentVal = el.data("blogcontent");
    let idVal = el.data("blogid");

    $("#blog-submit").val(`Edit Blog #${idVal}`);
    user.val(userVal);
    content.val(contentVal);
    id.val(idVal);
}

function delBlog(e) {
    e.preventDefault();
    
    let el = $(e.srcElement);
    let blogid = el.data("blogid");
    if(confirm(`Are you sure you want to delete this entry #${blogid}`)) {
        $.ajax({
                method: "DELETE",
                url: `${_baseUrl}:${_port}/api/blog/${blogid}`
            })
            .done(function(msg) {
                getBlog();
            });
    }
}


// run getCars on 
$(function() {
    // server is running from same IP as front-end so get the hostname
    _baseUrl = `http://${window.location.hostname}`;
    getBlog();
    $("#add-blog").on('submit', addBlog);
   
});
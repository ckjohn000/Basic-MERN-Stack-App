/* font-family: 'Kaushan Script', cursive; */
/* font-family: 'Pinyon Script', cursive; */
/* font-family: 'Petit Formal Script', cursive; */
/* font-family: 'Aguafina Script', cursive; */
/* font-family: 'Rouge Script', cursive; */
// font-family: 'Roboto', sans-serif;

$("#add_item").submit(function(event) {
  alert("Item successfully added.")
})

$("#update_item").submit(function(event) {
  event.preventDefault();

  var unindexed_array = $("#update_item").serializeArray();
  var data = {}

  $.map(unindexed_array, function(n, i) {
    data[n['name']] = n['value']
  })

  console.log(data);

  var request = {
    "url": `http://localhost:3000/api/items/${data.id}`,
    "method": "PUT",
    "data": data
  }

  $.ajax(request).done(function(res) {
    alert("Item updated successfully")
  })
})

if(window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function() {
    var id = $(this).attr("data-id");

    var request = {
      "url": `http://localhost:3000/api/items/${id}`,
      "method": "DELETE"
    }

    if(confirm("Are you sure u want to delete this item?")) {
      $.ajax(request).done(function(res) {
        alert("Item deleted successfully!");
        location.reload();
      })
    }
  })
}
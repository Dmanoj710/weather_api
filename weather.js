
const env = new djv();
$.getJSON( "weather.json", function( json ) {

$.getJSON( "weatherschema.json", function( sch ) {
table = document.getElementById("table");
var newRow = table.insertRow(table.length);

th =Object.keys(json[0]);
for(var j = 0; j < th.length; j++)
{
// create a new cell
var cell = newRow.insertCell(j);

// add value to the cell
cell.innerHTML = "<Bold>"+th[j]+"</Bold>";
}
  
env.addSchema('sch', sch);
json.forEach(element => {
error = env.validate('sch',element);
console.log(error);
element =(Object.values(element));

  
// create a new row
var newRow = table.insertRow(table.length);
for(var j = 0; j < element.length; j++)
{
var cell = newRow.insertCell(j);
cell.innerHTML = element[j];
}
  
  
  
});
});

});
var ProductName = document.getElementById("productName");
var ProductPrice = document.getElementById("productPrice");
var ProductCategory = document.getElementById("productCategory");
var ProductDec = document.getElementById("productDesc");
var btn = document.getElementById("btn");
var tbody = document.getElementById("Products");
var update =document.getElementById("Update");
var dalete =document.getElementById("Delete")
var ProsuctsStr ;
// validation 
var products ;
var i;
 if(localStorage.length ==0){
    products = [];
    i=-1;
 }
 else{
    products = JSON.parse(localStorage.getItem("Products"));
    i=products.length ;
 }
function checkValidation() {
     var valid = 0;                           
    if (ProductName.value.length == 0) {
        ProductName.nextElementSibling.innerHTML = "Enter The Product Name";
        valid=1;
    }
    if (ProductPrice.value.length == 0) {
        ProductPrice.nextElementSibling.innerHTML = "Enter The Price";
        valid=1;

    }
    if (ProductCategory.value.length == 0) {
        ProductCategory.nextElementSibling.innerHTML = "Enter The Category";
        valid=1;

    }

   return valid ; 
}

 function clearForm(){

    ProductName.value='';
    ProductPrice.value='';
     ProductCategory.value='';
     ProductDec.value= '';

 }

    btn.addEventListener("click", function () {
        if (btn.innerHTML == "Save" ) {
        addProduct();
        console.log("save")

        }
    })
 

// add Product
function addProduct() {

    var isVaild =checkValidation();
    if(isVaild == 0){
        i++;
        var Product = {
            id : i,
            Name: ProductName.value,
            Price: ProductPrice.value,
            Category: ProductCategory.value,
            Description: ProductDec.value,
    
        }
        products.push(Product)  ;
         ProsuctsStr = JSON.stringify(products);
        localStorage.setItem("Products",ProsuctsStr);
         alert("The Product is Added")
         clearForm();
    }
    
 }
function Display(){
       var items = JSON.parse(localStorage.getItem("Products"));
       if(items){
    for(var Product of items){
      var newtr = document.createElement("tr");
      newtr.innerHTML = `
      <td>${Product.Name}</td>
      <td>${Product.Price}</td>
      <td>${Product.Category}</td>
      <td>${Product.Description}</td>
      <td>
      <button id="Update" onClick = "Update(${Product.id})">Update</button>
                        
      <button id="Delete" onClick = "Delete(${Product.id})">Delete</button>
      </td>
      `;
      tbody.appendChild(newtr);
    }
}
 
}
Display();
function Update(id){

    btn.innerHTML="Update";
    var items = JSON.parse(localStorage.getItem("Products"));

    for(var Product of items){
       if(Product.id == id){
        var index = items.indexOf(Product);
        ProductName.value = Product.Name;
        ProductPrice.value = Product.Price;
        ProductCategory.value = Product.Category;
        ProductDec.value = Product.Description ;

       }
    }
 
    if (btn.innerHTML == "Update") {
        btn.addEventListener("click", function () {
            UpdateProduct(index);
 
        })
    }

    function UpdateProduct(index){ 
        var items = JSON.parse(localStorage.getItem("Products"));
     
        items[index].Name = ProductName.value ;
        items[index].Price = ProductPrice.value ;
        items[index].Category =ProductCategory.value ;
        items[index].Description = ProductDec.value  ;
    
        localStorage.setItem("Products",JSON.stringify(items));
         alert("The Product is Updated")
         clearForm();

    
    }

 }
 

 
function Delete(id){
    var items = JSON.parse(localStorage.getItem("Products"));
    console.log(id)
    for(var Product of items){
       if(Product.id == id){
        var index = items.indexOf(Product);
        items.splice(index,1)
       }
    }
   localStorage.setItem("Products",JSON.stringify(items));
   alert("The Product is Deleted")

}
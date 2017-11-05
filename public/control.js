var modal = document.getElementById('addModal');
var submodal = document.getElementById('subModal');
var btn = document.getElementById("AddButton");
var span = document.getElementsByClassName("close")[0];
var subspan = document.getElementsByClassName("anotherclose")[0];
var spanSearch = document.getElementById("afterSearch");
var delbtn = document.getElementById("delButton");

btn.onclick = function() {
	modal.style.display = "block";
}
delbtn.onclick = function() {
	submodal.style.display = "block";
}
span.onclick = function() {
	modal.style.display = "none";
}
subspan.onclick = function() {
	submodal.style.display = "none";
	document.getElementById("delkeyword").value = "";
}
window.onclick = function(event) {
	if (event.target == modal || event.target == submodal) {
		modal.style.display = "none";
		submodal.style.display = "none";
	}
}
window.onload = function(event) {
	var i = sessionStorage.length;
	while(i--) {
	  var key = sessionStorage.key(i);
		sessionStorage.removeItem(key);
	}
} 

function closeFunc() {
	var list = document.getElementById("afterSearch");
	while (list.hasChildNodes()) {   
		list.removeChild(list.firstChild);
	}
	afterSearch.style.display = "none";	
	document.getElementById('searchImg').value = "";
}
document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {

	document.getElementById('uploadBtn').addEventListener("click", function(){
		var files = evt.target.files;
		for (var i = 0, f; f = files[i]; i++) {
		  if (!f.type.match('image.*')) {
			continue;
		  }
			var key = document.getElementById('keyword').value;
			if(key==""){
				document.getElementById('warning').innerHTML = "Please enter a unique keyword for the Photo";
			}
			
		  	else{
		  		  var reader = new FileReader();
				  reader.onload = (function(theFile) {
					return function(e) {
					  var imgs = document.createElement('imgs');
					  imgs.innerHTML = ['<img class="imageFile" alt ="', key, '" src="', e.target.result,
										'" title="', escape(theFile.name), '" height="200px" width="200px"/>'].join('');
					  document.getElementById('list').insertBefore(imgs, null);
					  sessionStorage.setItem(key, e.target.result);
					};
				  })(f);
				  reader.readAsDataURL(f);
				  document.getElementById('warning').innerHTML = "";
				  document.getElementById("files").value = "";
				  document.getElementById("keyword").value = "";
		  		}
		}
		
});
	
}

function searchFunc(elem) {
	if(document.getElementById('searchImg').value == "") {
		closeFunc();
	}
	var searchText = document.getElementById('searchImg').value;
	var picture = sessionStorage.getItem(searchText);
	if(picture==null){
		afterSearch.style.display = "none";
	}
	var image = document.createElement('img');
	image.src = picture;
	image.style.height = '200px';
	image.style.height = '200px';
	if(picture != null){
		afterSearch.style.display = "block";
		document.getElementById("afterSearch").innerHTML="";
		document.getElementById("afterSearch").appendChild(image);
	}
}

document.getElementById('deleteBtn').addEventListener("click", function(){
	var delkey = document.getElementById('delkeyword').value;
	sessionStorage.removeItem(delkey);

	var allImages = document.getElementsByTagName("img");
	for (var i = 0, len = allImages.length; i < len; ++i) {
		if (allImages[i].alt == delkey) {
			allImages[i].parentNode.removeChild(allImages[i]);
			document.getElementById('delkeyword').value = "";
		}
	}
});
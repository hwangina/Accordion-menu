window.addEventListener("load", function(){
	var subArray=new Array();
	var menuH=35;
	var n;
	var depth1Ul=document.querySelector("nav > ul");
	var depth1Li=null; // .menu
	var depth1A=null; // .menu .main (a)
	var depth2Ul=null; // .menu .sub (ul)
	
	var depth1HTML="";
	var depth2HTML="";
	
	var requestURL="data/menu.json";
	var request=new XMLHttpRequest();
	
	function init(){
		setTimeout(function(){
			request.open("GET", requestURL, true);
			request.responseType="json";
			request.send();
			request.addEventListener("load", function(){
				var data=request.response;
				for(key1 in data){
					var level1Li=document.createElement("li");
					level1Li.setAttribute("class", "menu");
					
					level1Li.innerHTML='<a href="#" class="main">'+key1+'</a>';
					
					var level2Ul=document.createElement("ul");
					level2Ul.setAttribute("class", "sub");
					
					depth1Ul.appendChild(level1Li);
					level1Li.appendChild(level2Ul);
					
					for(key2 in data[key1]){
						var level2Li=document.createElement("li");
						level2Li.innerHTML='<a href="#">'+data[key1][key2]+'</a>'+'\n';
						level2Ul.appendChild(level2Li);
					}
				}
				depth1Li=document.querySelectorAll(".menu"); // .menu
				depth1A=document.querySelectorAll(".main"); // .menu .main (a)
				depth2Ul=document.querySelectorAll(".sub"); // .menu .sub (ul)
				
				for(var i=0;i<depth2Ul.length;i++){
					subArray.push(depth2Ul[i].offsetHeight+menuH);
					depth1A[i].index=i;
					
					depth1A[i].addEventListener("click", function(e){
						e.preventDefault();
						n=e.target.index;
						
						if(e.target.classList.contains("on")==false){ // close
							for(var j=0;j<depth1A.length;j++){ // 0, 1, 2, 3
								if(j==n){ // click
									depth1A[j].classList.add("on");
									depth1Li[j].style.height=subArray[n]+"px";
								}
								else{ // don't click
									depth1A[j].classList.remove("on");
									depth1Li[j].style.height=menuH+"px";
								}
							}
						}
						else{ // open
							e.target.classList.remove("on");
							e.target.parentElement.style.height=menuH+"px";
						}
					})
				};
			});
		}, 10);
	}
	init();
	/*
	*/
});
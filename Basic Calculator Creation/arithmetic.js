var x = document.getElementById("one");
var y = document.getElementById("two");
var result = document.getElementById("three");
 function adding()
{
    var x1 = Number (x.value);
    var y1 = Number (y.value);

    if(isNaN(x1)||isNaN(y1)||x.value===""||y.value==="")
        {
            result.innerHTML =  "Enter your valid input";
        }
        else
        {
var total = x1+ y1
result.innerHTML = total
}
}
function sub()
{  
    var xsub = Number (x.value);
    var ysub = Number (y.value);

    if (isNaN(xsub)||isNaN(ysub)||x.value === ""||y.value === "")
        {
          result.innerHTML = "Enter your valid input";
        }
        else
        { 
  
    var totalsub = xsub - ysub;
    result.innerHTML = totalsub;
} 
}  
function mul()
{
    var xmul = Number (x.value);
    var ymul = Number (y.value);
    if (isNaN(xmul) || isNaN(ymul) || x.value===""|| y.value==="")
        {
            result.innerHTML="Enter your valid input"
        }
        else{

    var totalsub = xmul * ymul;
    result.innerHTML = totalsub;
}} 
function div()
{   
    var xdiv = Number (x.value);
    var ydiv = Number (y.value);
if(isNaN(xdiv) || isNaN(ydiv) || x.value==""||y.value=="")
    {
       result.innerHTML = "Enter your valid input"
    }
    else
    {
        var totaldiv = xdiv/ydiv;
        result.innerHTML = totaldiv;
    }

}




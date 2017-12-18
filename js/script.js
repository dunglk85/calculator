$(document).ready(function() {
	var txtEntry = "0";
	var txtHistory = "0";

	$("[value='AC']").click(function() {
		txtEntry = "0";
		txtHistory = "0";
		printOut(txtEntry, txtHistory);
	});
		
	$("[value='CE']").click(function() {
		var x = txtHistory.lastIndexOf("+");
		var y = txtHistory.lastIndexOf("-");
		var z = txtHistory.lastIndexOf("x");
		var t = txtHistory.lastIndexOf(":");
		if (Math.max(x,y,z,t)>-1) {
			txtHistory = txtHistory.slice(0,Math.max(x,y,z,t));	
		} else {
			txtHistory = "0";
		}
		txtEntry = "0";
		printOut(txtEntry, txtHistory);
	});
		
	$(".num").click(function() {
		var positionEquaSign = txtHistory.indexOf("=");
		if (txtEntry.length>9 || txtHistory.length > 23) {
			return;
		} else {
			if (positionEquaSign>-1) {
				if (this.value == ".") {
					txtEntry = "0.";
					txtHistory = "0.";
				} else {
					txtEntry = this.value;
					txtHistory = this.value;
				}
			} else {
				if (txtEntry.indexOf(".")>-1 && this.value == ".") {
					return;
				} else {
					switch(txtEntry) {
						case "0":
							if (this.value!=".") {
								txtEntry = this.value;
								if (txtHistory=="0") {
									txtHistory = this.value;
								} else { txtHistory += this.value;} 
							} else {
								txtEntry += this.value;
								txtHistory += this.value;
							}
							break;
						case "x":
						case ":":
						case "+":
						case "-":
							if (this.value == ".") {
								txtEntry = "0" + this.value;
								txtHistory += "0" + this.value;
							} else {
								txtEntry = this.value;
								txtHistory += this.value;
							}
							break;
						case "Too large":
							txtEntry = this.value;
							txtHistory = this.value;
							break;
						default:
							txtEntry += this.value;
							txtHistory += this.value;
							break;
					}
				}	
			}
		}
		printOut(txtEntry, txtHistory);
	});

	$(".oper").click(function() {
		txtEntry = this.innerHTML;
		var positionEquaSign = txtHistory.indexOf("=");
		if (positionEquaSign>-1) {
			txtHistory = txtHistory.slice(positionEquaSign+1) + this.innerHTML;
		} else {
			var t = txtHistory.slice(-1);
			if (isNaN(parseInt(t))) {
				txtHistory = txtHistory.slice(0,txtHistory.length-1) + this.innerHTML;  
			} else {
				txtHistory += txtEntry;
			}	
		}
		printOut(txtEntry, txtHistory);
	});

	$("#equa").click(function(params) {
		if (txtHistory=="0") {
			return;
		} else {
			var result = txtHistory.replace(/x/g, "*");
			result = result.replace(/:/g, "/");
			txtEntry = eval(result);
			if (Number.isInteger(txtEntry)==false) {
			  txtEntry = txtEntry.toFixed(2);
			}
			txtEntry += "";
			txtHistory += "=" + txtEntry;
			if (txtEntry.length>9) {
				txtEntry = "Too large";
				txtHistory = "0";
			} else if (txtHistory.length>23) {
				txtHistory = txtEntry;
			}
		}
		printOut(txtEntry, txtHistory);
	})
});

function printOut(str1, str2) {
	document.getElementById('entry').innerHTML = str1;
	document.getElementById('history').innerHTML = str2;
}
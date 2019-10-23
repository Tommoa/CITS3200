<?php
// maintain a session for some important info
session_start();
?>

<!DOCTYPE html>
<html>
<style>
body
{
	background-color: lightblue;
	font-family : verdana;
	text-align: center;
	padding: 150px 0;
	border-style: solid;
	border-width: 5px;
	border-radius: 5px;
}
</style>
<body>

<?php
printf("%s\n", $_POST["survey"]);
?>
<h1>Manage Questionaire.</h1>
<?php
	if (isset($_GET["duplicate"])) {
		echo "Another survey already exists with the same ID!";
	}
?>
<p id = "number_check"> </p>
<form id = "form" action = "send.php" method = "post">
	Questionaire ID: <input name="p_questionaire_id" type="text" id="id" onkeypress="return is_number(event)" onchange="ch_id()" /> <br />
	Questionaire name: <input name = "p_questionaire_name" type = "text" /> <br />
	How many questions: <input name = "p_question_num" type = "number" id = "questions" value = 1 min = 1 max = 100 /> <br />
	How many groups: <input name = "p_group_num" type = "number" id = "groups" value = 3 min = 1 max = 100 /> <br />
	Group ratio: <input name = "p_ratio" type = "text" id = "ratio" value = "1:1:1" /> <br />
	<button type = "button" onclick = "change_settings()">change settings</button>

	<div id = "question_list">
	<h2>Questions</h2>

	</div>	

	<br><br>
	<input type="Submit" onsubmit="return validate()" value = "Submit Questionaire">
	
</form>

</body>
</html>

<script>
	// might as well make these global so we aren't call the DOM stuff every function call
	var div = document.getElementById("question_list"); 
	var form = document.getElementById("form");

	// global variables
	// initially we set them to 0 so that we can call change_settings and generate 
	// the first question automatically.
	var question_num = 0;
	var group_num = 0;
	var ratio = "";
	
	// answer types we have.
	var answer_types = ["short answer","radio","checkbox","ranking","date"];
	
	change_settings();

	function ch_id() {
		var f = document.getElementById("id").value;
		var what = document.getElementById("number_check");
		if (f.length != 8) {
			what.innerHTML = "ID must be of length 8!";
			return false;
		} else {
			what.innerHTML = "ID correct length";
			return true;
		}
	}

	ch_id();

	function validate() {
		return ch_id();
	}

	function is_number(evt) {
		evt = (evt) ? evt : window.event;
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	}
	
	function change_settings()
	{
		var temp_question_num = form["questions"].value;
		var temp_group_num = form["groups"].value;
		var temp_ratio = form["ratio"].value;
		
		// to-do: validate all the form values.
		// including checking the ratio is in the right format,
		// and making sure it isnt longer than the actual group
		// number specified.
		
		// delete question_num - temp_question_num number of questions
		if (temp_question_num < question_num)
		{
			for (i = Number(temp_question_num) + 1; i <= question_num; i++)
			{
				var child = document.getElementById("Q" + i);
				div.removeChild(child);
			}
		} 
		else if (temp_question_num > question_num) 
		{
			var i;
			for (i = Number(question_num) + 1; i <= temp_question_num; i++)
			{
				var add = document.createElement("div");
				add.setAttribute("id","Q" + i);
				
				var header = document.createElement("h3");
				var header_text = document.createTextNode("Question " + i);
				
				header.appendChild(header_text);
				
				add.appendChild(header);
				
				var br = document.createElement("br");
				add.appendChild(br);
				
				var group_div = document.createElement("div");
				group_div.setAttribute("id","group_div" + i);
				
				add.appendChild(group_div);
				
				// textarea to enter the research question itself.
				var question_actual = document.createElement("textarea");
				question_actual.setAttribute("name","p_question_actual"+i)
				question_actual.setAttribute("rows","5");
				question_actual.setAttribute("cols","50");
				question_actual.innerHTML = "Enter question here.";
				
				add.appendChild(question_actual);
				
				var answer_type_select = document.createElement("div");
				answer_type_select.setAttribute("id","answer_type_div" + i);
				
				// add radio buttons for selecting answer type.
				// will dynamically update based on selection
				// default is short answer
				var j;
				for (j = 0; j < answer_types.length; j++)
				{
					var input_text = document.createTextNode(answer_types[j] + " ");
					
					var input = document.createElement("input");
					input.setAttribute("type","radio");
					input.setAttribute("name","p_answer_type" + i);
					input.setAttribute("value",j);
					input.setAttribute("onchange","change_answer_type(" + i + "," + j + ")");
					
					if (j == 0) // if its the first index (short answer) we set as default
					{
						input.setAttribute("checked",true);
					}
					answer_type_select.appendChild(input);
					answer_type_select.appendChild(input_text);
				}
				
				add.appendChild(answer_type_select);
				
				var question_content = document.createElement("div");
				question_content.setAttribute("id","question_content" + i);
				
				add.appendChild(question_content);
				
				div.appendChild(add);
				
				change_answer_type(i,0); // set short answer as default.
			}
		}
		// same number of questions we dont have to do anything
		
		
		// now we gotta update the group numbers
		var i;
		for (i = 1; i <= temp_question_num; i++)
		{
			var group_div = document.getElementById("group_div" + i);
				
			var len = group_div.querySelectorAll("input").length;
			// we check each question as a few things could happen:
			// temp_group_num could be different and so we have to update all questions
			// there could be added questions and so we have to give groups 
			// to the new ones
			if (temp_group_num != len)
			{
				// remove all the existing checkboxes
				// and add the new ones.
				var node = group_div.lastChild;
				while (node)
				{
					group_div.removeChild(node);
					node = group_div.lastChild;
				}
				
				var j;
				for (j = 1; j <= temp_group_num; j++)
				{
					var checkbox = document.createElement("input");
					checkbox.setAttribute("type","checkbox");
					checkbox.setAttribute("name","p_group" + i + "[]");
					checkbox.setAttribute("value",j);
					checkbox.setAttribute("checked",true);
					
					var checkbox_text = document.createTextNode("Group " + j + " ");
					group_div.appendChild(checkbox);
					group_div.appendChild(checkbox_text);
				}
			}
		}
		
		question_num = temp_question_num;
		group_num = temp_group_num;
		ratio = temp_ratio
		
		form["questions"].value = question_num;
		form["groups"].value = group_num;
		form["ratio"].value = ratio;
	}
	
	// question refers to which question it is
	// so from 1 to question_num
	// type is the array index of the type of question
	function change_answer_type(question, type)
	{
		var question_content = document.getElementById("question_content" + question);
		
		// clear existing question content if there is any
		var node = question_content.lastChild;
		while (node)
		{
			question_content.removeChild(node);
			node = question_content.lastChild;
		}
		
		if (type == 0) // short answer
		{
			var text = document.createTextNode("character limit (leave 0 if no limit):");
			var char_limit = document.createElement("input");
			char_limit.setAttribute("name","p_char_limit" + question);
			char_limit.setAttribute("type","number");
			char_limit.setAttribute("value",0);
			char_limit.setAttribute("min",0);
			
			question_content.appendChild(text);
			question_content.appendChild(char_limit);
		}
		else if (type < 4) // functionally we can treat radio, checkbox, rankings as the same
		{
			var text = document.createTextNode("Number of choices ");
			var number_choices = document.createElement("input");
			number_choices.setAttribute("name","p_number_choices" + question);
			number_choices.setAttribute("type","number");
			number_choices.setAttribute("value",2);
			number_choices.setAttribute("min",2); // minimum 2 otherwise what is the point
			number_choices.setAttribute("max",100); // I cant imagine there will be any need for more than 10.
			// 100 should suffice I am sure
			number_choices.setAttribute("onchange","change_number_choices(" + question + ",value)");
			
			// divider to hold all the choices.
			var question_choices = document.createElement("div");
			question_choices.setAttribute("id","question_choices" + question);
			
			question_content.appendChild(text);
			question_content.appendChild(number_choices);
			question_content.appendChild(question_choices);
			
			change_number_choices(question, 2); // set two as default.
		}
	}
	
	// function to change the number of choices for radio, multiple choice, rankings.
	function change_number_choices(question, number)
	{
		var question_choices = document.getElementById("question_choices" + question);
		
		var length = question_choices.querySelectorAll("input").length;
		
		var total = question_choices.childNodes.length;
		// similar to adding questions above, we can dynamically add
		// or remove choices without deleting unnecessary data.
		if (number > length)
		{
			var i;
			for (i = Number(length) + 1; i <= number; i++)
			{
				var input_text = document.createTextNode("Choice " + i + " description ");
				
				var input = document.createElement("input");
				input.setAttribute("type","text");
				input.setAttribute("name","p_choice_description" + question + "[]");
				var br = document.createElement("br");
				
				question_choices.appendChild(input_text);
				question_choices.appendChild(input);
				question_choices.appendChild(br);
			}
		}
		else if (number < length)
		{
			// since we added 3 childs we have to remove 3.
			var i;
			for (i = Number(number) + 1; i <= length; i++)
			{
				var node = question_choices.lastChild;
				question_choices.removeChild(node);
				node = question_choices.lastChild;
				question_choices.removeChild(node);
				node = question_choices.lastChild;
				question_choices.removeChild(node);
			}
		}
	}
</script>

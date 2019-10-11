<?php
	$answer_types = ["short answer","radio","checkbox","ranking","date"];
	
	echo "questionaire name: ".$_POST["p_questionaire_name"];
	echo "<br>";
	echo "number of questions: ".$_POST["p_question_num"];
	echo "<br>";
	echo "number of groups: ".$_POST["p_group_num"];
	echo "<br>";
	echo "group ratio: ".$_POST["p_ratio"];
	echo "<br>";
	
	for ($i = 1; $i <= $_POST["p_question_num"]; $i++)
	{
		echo "<h3>question ".$i." data:</h3>";
		
		// if no checkboxes are ticked this will not be set
		$len = 0;
		if (!empty($_POST["p_group".$i]))
		{
			$group_array = $_POST["p_group".$i];
			$len = count($group_array);
			echo "how many group selected: ".$len."<br>";
			for ($j = 0; $j < $len; $j++)
			{
				echo $group_array[$j]." ";
			}
			echo "<br><br>";
		}
		else
			echo "how many group selected: ".$len."<br><br>";
		
		echo "question: ".$_POST["p_question_actual".$i]."<br><br>";
		
		$type = $_POST["p_answer_type".$i];
		echo "question type: ".$answer_types[$type]."<br><br>";
		
		if ($type == 0) // short answer 
		{
			$limit = $_POST["p_char_limit".$i];
			echo "character limit: ".$limit."<br><br>";
		}
		else if ($type < 4) // 1 - radio, 2 - checkbox, 3 - ranking
		{
			$number_choices = $_POST["p_number_choices".$i];
			echo "number of boxes: ".$number_choices."<br><br>";
			
			$choice_array = $_POST["p_choice_description".$i];
			for ($j = 0; $j < $number_choices; $j++)
			{
				echo "box ".($j+1)." description: ".$choice_array[$j]."<br>";
			}
			echo "<br>";
		}
		// 4 date but we don't have to do anything here.
	}
?>
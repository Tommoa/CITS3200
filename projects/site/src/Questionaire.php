<?php

namespace WeChat;

use DateTime;
use JsonSerializable;
use \Httpful;

class Question implements JsonSerializable {
	protected $type = '';
	protected $number = 0;
	protected $group = array([1]);
	protected $title = '';
	protected $questionaire = '';
	protected $suggestions = array();
	protected $maxlen = 0;

	public function __construct($type, $number, $title, $questionaire, $group) {
		$this->type = $type;
		$this->number = $number;
		$this->title = $title;
		$this->questionaire = $questionaire;
		$this->group = $group;
	}

	public function set_len($len) {
		$this->maxlen = $len;
	}

	public function set_suggestions($suggestions) {
		$this->suggestions = $suggestions;
	}

	public function jsonSerialize() {
		return [
			'type'=>$this->type,
			'number'=>$this->number,
			'title'=>$this->title,
			'department'=>$this->questionaire,
			'group'=>$this->group,
			'maxlength'=>$this->maxlen,
			'suggestions'=>$this->suggestions ];
	}
}

class Questionaire implements JsonSerializable {
	protected $id = '';
	protected $name = '';
	protected $description = '';
	protected $groups = array();

	public function __construct($id, $name, $description, array &$groups) {
		$this->id = $id;
		$this->name = $name;
		$this->description = $description;
		$this->groups = $groups;
	}

	public function jsonSerialize() {
		return [
			'Sname'=>$this->name,
			'Sdescription'=>$this->description,
			'group'=>$this->groups,
			'surveyID'=>$this->id ];
	}
}


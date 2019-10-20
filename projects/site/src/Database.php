<?php

namespace WeChat;

use DateTime;
use JsonSerializable;
use \Httpful;
use AccessToken;

class Database {
	protected $env = '';
	protected $dbname = '';

	public function __construct($dbname, $env) {
		$this->env = $env;
		$this->dbname = $dbname;
	}

	// $query is a json expression for matching. See https://developers.weixin.qq.com/miniprogram/en/dev/wxcloud/reference-http-api/database/databaseCount.html
	public function add($query, $token) {
		$query = sprintf('{ "env":"%s", "query":"db.collection(\"%s\").add({ data: %s})" }', $this->env, $this->dbname, addslashes($query));
		$response = \Httpful\Request::post("https://api.weixin.qq.com/tcb/databaseadd?access_token={$token->token()}")
			->sendsJson()
			->expectsJson()
			->body($query)
			->send();
		// Assume no errors
		return $response->body->id_list;
	}

	public function query($query, $token) {
		$response = \Httpful\Request::post("https://api.weixin.qq.com/tcb/databasequery?access_token={$token->token()}")
			->sendsJson()
			->expectsJson()
			->body(sprintf('{ "env":"%s", "query":"db.collection(\"%s\").%s.get()" }', $this->env, $this->dbname, addslashes($query)))
			->send();
		return $response->body->data;
	}

	public function count($query, $token) {
		$response = \Httpful\Request::post("https://api.weixin.qq.com/tcb/databasecount?access_token={$token->token()}")
			->sendsJson()
			->expectsJson()
			->body(sprintf('{ "env":"%s", "query":"db.collection(\"%s\").%s.count()" }', $this->env, $this->dbname, addslashes($query)))
			->send();
		return $response->body->count;
	}

	public function delete($query, $token) {
		$response = \Httpful\Request::post("https://api.weixin.qq.com/tcb/databasedelete?access_token={$token->token()}")
			->sendsJson()
			->expectsJson()
			->body(sprintf('{ "env":"%s", "query":"db.collection(\"%s\").%s.remove()" }', $this->env, $this->dbname, addslashes($query)))
			->send();
		// Assume no errors
		return $response->body->deleted;
	}

	public function update($query, $update, $token) {
		$response = \Httpful\Request::post("https://api.weixin.qq.com/tcb/databaseupdate?access_token={$token->token()}")
			->sendsJson()
			->expectsJson()
			->body(sprintf('{ "env":"%s", "query":"db.collection(\"%s\").%s.update(%s)" }', $this->env, $this->dbname, addslashes($query), addslashes($update)))
			->send();
		// Assume no errors
		return $response->body->deleted;
	}
}

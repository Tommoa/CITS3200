<?php

namespace WeChat;

use DateTime;
use JsonSerializable;
use \Httpful;

class AccessToken implements JsonSerializable {
	protected $token = '';
	protected $expires;

	public function __construct($token, DateTime $expires) {
		$this->token = (string) $token;
		$this->expires = $expires;
	}

	// Is this token valid?
	public function valid() {
		return $this->token && $this->expires->getTimestamp() > time();
	}

	// Return the actual token
	public function token() {
		return $this->token;
	}

	// Return when the token expires
	public function expires() {
		return clone $this->expires;
	}

	// Serialize this token
	public function jsonSerialize() {
		return [ 'token' => $this->token, 'expires' => $this->expires->getTimestamp() ];
	}

	static function new_token($appID, $appSecret) {
		$request = \Httpful\Request::get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appID}&secret={$appSecret}")->expectsJson()->send();
		// FIX: current we assume no error
		$token = new AccessToken($request->body->access_token, DateTime::createFromFormat('U', time() + $request->body->expires_in));
		$contents = json_encode($token);
		file_put_contents($_ENV["CACHEFILE"], $contents);
		return $token;
	}

	public static function get_token($appID, $appSecret) {
		if (is_file($_ENV["CACHEFILE"]) && is_readable($_ENV["CACHEFILE"])) {
			$json = json_decode(file_get_contents($_ENV["CACHEFILE"]), true);
			if (isset($json['token'], $json['expires'])) {
				$token = new AccessToken($json['token'], DateTime::createFromFormat('U', $json['expires']));
				if ($token->valid()) {
					return $token;
				} else {
					return AccessToken::new_token($appID, $appSecret);
				}
			} else {
				return AccessToken::new_token($appID, $appSecret);
			}
		} else {
			return AccessToken::new_token($appID, $appSecret);
		}
	}
}


<?php
require './Code.class.php';
$captcha =Code::getCode();
$captcha->setCode();
session_start();
$_SESSION['code'] = $captcha->sendCode();
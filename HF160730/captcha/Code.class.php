<?php
/*
 * @验证码类，单例，附带送出验证内容方法
 */
class Code{
	private $height;
	private $width;
	private $size;
	private $text;
	private $im;
	private $code_str;
	private static $code = null;
	
	private function __construct($w=100,$h=50,$s=4){
		$this->width = $w;
		$this->height= $h;
		$this->size  = $s;
		$this->text  = "abcdefghijklmnopqrsturwxyzABCDEFJHIJKLMNOPQRSTUVWXYZ0123456789";
	}
	public static function getCode(){
		if(is_null(self::$code)){
			self::$code = new Code();
		}
		return self::$code;
	}
	public function setCode(){
		header("Content-type:image/png");
		$this->im = @imagecreate($this->width, $this->height) or die("Cannot Initialize new GD image stream");
		$background_color = imagecolorallocate($this->im, mt_rand(160,255),mt_rand(160,255),mt_rand(160,255));
		for ($i = 0;$i < $this->size;$i++){
			$this->code_str.=$this->text[mt_rand(0,strlen($this->text)-1)];
			$text_color = imagecolorallocate($this->im,mt_rand(0,155),mt_rand(0,155),mt_rand(0,155));
			imagettftext($this->im,20,mt_rand(-30,40), 10+20*$i,35, $text_color,"../src/GABRIOLA.TTF", $this->code_str[$i]);
		}
		imagepng($this->im);
		imagedestroy($this->im);
	}
	public function sendCode() {
	    return strtolower($this->code_str);
	}
	/*
	 * @禁止克隆单例
	*/
	public function __clone(){
		die("Clone is not allowed".E_USER_ERROR);
	}
}